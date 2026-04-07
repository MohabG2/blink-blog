import {z} from "zod";

export const createPostSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    authorID: z.number().int().positive("Author ID must be a positive integer")
});

export const updatePostSchema = z.object({
    title: z.string().min(3, "Title is required").optional(),
    content: z.string().min(10, "Content must be at least 10 characters long").optional(),
});