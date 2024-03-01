import express from 'express';
import authService from '../services/authService.js';

const authController = {
    signUp: (req, res) => {
        const {username, email, password} = req.body;
        authService.signUp(req, res);
    },
    signIn: (req, res) => {
        // res.json(req.body);
        res.send('SignIn!');
    },
    verify: (req, res) => {
        res.send('SignUp Verify!');
    }
};

export default authController;