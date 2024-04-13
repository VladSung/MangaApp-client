import { AppShellSection, Container, Group, Title } from '@mantine/core';

import { ComicCard } from '@/app/entities/comic';
import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';
import { PageProps } from '@/app/shared/types';
import { NotFoundError } from '@/app/widgets/not-found';

import { TeamPageHeader } from './header';
// написать запрос если ничего не найдено то
//      показать компонент ошибка с сообщением что контента нет, можно добавить какую то илюстрацию
//      показать список команд

type Props = PageProps & {
    params: {
        teamId: string;
    }
}

const teamQuery = graphql(`
    query MyTeamInfo($id:ID!) {
        team(id:$id) {
            id
            name
            tagline
            avatar
            members{
                role
                user{
                    username
                    avatar
                    email
                }
            }
            comics{
                id
                title
                alternativeTitles
                cover
                updatedAt
            }
        }
    }
`);


const TeamList = async ({ params }: Props) => {
    const { data, loading } = await getClient().query({
        query: teamQuery,
        variables: { id: params.teamId }
    });

    if (!loading && !data?.team) {
        return <NotFoundError params={params} />
    }

    return (
        <Container fluid p={24}>
            <TeamPageHeader team={data.team} params={params} />
            <AppShellSection component='section'>
                <Group gap='md' w='100%' align='flex-start'>
                    {data?.team?.comics?.map(c => (
                        <ComicCard
                            key={c.id}
                            data={{
                                id: c.id,
                                title: c.title,
                                // subtitle: c.alternativeTitles,
                                // lastChange: dayjs(c.updatedAt as string).format('DD.MM.YYYY'),
                                cover: c.cover
                            }}
                            href={`/dashboard/comic/${c.id}`} />
                    ))}
                </Group>
                {(data?.team?.comics?.length || 0) < 1 && <Title order={4}>Nothing to show</Title>}
            </AppShellSection>
        </Container >
    )
}

export default (TeamList)
