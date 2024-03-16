'use server';
export default {
    root: '/',
    comic: {
        root: '/comic',
        id: (id: string) => `/comic/${id}`,
        ch: {
            id: (comicId: string, chapterId: string) => `/comic/${comicId}/ch/${chapterId}`,
        },
    },
    team: {
        root: '/team',
        id: (id: string) => `/team/${id}`,
    },
    user: {
        root: '/user',
        id: (id: string) => `/user/${id}`,
    },

    dashboard: {
        creator: {
            root: '/dashboard',
            comic: {
                root: '/dashboard/comic',
                add: '/dashboard/comic/add',
                id: (id: string) => `/dashboard/comic/${id}`,
                ch: {
                    id: (comicId: string, chapterId: string) =>
                        `/dashboard/comic/${comicId}/ch/${chapterId}`,
                },
            },
            statistic: '',
            notification: '',
            chat: {
                root: '/dashboard/chat',
                id: (id: string) => `/dashboard/chat/${id}`,
            },
            team: {
                root: '/dashboard/team',
                add: '/dashboard/team/add',
                id: (id: string) => `/dashboard/team/${id}`,
            },
        },
    },
};
