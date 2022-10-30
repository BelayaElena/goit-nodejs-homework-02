const getCurrent = async (req, res) => {
  const { email, subscription = "starter" } = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
