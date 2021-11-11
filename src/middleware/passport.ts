import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { ErrorRequestHandler } from 'express';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';


import {UserAPI} from '../apis/users'
import {ModelUser} from '../models/users/DAOs/user'
import {UserI} from '../models/users/user.interface'
import logger from '../config/logger'
import {schemaAuth} from '../helpers/validators'

interface MulterRequest extends Request {
  file: any;
}
interface User {
  _id?: string;
}


const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };
  
  const loginFunc = async (req:Request, email:string, password:string, done:Function) => {
    
try {
   
  const user = await UserAPI.query(email)
  
    
  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
 

  if (! await UserAPI.validatePassword(email,password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  
  return done(null, user);
} catch (error) {
  logger.error(error)
}
   
  };

  const signUpFunc = async (req:Request, username:string, password:string, done:Function) => {
    try {

      const result = await schemaAuth.validateAsync(req.body)
      
      const image = (req as MulterRequest).file
      if(!image){
         
        return done(null, false, 'No envio ningun archivo');
       }
      
      const user = await UserAPI.query(result.email)
      
      if (user) {
        return done(null, false, 'User already exists');
      } else {
        
        const imageUrl = image.path.replace("\\" ,"/")
        const userData = {
          email:     result.email, 
          password:  result.password, 
          nombre:    result.nombre, 
          direccion: result.direccion, 
          edad:      result.edad, 
          telefono:  result.telefono,
          foto:imageUrl
        };
        
       const newUser = await UserAPI.addUser(userData)

        return done(null, newUser);
      }
    } catch (error:any) {
      
      if (error.isJoi === true) error.status = 422
      logger.error(error)
      done(error);
    }
  };

  passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
  passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));


passport.serializeUser((user:User, done) => {
  
    done(null, user._id);
  });
  
  passport.deserializeUser((userId, done) => {
   
    ModelUser.findById(userId, function (err: unknown, user:UserI) {
      done(err, user);
    });
  });

  export default passport