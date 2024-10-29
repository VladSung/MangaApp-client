import { AppShellHeader, Loader } from '@mantine/core';
import { UserMenu } from '@src/features/auth'
import { lazy, Suspense } from 'react';

import classes from './header.module.css';
import { Navigation } from './navigation';


export async function Header({ lng }: { lng: string }) {
    return (
        <AppShellHeader withBorder={false} className={classes.header}>
            <div className={classes.headerInner}>
                <Navigation lng={lng} />
                <div className={classes.profileBox}>
                        <UserMenu />
                </div>
            </div>
        </AppShellHeader>
    );
}
