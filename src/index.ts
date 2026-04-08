import express ,  {  type Request, type Response, type NextFunction } from 'express';
import postRoutes from './routes/post.routes.ts';
import userRoutes from './routes/user.routes.ts';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Blog API!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "The route ${req.originalUrl} does not exist" });
});

interface CustomError extends Error {
    status?: number;
}
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error("An error occurred:", err);
    res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" ,error: err});
});
 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});