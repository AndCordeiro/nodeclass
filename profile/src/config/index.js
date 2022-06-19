const cfg = {
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
  salt: process.env.SALT,
  db_path: process.env.DB_PATH,
};

export default cfg;
