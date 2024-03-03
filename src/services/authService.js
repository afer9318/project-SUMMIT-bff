import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';

let poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

var userPool = new CognitoUserPool(poolData);

console.log(`UserPoolId: ${process.env.USER_POOL_ID}`);
console.log(`ClientId: ${process.env.CLIENT_ID}`);

const authService = {
    signUp: (email, password) => {
        return new Promise((resolve, reject) => {
            const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email
                })
            ];

            userPool.signUp(email, password, attributeList, null, (err, result) => {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    reject(err);
                } else {
                    const username = result ? result.user.getUsername() : '';
                    console.log(`User created with email: ${username}`);
                    resolve(username);
                }
            });
        });
    },

    verifySignUp: (email, code) => {
        return new Promise((resolve, reject) => {
            console.log(`userPool: ${JSON.stringify(userPool)}`);

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            });

            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if (err){
                    return reject(err);
                }

                console.log(`user signup verification result: ${result}`);
                resolve(result);
            });
        });
    }
};

export default authService;