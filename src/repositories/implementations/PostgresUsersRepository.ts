import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRespository";

export class PostgresUserRepository implements IUsersRepository{
    private users: User[]=[];

    async findByEmail(email: string): Promise<User> {
        const userAlreadyExists = this.users.find(user => user.email === email)
        return userAlreadyExists;
    }
    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}