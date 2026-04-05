import express ,  {  type Request, type Response, type NextFunction } from 'express';
import postRoutes from './routes/postRoutes.ts';
import morgan from 'morgan';
import { error } from 'node:console';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/posts', postRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello Blog API!');
});

// 404 handler to catch undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler to catch all errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error found by global error handler:", err.stack);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
    error: err
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});