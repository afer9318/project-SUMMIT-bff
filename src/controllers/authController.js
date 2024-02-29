import express from 'express';

const authController = {
    signUp: (req, res) => {
        // res.json(req.body);
        res.send('SignUp!');
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