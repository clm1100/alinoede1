const Joi = require('@hapi/joi');
const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
})

const tokenSchema = Joi.object().keys({
    token: [Joi.string(), Joi.number()],
})

module.exports = {
    loginSchema,
    tokenSchema
}