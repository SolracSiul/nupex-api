import { Request, Response } from "express"
import { NextFunction } from "express";
import User from "../database/schemas/User";
import FileDetails from "../database/schemas/FileDetails";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import multer from 'multer';
require('dotenv').config()


type JwtPayload = {
    id:number
}
class UserController{
    async createUser(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password, userRole  } = request.body;
    
            const userExist = await User.findOne({ email });
            if (userExist) {
                console.log('temos erro mas o codigigo continua')
                return response.status(400).json({ error: 'Usuário já existe' });
            }
    
            const hashPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({
                name,
                email,
                password: hashPassword,
                userRole,
            });
    
            const responseUser = {
                name: user.name,
                email: user.email,
                profissao: user.userRole,
            };
    
            return response.json(responseUser);
        } catch (error) {
            next(error);
        }
    }
    async sendFile (request: Request, response: Response,){
        if (!request.file) {
            return response.status(400).send('Nenhum arquivo enviado.');
        }
    
        const title = request.body.title;
        const comentario = request.body.comentario;
        const file = request.file.filename;
    
        try {
            await FileDetails.create({ title: title, comentario: comentario, file: file });
            return response.send({ status: "ok" }); // Adicione "return" aqui para evitar a execução posterior
        } catch (error) {
            return response.status(500).json({ status: error || 'Erro ao salvar detalhes do arquivo' });
        }
       
    }
    async getMyOwnFiles(request: Request, response: Response){
        try {
            const data = await FileDetails.find({});
            return response.send({ status: "ok", data: data });
        } catch (error) {
            return response.status(500).json({ status: error || 'Erro ao buscar arquivos' });
        }
    }
    async findAllUser(request: Request, response: Response){
        try{
            const users = await User.find();
            return response.json(users);

        }catch(error){
            return response.status(500).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
        }
    }
    async loginUser(request: Request, response: Response){
        try{
            const {email, password} = request.body
            
            const user = await User.findOne({email});
    
            if(!user){
                throw new Error('E-mail ou senha invalidos')
            }
            const verifyPass = await bcrypt.compare(password, user.password);
            if(!verifyPass){
                throw new Error('E-mail ou senha invalidos')
            }
            const responseUser ={
                id: user.id,
                name: user.name,
                email: user.email,
                profissao: user.userRole,
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '',{expiresIn: '3H'});
            return response.json({
                user: responseUser,
                token: token
            });
        }catch(error){
            return response.status(404).json({
                error: "E-mail ou senha invalidos",
                message: error,})
        }

      
    }
    async getProfile(request: Request, response: Response){
        try {
            return response.json(request.user)
          
          } catch (error) {
            return response.status(401).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
          }
    }
    async deleteFileById(request: Request, response: Response){
        try{
            const fileId = request.params.id;

            const file = await FileDetails.findById(fileId);

            if(!file){
                return response.status(404).json({
                    error: "Arquivo nao encontrado"
                });
            }
            await FileDetails.findByIdAndRemove(fileId);

            return response.json({
                message: "File removido com sucesso"
            })

        }catch (error){
            return response.status(500).json({
                error: "Something wrong",
                message: error,
            });
        }
    }
    async searchFileById(request: Request, response: Response){
        try{
            const fileId = request.params.id;

            const file = await FileDetails.findById(fileId);

            if(!file){
                return response.status(404).json({
                    error: "File nao encontrado"
                });
            }
            return response.json(file);
        }catch (error){
            return response.status(500).json({
                error: "Something wrong",
                message: error,
            })
        }
    }

}

export default new UserController