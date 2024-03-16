import {
    Group,
    Button,
    rem,
    ThemeIcon,
    Box,
    AppShellHeader,
    Skeleton,
    Avatar
} from '@mantine/core';
import Link from 'next/link';
import { IconSearch } from '@tabler/icons-react';

import classes from './header.module.css';
import { Logo } from '@/app/shared/ui/logo';
import { LoginButtonOrAvatar } from '@/app/features/auth';
import { Suspense } from 'react';
import { LanguagePicker } from '@/app/features/language';
import { useTranslation } from '@/app/shared/lib/i18n';

async function Header({ lng }: { lng: string }) {
    // const { toggleColorScheme } = useMantineColorScheme();
    const { t } = await useTranslation(lng, 'header')
    return (
        <AppShellHeader className={classes.header}>
            <Group px={32} justify="space-between" h="100%">
                <Box>
                    <Link href="/" className={classes.link}>
                        <Logo size={40} />
                    </Link>
                </Box>

                <Group h="100%" gap={0} style={{ margin: '0 auto 0 40px' }} visibleFrom="sm">
                    <Link href="/popular" className={classes.link}>
                        {t('popular')}
                    </Link>
                    <Link href="/comic" className={classes.link}>
                        {t('catalog')}
                    </Link>
                </Group>

                <Group>
                    <Button
                        visibleFrom="sm"
                        variant='outline'
                        className={classes.search}
                        style={{ marginLeft: 16, 'span': { justifyContent: 'flex-start' }, minWidth: 200 }}
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        rightSection={'⌘K'}
                    >
                        Search
                    </Button>
                    <LanguagePicker currentLng={lng} />
                    <Suspense fallback={<Avatar />}>
                        <LoginButtonOrAvatar />
                    </Suspense>
                </Group>
            </Group>
        </AppShellHeader>
    );
}

export default Header