import express,{Request, NextFunction,Response} from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo';
import passport from 'passport'
import compression from 'compression'
import session from 'express-session';
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

import Config from '../config'

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_INGRESS ,
  }),

  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
  },
};


const storage = multer.diskStorage({
  destination: function(req:Request, file:Express.Multer.File, cb: (error: Error | null, destination: string)=> void) {
      cb(null, 'images');
  },
  filename: function(req:Request, file:Express.Multer.File, cb: (error: Error | null, destination: string)=> void) {
      cb(null, uuidv4() + file.originalname)
  }
});

const fileFilter = (req:Request, file:Express.Multer.File, cb: any ) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true)

  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }
}
const app = express();
app.use(compression())

app.use(session(StoreOptions));
app.use(
  multer({storage, fileFilter }).single('image')
);

app.use(cookieParser());
 app.use(session())

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter);

app.use( express.static(path.join(__dirname, '../../images')));


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500)
  res.send({
    error: {
      status: error.statusCode || 500,
      message: error.message,
    },
  })
};

app.use(errorHandler);

const myServer = new http.Server(app);

export default myServer
