import {Schema, model} from 'mongoose'
// import Carrito from '../../carrito/DAOs/carrito'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


import {Error,NewUserI,UserBaseClass,UserI} from '../user.interface'
import logger from '../../../config/logger'
import Config from '../../../config/index'

const UsersSchema = new Schema<UserI>({
   
   email:{
    type: String,
    required: true
  },
   password:{
    type: String,
    required: true
  },
   nombre: {
    type: String,
    required: true
  },
   direccion: {
    type: String,
    required: true
  },
   edad:{
    type: Number,
    required: true
  },
   telefono: {
    type: String,
    required: true
  },
   foto:{
    type: String,
    required: true
  },
  carritoId:{
    type: String
  }
  
})

UsersSchema.methods.toJSON = function() {
  const { __v,  ...data  } = this.toObject();
  return data;
}


UsersSchema.pre('save', async function (next) {
  try {
   const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
   
  next(); 
  } catch (error) {
    logger.error(error)
  }
  
});

export class UsuariosAtlasDAO implements UserBaseClass {
  private srv: string;
  private users:any;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGOLOCAL_INGRESS}`;
    else this.srv = Config.MONGO_INGRESS;
    mongoose.connect(this.srv);
    this.users = model('User', UsersSchema);
  }

  async get(id: string): Promise<UserI> {
   
    try {
      const user = await this.users.findById(id)
      if(!user){  
          const error : Error= new Error('No existe ese usuario');
          error.statusCode = 404;
          throw error;
        
      }
      return user
    } catch (err : any ) { 
      
      return err
    } 
  }

  async add(data: NewUserI): Promise<UserI> {
    const newProduct = new this.users(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, data: NewUserI): Promise<UserI> {
    return this.users.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    await this.users.findByIdAndDelete(id);
  }

  async query(query: any): Promise<UserI> {
    const result = await this.users.findOne(query);
    
    return result;
  }

  async validateUserPassword(
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await this.users.findOne({ username });

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return false;
    return true;
  }
}


export const ModelUser = model('User', UsersSchema);

