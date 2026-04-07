import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import prisma from  '../prisma.ts'

export const UserService =  {
        register: async (data: Prisma.UserCreateInput) => {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email }
            });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userData = await prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                }
            });
            const {password, ...userWithoutPassword} = userData;
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
