import { AppShellNavbar, BoxProps, Flex } from '@mantine/core';
import { IconBellPlus, IconChartHistogram, IconLayoutCollage, IconLayoutGrid, IconMessageCircle } from '@tabler/icons-react';


import { PageProps } from '@/app/shared/types';
import { getClient } from '@/app/shared/lib/apollo/client';
import { useTranslation } from '@/app/shared/lib/i18n';
import { NavLink } from '@/app/shared/ui/NavLink';
import { Avatar } from '@/app/shared/ui/Avatar';
import { AddTeamWidget } from './Team';
import { teamsQuery } from './queries';

export const DashboardSidebar = async ({ params }: BoxProps & PageProps) => {
    const { t } = await useTranslation(params.lng, 'creator-dashboard/common');

    const teamData = await getClient().query({ query: teamsQuery })
    const teamsList = teamData?.data?.me?.member?.map((member =>
    (
        <NavLink key={member.team?.id} variant='outline' px={16} style={{ borderRadius: 99 }}
            label={member.team?.name}
            href={`/dashboard/team/${member?.team?.id}`}
            leftSection={<Avatar size='sm' src={member.team?.avatar} alt={member?.team?.name || ''} />} />
    )))

    return (
        <AppShellNavbar w={230} p='md'>
            <Flex direction='column' gap={10} style={{ padding: 0, margin: 0 }}>
                <NavLink exact variant='light' px={16} style={{ borderRadius: 99 }} label={t('sidebar.overview')} href='/dashboard' leftSection={<IconLayoutGrid />} />
                <NavLink variant='light' px={16} style={{ borderRadius: 99 }} label={t('sidebar.stats')} href={'/dashboard/statistic'} leftSection={<IconChartHistogram />} />
                <NavLink variant='light' px={16} style={{ borderRadius: 99 }} label={t('sidebar.notifications')} href={'/dashboard/notification'} leftSection={<IconBellPlus />} />
                <NavLink variant='light' px={16} style={{ borderRadius: 99 }} label={t('sidebar.projects')} href={'/dashboard/comic'} leftSection={<IconLayoutCollage />} />
                <AddTeamWidget teams={teamsList} labels={{ teams: t('sidebar.teams'), createTeam: t('sidebar.create-team') }} />
                <NavLink variant='light' px={16} style={{ borderRadius: 99 }} label={t('sidebar.chats')} href={'/dashboard/chat'} leftSection={<IconMessageCircle />} />
            </Flex>
        </AppShellNavbar>
    );
};
