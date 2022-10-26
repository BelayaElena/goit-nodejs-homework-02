const { Contact, schemas } = require("../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.contactJoiSchema.validate(req.body);
    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "created",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
