type CheckIsOnline = (url?: string) => Promise<boolean | undefined>;

export const checkIsOnline: CheckIsOnline = async (url: string = 'https://auth0.com') => {
    if (typeof window !== 'undefined') {
return navigator.onLine;
}

    try {
        const resp = await fetch(url);

        return resp.status >= 200 && resp.status < 300;
    } catch (error) {
        console.log(error);
    }
};
