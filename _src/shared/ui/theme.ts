import { createTheme, MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
    '#ffecee',
    '#f7d7da',
    '#edadb3',
    '#e37f88',
    '#da5965',
    '#d7424e',
    '#d43542',
    '#bc2834',
    '#a9212d',
    '#941625',
];

export const theme = createTheme({
    // colors: { primary:cyan },
    defaultRadius: 'lg',
    primaryColor: 'cyan',
    cursorType: 'pointer',
});
