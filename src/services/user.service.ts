import {type User} from '../models/user.model.ts';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import prisma from  '../prisma.ts'
import type { ca } from 'zod/locales';

let users: User[] = [];
let nextId = 1;
export const UserService =  {
        register: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
            const existingUser = users.find(user => user.email === data.email);
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const newUser: User = {
                id: nextId++,
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            users.push(newUser);
            const {password, ...userWithoutPassword} = newUser;
            return userWithoutPassword;
        },
        findByEmail: async (email: string)  => {
            return await prisma.user.findUnique({
                where: { email }
            });
        },
        findById: async (id: number) => {
            const user = await prisma.user.findUnique({
                where: { id }
            });
            if (!user) {
                return null;
            }
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        },
        updateProfile: async (id: number, data: Prisma.UserUpdateInput) => {
            try {
                const user = await prisma.user.update({
                    where: { id },
                    data
                });
                const {password, ...userWithoutPassword} = user;
                return userWithoutPassword;
            } catch (error) {
                return null;
            }
        }
};
