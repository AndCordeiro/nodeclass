import mongoose from 'mongoose';

const financialsSchema = new mongoose.Schema({
  bankname: { type: String },
  accountType: { type: String },
  holdername: { type: String },
  cardLimit: { type: String },
  apikey: { type: String, unique: true },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model('Financials', financialsSchema);
