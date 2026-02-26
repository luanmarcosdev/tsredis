import express from 'express';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { rateLimit } from './middlewares/redis-rate-limit';

export const app = express();

app.use(express.json());
app.use(rateLimit(10, 60)); // limit to 5 requests per minute per IP
app.use('/api/', userRouter);
app.use(errorHandler);
