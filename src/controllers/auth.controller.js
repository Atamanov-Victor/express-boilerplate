const authService = require('../services/auth.service');
const { userModel } = require('../models');

class authController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const loginData = await userModel.login(username, password);
      res.json(loginData);
    } catch (error) {
      console.log('authController.login error', error);
      res.status(500).json({ error: error.message });
    }
  }

  async signUp(req, res) {
    try {
      const { email, password, username } = req.body;

      const registerData = await authService.signUp(email, password, username);
      res.json(registerData);
    } catch (error) {
      console.log('authController.signUp error', error);
      res.status(500).json({ error: error.message });
    }
  }

  async profile(req, res) {
    try {
      const { _id } = req.auth;
      const user = await authService.getUserProfile(_id);

      res.json({ user });
    } catch (error) {
      console.log('authController.updatePrivateKey error', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new authController();
