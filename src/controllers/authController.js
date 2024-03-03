import express from 'express';
import authService from '../services/authService.js';

const authController = {
    signUp: async (req, res) => {
        try {
            const { email, password } = req.body;
            const username = await authService.signUp(email, password);
            res.status(200).json({ username });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while signing up.' });
        }
    },
    verifySignUp: async (req, res) => {
        try {
            const { email, code } = req.body;
            const result = await authService.verifySignUp(email, code);
            res.status(400).json({result});
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while verifying sign up.' });
        }
    },
    signIn: (req, res) => {
        // res.json(req.body);
        res.send('SignIn!');
    }
};

export default authController;