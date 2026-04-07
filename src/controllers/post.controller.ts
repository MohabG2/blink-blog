import { type Request, type Response, type NextFunction } from "express";
import { PostService } from "../services/post.service.ts";

export const PostController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const posts = await PostService.getall();
        res.status(200).json({ success: true, posts });
    },
    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const postId = parseInt(req.params.id as string, 10);
        const post = await PostService.getById(postId);
        if (!post) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, post });
    },
    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authorId = req.user?.id;
            if (!authorId) {
                res.status(401).json({ success: false, message: "Unauthorized: No user information found in request" });
                return;
            }
            const postData = { ...req.body, authorId };
            const newPost = await PostService.create(postData);
            res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            console.error("Error occurred while creating post:", error);
            next(error);
        }
    },
    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const postId = parseInt(req.params.id as string, 10);
        const updatedPost = await PostService.update(postId, req.body);
        if (!updatedPost) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, post: updatedPost });
    },
    delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const postId = parseInt(req.params.id as string, 10);
        const deleted = await PostService.delete(postId);
        if (!deleted) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    }
};