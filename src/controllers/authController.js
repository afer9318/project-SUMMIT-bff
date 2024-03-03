/*
    aws cognito documentation & tutorials
    Amazon Cognito Identity SDK for JavaScript: https://www.npmjs.com/package/amazon-cognito-identity-js?activeTab=readme
    How to Create Authentication APIs with AWS Cognito: https://aws.plainenglish.io/how-to-create-authentication-apis-with-aws-cognito-648bf3225b5d
    AWS Cognito Tutorial Part I | Cognito User Pool & AWS Amplify setup: https://www.youtube.com/watch?v=EaDMG4amEfk&t=1270s
 */


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
            res.status(200).json({result});
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while verifying sign up.' });
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await authService.signIn(email, password);
            res.status(200).json({result});
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while signing in.' });
        }
    }
};

export default authController;