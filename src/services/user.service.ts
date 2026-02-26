import { User } from "../database/entities/user.entity";
import { IUserRepository } from "../contracts/user-repository.interface";
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { UserUpdateDto } from "../dtos/user/update-user.dto";
import { setTimeout } from 'timers/promises';
import { CacheProvider } from "../contracts/cache-provider.interface";

export class UserService {
    
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cacheProvider: CacheProvider
    ) {}
    
    async getAll(): Promise<User[]> {

        const cacheKey = 'users:all';
        const cachedUsers = await this.cacheProvider.get(cacheKey);

        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        } 

        await setTimeout(20000);

        const users = await this.userRepository.getAll();

        if (!users || users.length === 0) {
            throw new NotFoundError({ message: "No users found" });
        }

        await this.cacheProvider.set(cacheKey, JSON.stringify(users), 60);

        return users;
    }

    async create(data: UserCreateDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new ConflictError({message: "Email already in use"});
        }
        
        const user = await this.userRepository.create(data);
        return user;
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        return user;
    }

    async update(id: number, data: UserUpdateDto): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        if (!data.name && !data.phone) {
            throw new BadRequestError({message: "No data provided for update"});
        }

        const dataToUpdate: UserUpdateDto = {
            name: data.name,
            phone: data.phone
        };

        const updatedUser = await this.userRepository.update(id, dataToUpdate);

        if (!updatedUser) {
            throw new NotFoundError({ message: "Not found user to update"});
        }

        return updatedUser;
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        await this.userRepository.delete(id);
    }
}