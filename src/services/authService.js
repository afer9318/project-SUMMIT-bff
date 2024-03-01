import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';

let poolData = {
    UserPoolId: process.env.USER_POOL_ID || 'us-east-1_t4CeWwZN6',
    ClientId: process.env.CLIENT_ID || '6l4o45ijlm1noadgp71d3ugsus'
};

// let poolData = {
//     Port: process.env.PORT,
//     UserPoolId: process.env.USER_POOL_ID,
//     ClientId: process.env.CLIENT_ID
// };

// console.log('PORT:', process.env.PORT);
// console.log('USER_POOL_ID:', process.env.USER_POOL_ID);
// console.log('CLIENT_ID:', process.env.CLIENT_ID);

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
                return res.status(500).json({ error: err.message || 'An error occurred while signing up.' });
            }

            const username = result ? result.user.getUsername() : '';
            console.log(`User created with email: ${username}`);
            return res.status(200).json({ username });
        })
    }

};

export default authService;