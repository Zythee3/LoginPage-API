// importações do mongoose e do arquivo
require("dotenv").config();
const mongoose = require("mongoose");

// crie uma função para fazer a verificação e conectar ao banco de dados
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.CONNECTION_DATABASE);
        console.log("✅ Conexão com o banco de dados realizada com sucesso!")
    }
    catch(error){
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;

