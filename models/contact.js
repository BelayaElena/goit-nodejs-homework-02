const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const contactMongooseShchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactMongooseShchema.post("save", handleSaveErrors);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactJoiSchemaForFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  contactJoiSchema,
  contactJoiSchemaForFavorite,
};

const Contact = model("contact", contactMongooseShchema);

module.exports = {
  Contact,
  schemas,
};
