import { AppShell, AppShellMain } from '@mantine/core';
import { PageProps } from '@src/shared/api/types';
import { DashboardSidebar } from '@src/widgets/creator-dashboard/sidebar';
import { PropsWithChildren } from 'react';

export const CreatorDashboardLayout = async ({
    children,
    params,
}: PropsWithChildren & PageProps) => {
    return (
        <AppShell component="section" navbar={{ width: '230', breakpoint: 'md' }}>
            <DashboardSidebar params={params} />
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
};
