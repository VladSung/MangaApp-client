import { AppShell, AppShellMain } from '@mantine/core';
import { PageProps } from '@src/shared/types';
import { CreatorDashboardSidebar } from '@src/widgets/creator-dashboard';
import { PropsWithChildren } from 'react';

const CreatorDashboardLayout = async ({ children, params }: PropsWithChildren & PageProps) => {
    return (
        <AppShell component='section' navbar={{ width: '230', breakpoint: 'md' }}>
            <CreatorDashboardSidebar params={params} />
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
};

export default CreatorDashboardLayout;
