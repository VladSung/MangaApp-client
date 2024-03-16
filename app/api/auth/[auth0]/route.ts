import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email offline_access',
        },
    }),
}) as (...args: any) => any;
/* eslint-enable  */
