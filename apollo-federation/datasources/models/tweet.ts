import mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema({
    text: {
      type: String,
    },
  });
  
export default mongoose.model(
    'Tweet',
    TweetSchema
  );
