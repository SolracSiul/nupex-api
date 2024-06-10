import { NextFunction, Request, Response } from "express";
import User from "../database/schemas/User";
import jwt from 'jsonwebtoken'

type JwtPayload = {
  id:number
}
export const authMiddleware = async (request: Request, response: Response, next: NextFunction) =>{
    try {
        const { authorization } = request.headers;
        if (!authorization) {
          throw new Error('Não autorizado');
        }
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
      
        const user = await User.findById(id);
      
        if (!user) {
          throw new Error('Não autorizado');
        }
        const {_id, name, email} = user;

        request.user = user;

        next()
      
      } catch (error) {
        return response.status(401).json({
            error: "Alguma coisa deu errado",
            message: error,
        })
      }

}