const { User, schemas } = require("../../models/user");
const { RequestError, sendEmail, createVarifyEmail } = require("../../helpers");

const resendVerify = async (req, res, next) => {
  try {
    const { error } = schemas.verifyEmailSchema.validate(req.body);
    if (error) {
      const error = new Error("Ошибка от Joi или другой библиотеки валидации");
      error.status = 400;
      throw error;
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(400, "Email not found");
    }
    const mail = await createVarifyEmail(email, user.verificationToken);
    await sendEmail(mail);

    res.json(200)({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
