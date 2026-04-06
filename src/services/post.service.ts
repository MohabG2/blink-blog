import type { get } from 'node:http';
import {type Post} from '../models/post.model.ts';

let posts: Post[] = [];
let nextId = 1;

export const PostService = {
    getall: (): Post[] => {
        return posts;
    },
    getById: (id: number): Post | null => {
        const post = posts.find(post => post.id === id);
        return post || null;
    },
    create: (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
        const newPost: Post = {
            id: nextId++,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        posts.push(newPost);
        return newPost;
    },
    update: (id: number, data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Post | null => {
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return null;
        }
        const existingPost = posts[postIndex];
        if(!existingPost) {
            return null;
        }   
        const updatedPost = {
            ...existingPost,
            ...data,
            updatedAt: new Date(),
            id: existingPost.id,
        };
        posts[postIndex] = updatedPost;
        return updatedPost;
    },
    delete: (id: number): boolean => {
        const initialLength = posts.length;
        posts = posts.filter(post => post.id !== id);
        return posts.length < initialLength;
        // const postIndex = posts.findIndex(post => post.id === id);
        // if (postIndex === -1) {
        //     return false;
        // }
        // posts.splice(postIndex, 1);
        // return true;
    }
};