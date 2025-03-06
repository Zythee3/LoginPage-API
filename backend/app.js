const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_DATABASE)
const app = express();


app.use(cors());
app.use(express.json());

app.listen(3000, function(){
    console.log("Servidor online!");
});

