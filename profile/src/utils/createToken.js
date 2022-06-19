import pkg from 'jsonwebtoken';
import cfg from '../config';

const { sign } = pkg;

const createToken = (id, user, email) => {
  const token = sign({ id, user, email }, cfg.jwt_secret, {
    expiresIn: cfg.jwt_expires,
  });
  return token;
};

export default createToken;
