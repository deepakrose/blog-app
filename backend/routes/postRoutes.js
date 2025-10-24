import express from "express";
import Post from "../models/postModel.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create post
router.post("/", protect, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        console.log("Create Post:", req.body);

        const post = await Post.create({ title, content, user: req.user._id });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
});

// Get all posts
router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.find().populate("user", "name");
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

// Get my posts
router.get("/my", protect, async (req, res, next) => {
    try {
        const posts = await Post.find({ user: req.user._id });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

// Update post
router.put("/:id", protect, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404);
            throw new Error("Post not found");
        }
        if (post.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Not authorized");
        }

        post.title = title || post.title;
        post.content = content || post.content;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
});

// Delete post
router.delete("/:id", protect, async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404);
            throw new Error("Post not found");
        }
        if (post.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Not authorized");
        }
        await post.remove();
        res.json({ message: "Post removed" });
    } catch (error) {
        next(error);
    }
});

export default router;
