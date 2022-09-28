import { lazy } from "react";

export default [
    {
        title: 'Главная',
        path: '/',
        Component: lazy(() => import('src/pages/Home')),
    },
    {
        title: 'Поиск',
        path: '/search',
        Component: lazy(() => import('src/pages/Home')),
    },
    {
        title: 'Библиотека',
        path: '/library',
        Component: lazy(() => import('src/pages/Home')),
    },
    {
        title: 'Еще',
        path: '/settings',
        Component: lazy(() => import('src/pages/Settings')),
    },
    {
        title: 'Профиль',
        path: '/profile',
        Component: lazy(() => import('src/pages/Profile')),
    },
    {
        title: 'Профиль',
        path: '/manga',
        Component: lazy(() => import('src/pages/Manga')),
    },
];