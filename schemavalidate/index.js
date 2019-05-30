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


const postAddSchemal = Joi.object().keys({
    slug:Joi.string(),
    title:Joi.string(),
    feature:Joi.string(),
    created:Joi.date(),
    content:Joi.string(),
    status:Joi.string(),
    category_id:Joi.string(),
    user_id:Joi.number()
})


const categorySchemal = Joi.object().keys({
    slug:Joi.string(),
    name:Joi.string(),
    classname:Joi.string()
})

const categoryUpdateSchemal=Joi.object().keys({
    id:Joi.number(),
    slug:Joi.string(),
    name:Joi.string(),
    classname:Joi.string()
})




module.exports = {
    loginSchema,
    tokenSchema,
    postListSchemal,
    postAddSchemal,
    categorySchemal,
    categoryUpdateSchemal
}