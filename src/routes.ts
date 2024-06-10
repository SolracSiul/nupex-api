import { Router} from 'express'
import UserController from './controller/UserController';
import { authMiddleware } from './middlewares/authMiddleware';
import User from './database/schemas/User'
import path from 'path';


import multer from 'multer';
const routes = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files');
    },
    filename: function (req, file, cb) {
      const now = new Date();
      const dateSuffix = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, `${dateSuffix}-${basename}${ext}`);
    }
  });
  
const upload = multer({ storage: storage })
//ou use routes.use(authMiddleware) e terá autenticação em todas rotas abaixo.

routes.post("/user", UserController.createUser);
routes.get("/users", UserController.findAllUser);
routes.get("/profile", authMiddleware,  UserController.getProfile);
routes.post("/login", UserController.loginUser);
routes.post("/send", upload.single("file"), UserController.sendFile);
routes.get("/get-files", UserController.getMyOwnFiles);
routes.delete('/file/:id', UserController.deleteFileById);    
routes.get('/file/:id', UserController.searchFileById); 

export default routes;