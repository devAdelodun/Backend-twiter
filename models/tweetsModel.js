import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tweet: {type: String, required: true},
    picture: { type: String},
    likes: {type: Array, default: []},
 },
 {timestamps: true}
);

export default mongoose.model("Tweet", tweetSchema);