
import { Router } from 'express';
import authService  from '../services/auth';
const router = Router();

router.post('/login', async (req, res) => {
    console.log("demo log")
    const {email , password} = req.body;
    try {
        const { username, token, refreshToken } = await authService.login(email, password);
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                username,
                token,
                refreshToken,
            },
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials'  , error: error.message });
    }
});


router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const { message, user } = await authService.register(email, password, username);
        res.status(201).json({
            message,
            user,
        });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed' , error: error.message });
    }
});

router.post('/refresh-token', async (req, res) => {
    const { token } = req.body;
    try {
        const newToken = await authService.refreshToken(token);
        res.status(200).json({
            message: 'Token refreshed successfully',
            token: newToken.token,
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' , error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    const { token } = req.body;
    try {
        const message = await authService.logout(token);
        res.status(200).json({
            message
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' , error: error.message });
    }
});
export default router;