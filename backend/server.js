const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const connectDB = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Importando e usando as rotas de autenticação
app.use("/api/auth", authRoutes);

app.listen(3000, function () {
  console.log("Servidor online!");
});
