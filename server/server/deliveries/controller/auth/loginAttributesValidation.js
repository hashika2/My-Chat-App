const Joi = require('joi');
const {validateObject} = require('../../../shared/utilities');

const username = Joi.string().required();
const password = Joi.string().required();

const validateLoginAttributes = (insertAttributes) => {
    const schema = {
        username,password
    }
    return validateObject(schema,insertAttributes);
}

module.exports = {
    validateLoginAttributes
}