import Comment from '../models/commentModel.js';
import ash from "express-async-handler";


export const createComment = ash(async (req, res) => {
    const newComment = new Comment({ ...req.body, tweet_id: req.params.tweetId });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
});


export const getCommentsByTweet = ash(async (req, res) => {
    const comments = await Comment.find({ tweet_id: req.params.tweetId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
});




export const deleteComment = ash(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (comment.user_id.toString() === req.body.id) {
        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
        res.status(403);
        throw new Error('You are not allowed to delete this comment');
    }
});
