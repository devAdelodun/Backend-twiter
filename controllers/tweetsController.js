import Tweet from '../models/tweetsModel.js';
import ash from "express-async-handler";


export const createTweet = ash(async (req, res) => {
    const newTweet = new Tweet(req.body);
    const savedTweet = await newTweet.save();
    res.status(201).json(savedTweet);    
})

export const getMyTweets = ash(async (req, res) => {
    const myTweets = await Tweet.find({user_id: req.params.id}).sort({date: -1});
    res.status(200).json(myTweets);
})


export const getallTweets = ash(async (req, res) => {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({user_id: currentUser._id}).sort({date: -1});
    const followingTweets = await Promise.all(
        currentUser.following.map((followingId) => Tweet.find({user_id: followingId}).sort({date: -1}))
    )

    const alltweets = userTweets.concat(...followingTweets);

    res.status(200).json(alltweets)
});

export const deleteTweet = ash(async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    if(tweet.user_id === req.body.id) {
        await tweet.deleteOne();
    }

    res.status(200).json({message: 'Tweet deleted successfully'})
})

export const likeTweet = ash(async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }
})

export const getTrendingTweets = ash(async (req, res) => {
    const trendingTweets = await Tweet.find({
        likes: { $exists: true },
    }).sort({ likes: -1 })

    res.status(200).json(trendingTweets)
})