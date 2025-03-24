const {
  AuthUpdatePassword,
  AuthLogin,
  AuthRegister
} = require("../services/auth/authServices")

// cadastro do usuario
exports.register = async (req, res) => {
  let registerResponse
  try {
    const { name, email, password } = req.body;

    registerResponse = await AuthRegister({name, email, password})

    res.status(200).json({ message: registerResponse.message });
  } catch (error) {
    res.status(500).json({ message: registerResponse.message });
  }
};

// login do usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginResponse = await AuthLogin({
      email,
      password,
    });

    if (!loginResponse.success) {
      return res.status(400).json({ message: loginResponse.message });
    }

    return res.status(200).json({ message: loginResponse.message });
  } catch (error) {
    return res.status(500).json({ message: `Error no Servidor: ${error.message }`});
  }
};

// Alterar a senha
exports.updatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const updateResponse = await AuthUpdatePassword({
      email,
      currentPassword,
      newPassword,
    });

    if (!updateResponse.success) {
      return res.status(400).json({ message: updateResponse.message });
    }

    return res.status(200).json({ message: updateResponse.message });
  } catch (error) {
    return res.status(500).json({ message: "Error no servidor!" });
  }
};
