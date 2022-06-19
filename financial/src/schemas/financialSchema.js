import Joi from 'joi';
import validateBody from '../utils/schemaValidator';

const fullnameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

const validateFinancial = async (req, res, next) => {
  const schema = Joi.object().keys({
    bankname: Joi.string().required().messages({
      'any.required': 'o campo bankname é obrigatório',
    }),
    accountType: Joi.string()
      .valid('corrente', 'poupança', 'salário')
      .required()
      .messages({
        'any.required': 'o campo accountType é obrigatório',
        'any.only':
          'o campo accountType aceita: "corrente", "poupança", "salário"',
      }),
    holdername: Joi.string().required().regex(fullnameRegex).messages({
      'string.pattern.base': 'o holdername informado é inválido',
      'any.required': 'o campo holdername é obrigatório',
    }),
    cardLimit: Joi.number().required().messages({
      'any.required': 'O campo cardLimit é obrigatório',
    }),
    apikey: Joi.string().required().messages({
      'any.required': 'o campo apikey é obrigatório',
    }),
  });
  try {
    await validateBody(req, next, schema);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default validateFinancial;
