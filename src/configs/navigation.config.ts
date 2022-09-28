import {
    Home,
    HomeOutlined,
    LibraryBooks,
    LibraryBooksOutlined,
    Menu,
    Search,
    SearchOutlined
} from "@mui/icons-material";

const navigation = [
    {
        title: 'Главная',
        path: '/',
        Icon: HomeOutlined,
        ActiveIcon: Home,
    },
    {
        title: 'Поиск',
        path: '/search',
        Icon: SearchOutlined,
        ActiveIcon: Search,
    },
    {
        title: 'Библиотека',
        path: '/library',
        Icon: LibraryBooksOutlined,
        ActiveIcon: LibraryBooks,
    },
    {
        title: 'Еще',
        path: '/settings',
        Icon: Menu,
        ActiveIcon: Menu,
    },
];

export default navigation;