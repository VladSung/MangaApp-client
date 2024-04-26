'use client'
import { Flex, NavLink, Switch, useMantineColorScheme } from "@mantine/core"
import { IconMoon } from "@tabler/icons-react"
import classes from './styles.module.css'

export const ToggleTheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Switch
            className={`${classes.switch}`}
            onClick={toggleColorScheme}
            checked={colorScheme === 'dark'}
            component={NavLink}
            label={<Flex component='span'>
                < IconMoon size={18} style={{ marginInlineEnd: 'var(--mantine-spacing-sm)' }} />
                Темный режим
            </Flex>}
            labelPosition="left"
        />
    )
}