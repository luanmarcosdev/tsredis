import express from 'express';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler.middleware';

export const app = express();

app.use(express.json());
app.use('/api/', userRouter);
app.use(errorHandler);
