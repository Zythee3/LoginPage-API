const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

app.use(cors())
const port = 3000



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

app.listen(port, () =>{
    console.log("App running!")
})
