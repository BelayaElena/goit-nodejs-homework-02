const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    status: "no content",
    code: 204,
    message: "Logout success",
  });
};
module.exports = logout;
