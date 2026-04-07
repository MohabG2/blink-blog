import {type Post} from '../models/post.model.ts';
import prisma from '../prisma.ts';


const normalizePost = (post: any): Post => {
    const { upadatedAt, ...rest } = post;
    return {
        ...rest,
        updatedAt: upadatedAt ?? post.updatedAt,
    } as Post;
};

export const PostService = {
    getall: async (): Promise<Post[]> => {
        const result = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
        }});
        return result.map(normalizePost);
    },
    getById: async (id: number): Promise<Post | null> => {
        const result = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        return result ? normalizePost(result) : null;
    },
    create: async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
        const result = await prisma.post.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        return normalizePost(result);

    },
    update: async (id: number, data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post | null> => {
        try {
            const result = await prisma.post.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            });
            return normalizePost(result);
        } catch (error) {
            return null;
        }
    },
    delete: async (id: number): Promise<boolean> => {
        try {
            await prisma.post.delete({
                where: { id }
            });
            return true;
        } catch(error) {
            return false;
        }
    }
};