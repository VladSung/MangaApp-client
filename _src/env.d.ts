///<reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_SERVER: string;
    VITE_API_WS_SERVER: string;
    VITE_AUTH0_DOMAIN: string;
    VITE_AUTH0_CLIENT_ID: string;
    VITE_AUTH0_AUDIENCE: string;
    VITE_AUTH0_SCOPE: string;
    VITE_ORIGIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
