import express ,  {  type Request, type Response } from 'express';
import postRoutes from './routes/postRoutes.ts';

const app = express();

app.use(express.json());
app.use('/posts', postRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Blog!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});