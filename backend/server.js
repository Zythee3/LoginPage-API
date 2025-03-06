const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.listen(3000, function(){
    console.log("Servidor online!");
});

