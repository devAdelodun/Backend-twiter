import express from "express";
import {
     deleteUser, 
     follow, 
     getUser, 
     unfollow, 
     updateUser,
     uploadFile
    } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/find/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/id", verifyToken, deleteUser);
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unfollow);
router.post('/upload',verifyToken, upload.single('file'), uploadFile);

export default router;