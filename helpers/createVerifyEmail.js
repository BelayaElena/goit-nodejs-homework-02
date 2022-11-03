const { BASE_URL } = process.env;

const createVarifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verificate</a>`,
  };
  return mail;
};

module.exports = createVarifyEmail;
