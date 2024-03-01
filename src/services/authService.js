import {CognitoUserPool, CognitoUserAttribute, CognitoUser,} from 'amazon-cognito-identity-js';

let poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

var userPool = new CognitoUserPool(poolData);

const authService = {
    signUp: (req, res) => {
        const {email, password} = req.body;

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            })
        ]

        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err){
                console.log(err.message || JSON.stringify(err));
		        return;
            }

            const username = result ? result.user.getUsername() : '';
            console.log(`User created with email: ${username}`);
            return res.status(200).json({ username });
        })
    }

};

export default authService;