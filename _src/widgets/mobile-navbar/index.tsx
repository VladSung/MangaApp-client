'use client'
import { ActionIcon, Flex, Avatar, Paper, Text, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconBookmarks, IconBookmarksFilled, IconHome, IconHomeFilled, IconSearch } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from './styles.module.css'

export const MobileNavbar = ({ lng }: { lng: string }) => {
    const isDesktop = useMediaQuery('(min-width: 768px)', true);

    const theme = useMantineTheme()
    const pathname = usePathname()

    const currentPath = (path: string, exact: boolean = false) => {
        const pathWithoutLng = pathname.replace(`/${lng}`, '')
        if (exact) return pathWithoutLng === path
        return pathWithoutLng.startsWith(path)
    };

    if (isDesktop) return <></>
    return (
        <div className={classes.navbarWrapper}>
            <Paper
                className={classes.navbar}
                withBorder
            >
                <Flex justify='space-between'>
                    {<ActionIcon component={Link} href='/' size='xl' color={currentPath('', true) ? theme.primaryColor : 'var(--mantine-color-text)'} variant='subtle' className={classes.navbarButton} aria-label={'Главная'}>
                        {currentPath('', true) ? <IconHomeFilled className={classes.icon} /> : <IconHome className={classes.icon} />}
                        <Text size='xs'>Главная</Text>
                    </ActionIcon>}
                    <ActionIcon color={currentPath('/comic') ? theme.primaryColor : 'var(--mantine-color-text)'} component={Link} href='/comic' size='xl' variant='subtle' className={classes.navbarButton} aria-label={'Поиск'}>
                        <IconSearch className={classes.icon} stroke={currentPath('/comic') ? 2 : undefined} />
                        <Text size='xs'>Каталог</Text>
                    </ActionIcon>
                    <ActionIcon color={currentPath('/library') ? theme.primaryColor : 'var(--mantine-color-text)'} component={Link} href='/library' size='xl' variant='subtle' className={classes.navbarButton} aria-label='Библиотека'>
                        {currentPath('/library') ? <IconBookmarksFilled className={classes.icon} /> : <IconBookmarks className={classes.icon} />}
                        <Text size='xs'>Закладки</Text>
                    </ActionIcon>
                    <ActionIcon color={currentPath('/account') ? theme.primaryColor : 'var(--mantine-color-text)'} component={Link} href='/account' size='xl' variant='subtle' className={classes.navbarButton} aria-label={'Больше'}>
                        <Avatar className={classes.icon} style={{ background: currentPath('/account') ? `var(--mantine-primary-color-filled)` : undefined, border: `2px solid ${currentPath('/account') ? `var(--mantine-primary-color-filled)` : 'transparent'}` }} />
                        <Text size='xs'>Больше</Text>
                    </ActionIcon>
                </Flex>
            </Paper>
        </div>
    )
}
