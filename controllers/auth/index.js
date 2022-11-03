const singup = require("./singup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
  singup,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerify,
};
