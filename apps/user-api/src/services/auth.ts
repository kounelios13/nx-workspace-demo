import { GenericAuthService } from "../interfaces/auth.service";
import userRepository from "./user.repository";
import bcrypt from 'bcrypt';


class AuthService implements GenericAuthService {
    constructor() {
        // Initialize any necessary properties or dependencies here
    }

    async register(email: string, password: string, username ?: string): Promise<{ message: string; user: { username: string } }> {
        // Here you would typically hash the password and save the user to a database
        // For this example, we'll just return a success message
        const users = await userRepository.findAll();
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }

        await userRepository.create({
            email,
            password : await bcrypt.hash(password, 10),
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
        });


        return {
            message: 'User registered successfully',
            user: {
                username,
                // password, // Don't return the password in a real application
            },
        };
    }

    async login(email: string, password: string): Promise<{ username: string; token: string  , refreshToken: string }> {
        // Here you would typically check the username and password against a database
        // For this example, we'll just return a success message and a dummy token
        console.log('email', email);
        const user = await userRepository.findAll();
        const userExists = user.find(user => user.email === email);
        if (!userExists) {
            throw new Error('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }
        
        return {
            username: 'User logged in successfully',
            token: 'dummy-token', // In a real application, generate a JWT or similar token
            refreshToken: 'dummy-refresh-token', // In a real application, generate a refresh token
        };
    }

    async refreshToken(token: string): Promise<{ token: string }> {
        // Here you would typically validate the token and issue a new one
        // For this example, we'll just return a new dummy token
        return {
            token: 'new-dummy-token', // In a real application, generate a new JWT or similar token
        };
    }

    async logout(token: string): Promise<{ message: string }> {
        // Here you would typically invalidate the token in your database or cache
        // For this example, we'll just return a success message
        return {
            message: 'User logged out successfully',
        };
    }
}


const authService = new AuthService();
export default authService;