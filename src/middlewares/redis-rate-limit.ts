import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../infra/cache/redis';

export function rateLimit(maxRequests: number, windowSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const key = `rate_limit:${ip}:aa`;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, windowSeconds);
    }

    if (requests > maxRequests) {
      return res.status(429).json({
        status: 429,
        message: 'Too many requests',
        method: req.method,
        path: req.path
      });
    }

    next();
  };
}