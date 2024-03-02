import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js';

let poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

var userPool = new CognitoUserPool(poolData);

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
    }
};

export default authService;

// const signUp = (email, password) => {
//     return new Promise((resolve, reject) => {
//         const attributeList = [
//             new CognitoUserAttribute({
//                 Name: 'email',
//                 Value: email
//             })
//         ];

//         userPool.signUp(email, password, attributeList, null, (err, result) => {
//             if (err) {
//                 console.log(err.message || JSON.stringify(err));
//                 reject(err);
//             } else {
//                 const username = result ? result.user.getUsername() : '';
//                 console.log(`User created with email: ${username}`);
//                 resolve(username);
//             }
//         });
//     });
// };

// export {signUp};