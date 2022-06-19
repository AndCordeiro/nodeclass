import Joi from 'joi';
import validateBody from '../utils/schemaValidator';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const fullnameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
const passwordRegex = /^((?=.*[a-z])(?=.*[0-9]))/;

const validateCreateUser = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).required().messages({
      'string.min': 'o campo username deve possuir no mínimo 4 dígitos',
      'any.required': 'o campo userName é obrigatório',
    }),
    password: Joi.string().min(6).regex(passwordRegex).required().messages({
      'string.pattern.base':
        'o campo password deve possuir pelo menos 1 dígito numérico e 1 dígito em letra',
      'any.required': 'o campo password é obrigatório',
      'string.min': 'o campo password deve ter no mínimo 6 digitos',
    }),
    fullname: Joi.string().required().regex(fullnameRegex).messages({
      'string.pattern.base': 'o fullname informado é inválido',
      'any.required': 'o campo fullname é obrigatório',
    }),
    email: Joi.string().required().regex(emailRegex).messages({
      'string.pattern.base': 'o email informado é inválido',
      'any.required': 'o campo email é obrigatório',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'o campo phone é obrigatório',
    }),
  });
  try {
    await validateBody(req, next, schema);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const validateUpdateUserPassword = async (req, res, next) => {
  const schema = Joi.object().keys({
    currentPassword: Joi.string().min(6).required().messages({
      'any.required': 'o campo currentPassword é obrigatório',
      'string.min': 'o campo currentPassword deve ter no mínimo 6 digitos',
    }),
    newPassword: Joi.string().min(6).regex(passwordRegex).required().messages({
      'string.pattern.base':
        'o campo newPassword deve possuir pelo menos 1 dígito numérico e 1 dígito em letra',
      'any.required': 'o campo newPassword é obrigatório',
      'string.min': 'o campo newPassword deve ter no mínimo 6 digitos',
    }),
    confirmNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.required': 'o campo confirmNewPassword é obrigatório',
        'any.only':
          'o campo confirmNewPassword deve ser igual ao campo newPassword',
      }),
  });
  try {
    await validateBody(req, next, schema);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default validateCreateUser;
