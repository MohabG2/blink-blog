import {  type Request,  type Response, Router } from "express";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long")
});
const router = Router();

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

router.get('/', (req: Request, res: Response) => {
    res.json(posts);
});

router.post('/', (req: Request, res: Response) => {
    const validation = createPostSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: "Validation failed", errors: validation.error._zod });
        return;
    }
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title: validation.data.title,
        content: validation.data.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

export default router;