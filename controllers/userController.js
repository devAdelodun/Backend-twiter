import ash from "express-async-handler";
import User from "../models/usersModel.js";
import Tweet from "../models/tweetsModel.js"

export const getUser = ash(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user);
})

export const updateUser = ash(async (req, res) => {
    if (req.params.id === req.user.id) {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } else {
        throw new Error("You can not update others' account")
    }
});

export const deleteUser = ash(async (req, res) => {
    if(req.params.id.toString() === req.user.id) {
        await User.findByIdAndDelete(req.params.id)
        await Tweet.remove({ userId: req.params.id })
    } else {
        throw new Error("You can not delete others' account")
    }

    res.status(200).json({ message: "User deleted" })
})

export const follow = ash(async (req, res) => {
    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.id);

    if(!user.followers.includes(req.body.id)) {
        await user.updateOne({
            $push: { followers: req.body.id }
        })
        await currentUser.updateOne({ $push:{ following: req.params.id } })
    } else {
        throw new Error("You already followed this user")
    }

    res.status(200).json({ message: "You are now following this user" })
});

export const unfollow = ash(async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id)

    if(currentUser.following.includes(req.body.id)) {
        await user.updateOne({
            $pull: { followers: req.body.id }
        })
        await currentUser.updateOne({ $pull:{ following: req.params.id } })
    } else {
        throw new Error("You are not following this user")
    }

    res.status(200).json({ message: "You unfollowed the user" })
})