import mongoose from "mongoose";
const PdfDetailsSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    comentario:{
        type: String,
    },
    //provavel erro aqui
    fileName:{
        type: String,
    }
   //dono do arquivo
   //role "admin tem" acesso de ver e comentar qualquer um arquivo desse
});



export default mongoose.model("FileDetails", PdfDetailsSchema);