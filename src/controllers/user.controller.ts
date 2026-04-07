import { type Request, type Response, type NextFunction } from "express";
import { UserService } from "../services/user.service.ts";
// import bcrypt from 'bcrypt';

export const UserController = {
    register: (req: Request, res: Response, next: NextFunction): void => {
        try {
            const user = UserService.register(req.body);
            res.status(201).json({ success: true,message: "User registered successfully", user });
        } catch (error) {
            if ((error as Error).message === "Email already exists") {
                res.status(409).json({ success: false, message: (error as Error).message });
            } else {
                res.status(400).json({ success: false, message: (error as Error).message });
            }
        }
    },
    login: (req: Request, res: Response, next: NextFunction): void => {
        const { email, password } = req.body;
        const user = UserService.findByEmail(email);
        if (!user || user.password !== password) {
            res.status(401).json({ success: false, message: "Invalid email or password" });
            return;
        }
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ success: true, message: "Login successful", user: userWithoutPassword });
    },
    getProfile: (req: Request, res: Response, next: NextFunction): void => {
        const userId = parseInt(req.params.id as string, 10);
        const user = UserService.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user });
    },
    updateProfile: (req: Request, res: Response, next: NextFunction): void => {
        const userId = parseInt(req.params.id as string, 10);
        const updatedUser = UserService.updateProfile(userId, req.body);
        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user: updatedUser });
    }
};