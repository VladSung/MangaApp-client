import {
    AfterCallbackAppRoute,
    handleAuth,
    handleCallback,
    handleLogin,
} from '@auth0/nextjs-auth0';
/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */

const authMutation = `
    mutation AuthUser($input: AuthInput){
        user{
            auth(input: $input){
                record{
                    publicId
                    name
                    email
                }
                issue{
                    message
                }
            }
        }
    }`;

const afterCallback: AfterCallbackAppRoute = async (_req, session) => {
    if (session) {
        await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
                query: authMutation,
                variables: {
                    input: {
                        email: session.user.email,
                        username: session.user.name,
                        avatar: session.user.picture,
                    },
                },
            }),
        });

        return session;
    }
};

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email offline_access',
        },
    }),
    callback: handleCallback({
        afterCallback,
    }),
});
/* eslint-enable  */
