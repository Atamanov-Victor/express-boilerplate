const { v4 } = require('uuid');
const mongoConnection = require('../connection/mongo');
const utils = require('../services/utils');
const { hashPassword } = require('../utils/crypto');
const { sign } = require('../utils/jwt');
const { AUTH_ERROR_MESSAGE, PASSWORD_MIN_LENGTH_EROR_MESSAGE } = require('../config/errors');
const { PASSWORD_MIN_LENGTH } = require('../config/constants');

const USER_STATE = {
  ACTIVE: 'active',
  BLOCKED: 'BLOCKED',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
};

class UserModel {
  constructor(dbconn) {
    this.db = dbconn;
    this.modelName = 'user';
    this.attributes = {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      state: {
        type: String,
        enum: Object.values(USER_STATE),
        default: USER_STATE.ACTIVE,
      },
      authToken: String,
      password: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
      },
      updatedAt: {
        type: Date,
      },
    };
    this.model = this.db.model(this.modelName, new this.db.Schema(this.attributes));
  }

  async login(username, password) {
    if (!username) {
      throw new Error('Username is required');
    }

    if (!password) {
      throw new Error('password is required');
    }

    const exist = await this.model.findOne({ username });

    if (!exist) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }

    const hash = hashPassword(password);

    if (exist.password !== hash) {
      throw new Error(AUTH_ERROR_MESSAGE);
    }
    const accessToken = sign({ _id: exist._id.toString() });

    return {
      accessToken,
    };
  }

  async signUp(email, password, username) {
    if (!password) {
      throw new Error('password is required');
    }

    if (!email) {
      throw new Error('email is required');
    }

    if (!username) {
      throw new Error('username is required');
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new Error(PASSWORD_MIN_LENGTH_EROR_MESSAGE);
    }

    const existEmail = await this.model.findOne({ email });

    if (existEmail) {
      throw new Error('email already used!');
    }

    const existUsername = await this.model.findOne({ username });

    if (existUsername) {
      throw new Error('username already used!');
    }

    const hash = hashPassword(password);

    const payload = {
      email,
      password: hash,
      username,
      emailConfirmationKey: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // проброс добавить в сервисную бд
    const user = await new this.model(payload).save();
    const accessToken = sign({ _id: user._id.toString(), role: user.role });

    return {
      accessToken,
    };
  }

  async findByUsername(username) {
    return await this.model.findOne({ username }).lean();
  }

  async findOne(params) {
    return await this.model.findOne(params).lean();
  }

  async findById(_id) {
    return await this.model.findById(_id).lean();
  }

  // async updatePrivateKey(userId, privateKey) {
  //   await this.model.findOneAndUpdate(
  //     {
  //       _id: userId,
  //     },
  //     { privateKey, updatedAt: new Date() },
  //     { new: true }
  //   )
  //
  //   return this.model.findById(userId).lean();
  // }

  async getUserProfile(userId) {
    return this.model.findById(userId, 'username email _id').lean();
  }
}

module.exports = new UserModel(mongoConnection);
