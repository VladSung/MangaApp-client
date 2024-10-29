import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/nprogress/styles.layer.css';
import '@src/app/global.css';

import { getSession } from '@auth0/nextjs-auth0';
import { AppShell, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from '@src/app/layout';
import { WithProviders } from '@src/app/with-providers';
import { ErrorWrapper } from '@src/entities/error';
import { theme } from '@src/shared/ui/theme';
import { dir } from 'i18next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { PropsWithChildren } from 'react';

import { MobileNavbar } from './mobile-navbar';
import { PageProps } from '@src/shared/api';

type Props = {
    token?: string;
} & PageProps;

export const RootLayout = async ({ children, params }: Props & PropsWithChildren) => {
    const { lng } = await params;
    const session = await getSession();

    return (
        <html lang={lng} dir={dir(lng)}>
            <head>
                <ColorSchemeScript />
                <link rel="icon" href="/assets/favicon.ico" sizes="any" />
            </head>
            <body>
                <MantineProvider defaultColorScheme="auto" theme={theme}>
                    <AppShell header={{ height: 60 }}>
                        <WithProviders token={session?.accessToken}>
                            <Notifications />
                            <Header lng={lng} />
                            <div style={{ minHeight: `calc(100dvh - ${60}px` }}>
                                <ErrorBoundary errorComponent={ErrorWrapper}>
                                    {children}
                                </ErrorBoundary>
                            </div>
                            <MobileNavbar lng={lng} />
                        </WithProviders>
                    </AppShell>
                </MantineProvider>
            </body>
        </html>
    );
};
