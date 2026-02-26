import { CacheProvider } from "../../contracts/cache-provider.interface";
import { redisClient } from "./redis";

export class RedisCacheProvider implements CacheProvider {
    
    async get(key: string): Promise<string | null> {
        return await redisClient.get(key);
    }
    
    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
            await redisClient.set(key, value, { EX: ttl });
        } else {
            await redisClient.set(key, value);
        }
    }
    async del(key: string): Promise<void> {
        await redisClient.del(key);
    }

}