'use client'
import { ActionIcon, Flex, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconBookmarks, IconDotsVertical, IconHome, IconSearch } from "@tabler/icons-react"
import Link from "next/link"

const height = 44;
export const MobileNavbar = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)', true);
    if (isDesktop) return <></>
    return (
        <div style={{ position: 'sticky', marginTop: 16, height, bottom: 0, left: 0, right: 0 }}>
            <Paper
                component={Flex}
                style={{ position: 'fixed', height, justifyContent: 'space-between', zIndex: ' calc(100 + 1)', width: '100%', gap: 8, bottom: 0, left: 0, right: 0 }}
                withBorder
            >
                <ActionIcon component={Link} href='/' size='xl' variant='subtle' style={{ gap: 4, flexGrow: 1 }} aria-label={'Главная'}>
                    <IconHome />
                </ActionIcon>
                <ActionIcon component={Link} href='/comic' size='xl' variant='subtle' style={{ gap: 4, flexGrow: 1 }} aria-label={'Поиск'}>
                    <IconSearch />
                </ActionIcon>
                <ActionIcon component={Link} href='/library' size='xl' variant='subtle' style={{ gap: 4, flexGrow: 1 }} aria-label='Библиотека'>
                    <IconBookmarks />
                </ActionIcon>
                <ActionIcon component={Link} href='/account' size='xl' variant='subtle' style={{ gap: 4, flexGrow: 1 }} aria-label={'Больше'}>
                    <IconDotsVertical />
                </ActionIcon>
            </Paper>
        </div>
    )
}
