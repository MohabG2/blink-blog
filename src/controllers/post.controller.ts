import { type Request, type Response, type NextFunction } from "express";
import { PostService } from "../services/post.service.ts";
import { get } from "node:http";

export const PostController = {
    getAll: (req: Request, res: Response, next: NextFunction): void => {
        const posts = PostService.getall();
        res.status(200).json({ success: true, posts });
    },
    getById: (req: Request, res: Response, next: NextFunction): void => {
        const postId = parseInt(req.params.id as string, 10);
        const post = PostService.getById(postId);
        if (!post) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, post });
    },
    create: (req: Request, res: Response, next: NextFunction): void => {
        const newPost = PostService.create(req.body);
        res.status(201).json({ success: true, post: newPost });
    },
    update: (req: Request, res: Response, next: NextFunction): void => {
        const postId = parseInt(req.params.id as string, 10);
        const updatedPost = PostService.update(postId, req.body);
        if (!updatedPost) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, post: updatedPost });
    },
    delete: (req: Request, res: Response, next: NextFunction): void => {
        const postId = parseInt(req.params.id as string, 10);
        const deleted = PostService.delete(postId);
        if (!deleted) {
            res.status(404).json({ success: false, message: "Post not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    }
};