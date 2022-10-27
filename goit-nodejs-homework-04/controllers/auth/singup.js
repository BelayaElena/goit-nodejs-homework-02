const bcrypt = require("bcrypt");

const { User, schemas } = require("../../models/user");
const { RequestError } = require("../../helpers");

const singup = async (req, res, next) => {
  try {
    const { error } = schemas.singupSchema.validate(req.body);
    if (error) {
      const error = new Error("Ошибка от Joi или другой библиотеки валидации");
      error.status = 400;
      throw error;
    }

    const { email, password, subscription = "starter", token } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "Email in use");
    }
    const hasnPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hasnPassword,
      subscription,
      token,
    });
    res.status(201).json({
      status: "created",
      code: 201,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = singup;
