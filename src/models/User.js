// modelo do usuario, ou seja as informações/dados que o usuario vai ter
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: { type: String, required: true },
    verificationCode: { type: String }, // Código de verificação
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
