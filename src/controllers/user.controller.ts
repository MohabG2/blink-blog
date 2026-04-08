import { type Request, type Response, type NextFunction } from "express";
import { UserService } from "../services/user.service.ts";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { ConflictError } from "../utils/errors.ts";

export const UserController = {
    register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await UserService.register(req.body);
            res.status(201).json({ success: true,message: "User registered successfully", user });
        } catch (error) {
            if (error instanceof ConflictError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                res.status(400).json({ success: false, message: (error as Error).message });
            }
        }
    },
    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await UserService.findByEmail(email);
            if (!user) {
                res.status(401).json({ success: false, message: "Invalid email or password" });
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ success: false, message: "Invalid email or password" });
                return;
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error occurred during login:", error);
            next(error);
        }
    },
    getProfile: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id as string, 10);
        const user = await UserService.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user });
    },
    updateProfile: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = parseInt(req.params.id as string, 10);
        const updatedUser = await UserService.updateProfile(userId, req.body);
        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, user: updatedUser });
    }
};