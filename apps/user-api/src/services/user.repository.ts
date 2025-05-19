import { GenericRepository } from "../interfaces/repository";
import { User } from "../interfaces/user";

class UserRepository implements GenericRepository<User> {
    private users: User[] = []; // In-memory storage for demonstration purposes

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async update(id: string, user: User): Promise<User | null> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        this.users[index] = { ...this.users[index], ...user };
        return this.users[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}

const userRepository = new UserRepository();
export default userRepository;