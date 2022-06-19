import Joi from 'joi';

const validateBody = async (req, next, schema) => {
  try {
    Joi.assert(req.body, schema, { abortEarly: false });
    return next();
  } catch (err) {
    const { details } = err;
    const message = details.map((i) => i.message);
    throw { status: { code: 422, message } };
  }
};

export default validateBody;
