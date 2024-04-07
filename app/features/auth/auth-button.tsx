'use client'
import { ActionIcon, Button, Group, rem,Switch, useMantineColorScheme , useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

function ThemeSwitcher() {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );

    return <Switch defaultChecked={colorScheme === 'dark'} onClick={toggleColorScheme} size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;
}

export const AuthButton = () => {

    return (<Group justify="flex-end">
        <ThemeSwitcher />
        <Button size='xs' href={'/api/auth/login'} component='a'>Sign In</Button>
    </Group >)
}
