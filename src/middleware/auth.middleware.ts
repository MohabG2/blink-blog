import {type Request, type Response, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number, email: string };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: "Access denied! No valid token provided." });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ success: false, message: "Access denied! No valid token provided." });
            return;
        }
        const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
        const decoded = jwt.verify(token, secretKey) as unknown as { id: number, email: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token!" });
    }
};
