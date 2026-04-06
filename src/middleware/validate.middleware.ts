import { type Request, type Response, type NextFunction } from "express";
import { type ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const validation = schema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: "Validation failed", errors: validation.error._zod });
            return;
        }
        req.body = validation.data;
        next();
    }
};