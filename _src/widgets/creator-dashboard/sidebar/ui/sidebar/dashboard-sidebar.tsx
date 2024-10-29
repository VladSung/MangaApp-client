'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { BoxProps } from '@mantine/core';
import { userTeamsQuery } from '@src/entities/team';
import { PageProps } from '@src/shared/api/types';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { Avatar, NavLink } from '@src/shared/ui';
import {
    IconBellPlus,
    IconChartHistogram,
    IconLayoutCollage,
    IconLayoutGrid,
    IconMessageCircle,
    IconUsers,
} from '@tabler/icons-react';

import { AddTeamWidget } from './team';
import Wrapper from './wrapper';

export const DashboardSidebar = ({ params }: BoxProps & PageProps) => {
    const { t } = useTranslation(params.lng, 'dashboard/creator/common');
    const teamData = useQuery(userTeamsQuery);
    const teamsList = teamData?.data?.user.me?.membersOf?.edges?.map(
        (member) =>
            member?.node.team?.id && (
                <NavLink
                    key={member?.node.team?.id}
                    variant="outline"
                    px={16}
                    style={{ borderRadius: 99 }}
                    label={member?.node.team?.name}
                    href={`/dashboard/team/${member?.node?.team?.id}`}
                    leftSection={
                        <Avatar
                            size="sm"
                            src={member?.node.team?.avatar}
                            alt={member?.node?.team?.name || ''}
                        />
                    }
                />
            )
    );

    return (
        <Wrapper>
            <NavLink
                exact
                variant="light"
                style={{ borderRadius: 99 }}
                label={t('sidebar.overview')}
                href="/dashboard"
                leftSection={<IconLayoutGrid />}
            />
            <NavLink
                variant="light"
                style={{ borderRadius: 99 }}
                label={t('sidebar.stats')}
                href={'/dashboard/statistic'}
                leftSection={<IconChartHistogram />}
            />
            <NavLink
                variant="light"
                style={{ borderRadius: 99 }}
                label={t('sidebar.notifications')}
                href={'/dashboard/notification'}
                leftSection={<IconBellPlus />}
            />
            <NavLink
                variant="light"
                style={{ borderRadius: 99 }}
                label={t('sidebar.projects')}
                href={'/dashboard/comic'}
                leftSection={<IconLayoutCollage />}
            />
            <NavLink
                decorative
                variant="light"
                defaultOpened
                style={{ borderRadius: 99 }}
                label={t('sidebar.teams')}
                leftSection={<IconUsers />}
                href={'/dashboard/team'}
            >
                {teamsList}
                <AddTeamWidget params={params} labels={{ createTeam: t('sidebar.create-team') }} />
            </NavLink>
            <NavLink
                variant="light"
                style={{ borderRadius: 99 }}
                label={t('sidebar.chats')}
                href={'/dashboard/chat'}
                leftSection={<IconMessageCircle />}
            />
        </Wrapper>
    );
};
