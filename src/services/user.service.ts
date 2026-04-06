import e from 'express';
import {type User} from '../models/user.model.ts';

let users: User[] = [];
let nextId = 1;

export const UserService =  {
        register: (data: Omit<User, 'id'>) => {
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
        findByEmail: (email: string) : User | undefined => {
            return users.find(user => user.email === email);
        },
        findById: (id: number) => {
            const user = users.find(user => user.id === id);
            if (!user) {
                return null;
            }
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        },
        updateProfile: (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) {
                return null;
            }
            const existingUser = users[userIndex];
            if(!existingUser) {
                return null;
            }   
            const updatedUser = {
                ...existingUser,
                ...data,
                updatedAt: new Date(),
                id: existingUser.id,
            };
            users[userIndex] = updatedUser;
            const {password, ...userWithoutPassword} = updatedUser;
            return userWithoutPassword;
        }
};