'use client'

import { ActionIcon, Flex, Paper } from "@mantine/core"
import { IconBookmarks, IconDotsVertical, IconHome, IconSearch } from "@tabler/icons-react"
import { PropsWithChildren } from "react"

const BottomNavigation = ({ children }: PropsWithChildren) => {
    return (
        <Flex style={{ position: 'fixed', paddingTop: 8, bottom: 0, left: 0, right: 0 }}>
            {children}
        </Flex>
    )
}

export const MobileNavbar = () => {

    return (
        <Paper>
            <BottomNavigation>
                <ActionIcon radius={0} style={{ gap: 4 }} value='home' aria-label={'Главная'}>
                    <IconHome fontSize='small' />
                </ActionIcon>
                <ActionIcon radius={0} style={{ gap: 4 }} value='catalog' aria-label={'Поиск'}>
                    <IconSearch fontSize='small' />
                </ActionIcon>
                <ActionIcon radius={0} style={{ gap: 4 }} value='library' aria-label='Библиотека'>
                    <IconBookmarks fontSize='small' />
                </ActionIcon>
                <ActionIcon radius={0} style={{ gap: 4 }} value='more' aria-label={'Больше'}>
                    <IconDotsVertical fontSize='small' />
                </ActionIcon>
            </BottomNavigation>
        </Paper>
    )
}
