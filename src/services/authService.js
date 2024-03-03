import {AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

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
    },

    signIn: (email, password) => {
        return new Promise((resolve, reject) => {

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            });

            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session, userConfirmationNecessary) => {
                    if (userConfirmationNecessary) {
                        return resolve({ userConfirmationNecessary });
                    }

                    resolve({
                        accessToken: session.getAccessToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken(),
                    });
                },

                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    }
};

export default authService;