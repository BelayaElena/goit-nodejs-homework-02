const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User, schemas } = require("../../models/user");
const { RequestError, sendEmail, createVarifyEmail } = require("../../helpers");

const singup = async (req, res, next) => {
  try {
    const { error } = schemas.singupSchema.validate(req.body);
    if (error) {
      const error = new Error("Ошибка от Joi или другой библиотеки валидации");
      error.status = 400;
      throw error;
    }

    const { email, password, subscription = "starter", token } = req.body;
    const avatarURL = gravatar.url(email);
    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "Email in use");
    }
    const hasnPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    await User.create({
      email,
      password: hasnPassword,
      subscription,
      token,
      avatarURL,
      verificationToken,
    });

    const mail = createVarifyEmail(mail, verificationToken);
    await sendEmail(mail);

    res.status(201).json({
      status: "created",
      code: 201,
      data: {
        email,
        subscription,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = singup;
