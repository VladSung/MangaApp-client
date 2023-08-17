'use client';
import AddAlertRoundedIcon from '@mui/icons-material/AddAlertRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { Box, BoxProps, ListItemButton, ListItemIcon } from '@mui/material';
import { Suspense, useState } from 'react';

import { ListCreator, Sidebar } from '@/_src/entities/sidebar';
import { PageProps } from '@/_src/shared/types';
import { useTranslation } from '@/_src/shared/lib/i18n/client';
import { TFunction } from 'i18next';

const DashboardMenuList = (t: TFunction<string, undefined>, lng: string) => [
    {
        icon: <GridViewRoundedIcon />,
        text: t('sidebar.overview'),
        link: '/creator-dashboard',
        exact: true,
    },
    {
        icon: <QueryStatsRoundedIcon />,
        text: t('sidebar.stats'),
        link: '/creator-dashboard/statistics',
    },
    {
        icon: <AddAlertRoundedIcon />,
        text: t('sidebar.notifications'),
        link: '/creator-dashboard/notifications',
    },
    {
        icon: <MenuBookRoundedIcon />,
        text: t('sidebar.projects'),
        link: '/creator-dashboard/projects',
    },
    {
        icon: <GroupRoundedIcon />,
        text: t('sidebar.teams'),
        link: '/creator-dashboard/teams',
    },
    {
        icon: <MailOutlineRoundedIcon />,
        text: t('sidebar.chats'),
        link: '/creator-dashboard/chats',
    },
];

export const DashboardSidebar = ({ sx, params }: BoxProps & PageProps) => {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation(params.lng, 'creator-dashboard/common');

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const Header = (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', ...sx }}>
            <ListItemButton onClick={handleToggleDrawer}>
                <ListItemIcon>
                    {open ? <NavigateBeforeRoundedIcon /> : <NavigateNextRoundedIcon />}
                </ListItemIcon>
            </ListItemButton>
        </Box>
    );

    return (
        <Sidebar open={open} Header={Header}>
            <Suspense>
                <nav>
                    <ListCreator open={open} list={DashboardMenuList(t, params.lng)} />
                </nav>
            </Suspense>
        </Sidebar>
    );
};
