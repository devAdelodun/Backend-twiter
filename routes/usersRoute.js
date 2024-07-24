import express from "express";
import {
     deleteUser, 
     follow, 
     getUser, 
     unfollow, 
     updateUser 
    } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/find/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/id", verifyToken, deleteUser);
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;