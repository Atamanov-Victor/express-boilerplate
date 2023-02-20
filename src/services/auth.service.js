const { userModel } = require('../models');

module.exports = {
  async signUp(email, password, username) {
    return await userModel.signUp(email, password, username);
  },

  async getPrivateKey(userId) {
    return userModel.getPrivateKey(userId);
  },

  async updatePrivateKey(userId, privateKey) {
    return userModel.updatePrivateKey(userId, privateKey);
  },

  async getUserProfile(userId) {
    return userModel.getUserProfile(userId);
  },
};
