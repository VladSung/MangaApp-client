import { AppShellMain, Button, Container } from '@mantine/core';
import { ComicCard } from '@src/entities/comic';
import { ProfileContent, ProfileHeader } from '@src/entities/profile';
import { TeamCard } from '@src/entities/team';
import { PageProps } from '@src/shared/api/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { notFound } from 'next/navigation';

import { userProfileInfoQuery } from '../api';

type Props = PageProps & {
    params: {
        userId: string;
    };
};

export const UserPage = async ({ params }: Props) => {
    const { t } = await fetchTranslation(params.lng, 'team/profile');
    const { data } = await getClient().query({
        query: userProfileInfoQuery,
        variables: { id: params.userId },
    });

    const user = data.user.one;

    if (!user?.publicId) {
        return notFound();
    }

    const teams = user.membersOf?.edges?.map((edge) => edge?.node?.team) ?? [];
    const comics = user.membersOf?.edges?.map((edge) => edge?.node?.comics)?.flat() ?? [];

    return (
        <AppShellMain>
            <Container pt={40} size="lg">
                <ProfileHeader user={user} mb="xl">
                    <Button size="sm">{t('header.follow')}</Button>
                </ProfileHeader>
                <ProfileContent
                    teams={teams.map((t) => t && <TeamCard key={t.id} team={t} />)}
                    comics={comics.map((c) => c && <ComicCard key={c.id} data={c} />)}
                />
            </Container>
        </AppShellMain>
    );
};
