
export interface NewUserI {
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  foto: string;
  
  }
 
  export interface UserI {
    _id: string;
    email: string;
    password: string;
    nombre: string;
    direccion: string;
    edad: number;
    telefono: string;
    foto: string;
    carritoId:string;
  }
  
  export interface UserQuery {
    username?: string;
    email?: string;
  }
  
  export interface UserBaseClass {
    get(id: string ): Promise<UserI>;
    add(data: NewUserI): Promise<UserI>;
    update(id: string, newProductData: NewUserI): Promise<UserI>;
    delete(id: string): Promise<void>;
  }

  export interface Error{
    statusCode?:number;
    message?: string;
}