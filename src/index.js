const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

app.use(cors())
const port = 3000

mongoose.connect("mongodb+srv://zmatheusguilherme2:VZFl3Wiwh10lXO3U@telalogin.jtvnbqg.mongodb.net/?retryWrites=true&w=majority&appName=TelaLogin")

const Usuario = mongoose.model('usuario', {
    name: String,
    email: String,
    password: String
});

app.get("/", async (req, res) =>{
    const usuarios = await Usuario.find()
    res.send(usuarios)
})

app.post("/", async (req, res) =>{
    const novoUsuario = new Usuario({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await novoUsuario.save()
    res.send(novoUsuario)
})

app.post('/verificar-usuario', async (req, res) => {
    const { nomeUsuario } = req.body;


    // Simulação de consulta ao banco de dados
    const usuarioExiste = await Usuario.findOne({ name: nomeUsuario });

    if (usuarioExiste) {
        return res.json(true);
    } else {
        return res.json(false);
    }
});


app.listen(port, () =>{
    console.log("App running!")
})
