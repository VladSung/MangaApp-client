import { TeamsSidebar } from '@/_src/widgets/creatorDashboard/teams';
import Grid2 from '@mui/material/Unstable_Grid2';
import { PropsWithChildren } from 'react';

const TeamsLayout = ({ children }: PropsWithChildren) => {
    return (
        <Grid2 container>
            <Grid2 xs={'auto'}>
                <TeamsSidebar />
            </Grid2>
            <Grid2 xs>{children}</Grid2>
        </Grid2>
    );
};

export default TeamsLayout;
