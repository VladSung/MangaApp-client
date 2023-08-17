import { Box } from '@mui/material';

import { CreatorDashboardSidebar } from '@/_src/widgets/creatorDashboard';
import { PropsWithChildren } from 'react';
import { PageProps } from '@/_src/shared/types';

const CreatorDashboardLayout = ({ children, params }: PropsWithChildren & PageProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CreatorDashboardSidebar params={params} />
            <Box sx={{ width: '100%', minHeight: '100%' }}>{children}</Box>
        </Box>
    );
};
export default CreatorDashboardLayout;
