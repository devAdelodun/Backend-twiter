import express from "express";
import { 
    createComment, 
    getCommentsByTweet, 
    deleteComment 
} from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Routes for comments
router.post("/:tweetId", verifyToken, createComment);
router.get("/:tweetId", getCommentsByTweet);
router.delete("/:id", verifyToken, deleteComment);

export default router;
