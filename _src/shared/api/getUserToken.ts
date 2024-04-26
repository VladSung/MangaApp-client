'use server';

import { getAccessToken } from '@auth0/nextjs-auth0';

export const getUserToken = async () => {
    const session = await getAccessToken();
    return session;
};
