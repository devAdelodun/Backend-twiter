import express from "express"
import { 
    createTweet, 
    deleteTweet, 
    getallTweets, 
    getMyTweets,
    getTrendingTweets,
    likeTweet
} from "../controllers/tweetsController.js";
import { verifyToken } from "../middleware/verifyToken.js";



const router = express.Router();

router.post("/", verifyToken, createTweet);
router.get("/timeline/:id", getallTweets);
router.get("/user/all/:id", getMyTweets);
router.get("/explore", getTrendingTweets)
router.post("/like/:id", verifyToken,likeTweet);
router.delete("/:id",verifyToken ,deleteTweet);

export default router;