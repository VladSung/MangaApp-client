import { default as path } from './path';

export const config = {
    apollo: {
        uri: process.env.APP_API_SERVER,
        wsUri: process.env.VITE_API_WS_SERVER,
    },
};
