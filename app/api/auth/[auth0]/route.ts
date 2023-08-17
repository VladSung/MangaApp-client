import { getAccessToken, handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email offline_access',
        },
    }),
    // getAccessToken: async (req, res)=>{
    //     const token = await getAccessToken();

    //     return res.send(token);
    // }
});
