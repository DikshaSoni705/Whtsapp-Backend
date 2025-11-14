// src/validations/message.validation.js
const Joi = require("joi");

exports.sendMessageValidation = (data) => {
  const schema = Joi.object({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    content: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};
