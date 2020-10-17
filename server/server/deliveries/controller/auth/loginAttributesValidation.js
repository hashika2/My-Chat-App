const Joi = require('joi');
const validateObject = require('../../../shared/utilities');

const USERNAME = Joi.string.required();
const PASSWORD = Joi.string.required();

const validateLoginAttributes = (insertAttributes) => {
    const schema = {
        userName = USERNAME,
        password = PASSWORD
    }
    return validateObject(schema,insertAttributes);
}

module.exports = {
    validateLoginAttributes
}