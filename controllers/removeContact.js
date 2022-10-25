const { Contact } = require("../models/contact");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      const error = new Error(`Contact with ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      message: "contact deleted",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
