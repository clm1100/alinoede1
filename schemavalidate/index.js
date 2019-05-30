const Joi = require('@hapi/joi');

// 登录信息验证
const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
})

// token信息验证
const tokenSchema = Joi.object().keys({
    token: [Joi.string(), Joi.number()],
})

const postListSchemal = Joi.object().keys({
    currentPage:Joi.number(),
    pageSize:Joi.number(),
    status:Joi.string(),
    categoryId:Joi.number()
})



module.exports = {
    loginSchema,
    tokenSchema,
    postListSchemal
}