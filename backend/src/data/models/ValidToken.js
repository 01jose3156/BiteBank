import mongoose from 'mongoose';

const validTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const ValidToken = mongoose.model('ValidToken', validTokenSchema);
export default ValidToken;