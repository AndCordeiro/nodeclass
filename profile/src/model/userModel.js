import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  fullname: { type: String },
  phone: { type: String },
  apikey: { type: String, unique: true },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model('Users', usersSchema);
