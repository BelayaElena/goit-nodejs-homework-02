const { Contact } = require("../models/contact");

const { schemas } = require("..//models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.contactJoiSchema.validate(req.body);
    if (error) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      const error = new Error(`Contact with ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
