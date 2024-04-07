'use client';
import { BoxProps } from '@mantine/core';
import { IconBellPlus, IconChartHistogram, IconLayoutCollage, IconLayoutGrid, IconMenu, IconMessageCircle, IconUsers } from '@tabler/icons-react';

import { useTranslation } from '@/app/shared/lib/i18n/client';
import { PageProps } from '@/app/shared/types';
import { Avatar } from '@/app/shared/ui/Avatar';
import { NavLink } from '@/app/shared/ui/NavLink';

import { teamsQuery } from './queries';
import { AddTeamWidget } from './team';
import Wrapper from './wrapper';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

export const DashboardSidebar = ({ params }: BoxProps & PageProps) => {
    const { t } = useTranslation(params.lng, 'creator-dashboard/common');
    const teamData = useQuery(teamsQuery)
    const teamsList = teamData?.data?.me?.member?.map((member =>
    (
        <NavLink key={member.team?.id} variant='outline' px={16} style={{ borderRadius: 99 }}
            label={member.team?.name}
            href={`/dashboard/team/${member?.team?.id}`}
            leftSection={<Avatar size='sm' src={member.team?.avatar} alt={member?.team?.name || ''} />} />
    )))

    return (
        <Wrapper>
            <NavLink exact variant='light' style={{ borderRadius: 99 }} label={t('sidebar.overview')} href='/dashboard' leftSection={<IconLayoutGrid />} />
            <NavLink variant='light' style={{ borderRadius: 99 }} label={t('sidebar.stats')} href={'/dashboard/statistic'} leftSection={<IconChartHistogram />} />
            <NavLink variant='light' style={{ borderRadius: 99 }} label={t('sidebar.notifications')} href={'/dashboard/notification'} leftSection={<IconBellPlus />} />
            <NavLink variant='light' style={{ borderRadius: 99 }} label={t('sidebar.projects')} href={'/dashboard/comic'} leftSection={<IconLayoutCollage />} />
            <NavLink decorative variant='light' defaultOpened style={{ borderRadius: 99 }} label={t('sidebar.teams')} leftSection={<IconUsers />} href={'/dashboard/team'}>
                {teamsList}
                <AddTeamWidget labels={{ createTeam: t('sidebar.create-team') }} />
            </NavLink>
            <NavLink variant='light' style={{ borderRadius: 99 }} label={t('sidebar.chats')} href={'/dashboard/chat'} leftSection={<IconMessageCircle />} />
        </Wrapper>
    );
};
