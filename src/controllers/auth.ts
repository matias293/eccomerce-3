import { Request, Response, NextFunction } from 'express';
import moment from 'moment'

import Config from '../config/index'
import {UserI} from '../models/users/user.interface'
import { EmailServiceEthereal } from '../services/ethereal';

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}

class Auth {


async postLogin(req: Request, res: Response) {
    
    if (req.user ) {
        const  {nombre}   = req.user as UserI ;
        res.json({  message:` Bienvenido ${nombre }!` });   
      }
}

 postSignUp(req: Request, res: Response) {
   
   if(req.user){
      const {email} = req.user
      const destination = Config.ETHEREAL_EMAIL
      const subject = 'Nuevo Registo'
      const content = `
        <p> El usuario ${email} creo un usuario  ${moment().format('DD/MM/YYYY HH:mm:ss')} </p>
        `;
       EmailServiceEthereal.sendEmail(destination,subject,content)
   }
    res.json({  message:` Usuario creado correctamente` })
}

 postLogOut(req: Request, res: Response) {
    
    if(!req.isAuthenticated()){
        return res.json({message:'Usted no se encuentra logeado'})
    }
    req.session.destroy(err => {
        if (err) res.status(500).json({ message: 'Hubo un error al cerrar sesion' });
        else {
          res.json({ message: 'Se cerró su sesion correctmanete' });
        }
      });
    
}

}

export const authController = new Auth()