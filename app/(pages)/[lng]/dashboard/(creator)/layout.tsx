import { PropsWithChildren } from 'react';
import { AppShell, AppShellMain } from '@mantine/core';

import { PageProps } from '@/app/shared/types';
import { CreatorDashboardSidebar } from '@/app/widgets/creator-dashboard';

const CreatorDashboardLayout = ({ children, params }: PropsWithChildren & PageProps) => {
    return (
        <AppShell component='section' navbar={{ width: '230', breakpoint: 'sm' }}>
            <CreatorDashboardSidebar params={params} />
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
};

export default CreatorDashboardLayout;
