import { v4 as uuidv4 } from 'uuid';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository{
    users: User[] = [];
    async create({
        email,
        name,
        password,
        photo,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            id:uuidv4(),
            email, 
            password, 
            name,
            photo
        })

        this.users.push(user);
        
        return user
    }
    async update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }
    async delete(user: User): Promise<void> {
        this.users.splice(this.users.indexOf(user));
    }
}