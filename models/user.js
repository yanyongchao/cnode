const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const bluebird = require('bluebird');
let pbkdf2Async = bluebird.promisify(crypto.pbkdf2);
const SALT = require('../cipher').PASSWORD_SALT;

var UserSchema = new Schema({
  "name" : String,
  "age": Number,
  "phoneNumber": {type: String, required: true, unique: true},
  "password": {type: String, required: true}
});

UserSchema.index({phoneNumber: 1});

const DEFAULT_PROJECTION = {password: 0, __v: 0};

var UserModel = mongoose.model("users", UserSchema);

async function createNewUser(params) {
  if (!params.phoneNumber || !params.password) {
    throw Error('请输入用户名和密码');
  }
  const password = await pbkdf2Async(params.password, SALT, 512, 128, 'sha1')
    .then(r => {
      return r.toString().substr(0, 12);
    })
    .catch(err => {
      throw Error(err);
    });
  const user = await UserModel.create({
    phoneNumber: params.phoneNumber,
    password: password
  })
    .catch(err => {
      throw Error(err);
    });
  if (user) {
    return {
      phoneNumber: user.phoneNumber
    };
  }
}

async function getUsers() {
  const users = await UserModel.find({})
    .select(DEFAULT_PROJECTION)
    .catch(err => {
      throw Error(err);
    });
  return users;
}

async function updateUser(id, params) {
  const user = await UserModel.findOneAndUpdate({_id: id}, params, {new: true})
    .select(DEFAULT_PROJECTION)
    .catch(err => {
      throw Error(err);
    });
  return user;
}

async function getUserById(userId) {
  return await UserModel.findOne({_id: userId})
    .select(DEFAULT_PROJECTION)
    .catch(e => {
      console.log(e);
      throw new Error(e);
    })
}

async function login(params) {
  const password = await pbkdf2Async(params.password, SALT, 512, 128, 'sha1')
    .then(r => {
      return r.toString().substr(0, 12);
    })
    .catch(err => {
      throw Error(err);
    });
  const user = await UserModel.findOne({password, phoneNumber: params.phoneNumber})
    .select(DEFAULT_PROJECTION)
    .catch(err => {
      throw Error(err);
    });
  return {
    user
  };
}

module.exports = {
  model: UserModel,
  createNewUser,
  getUsers,
  updateUser,
  getUserById,
  login
};