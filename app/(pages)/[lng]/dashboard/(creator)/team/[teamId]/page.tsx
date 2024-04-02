import { getAccessToken } from '@auth0/nextjs-auth0';
import { ActionIcon, Box, Button, Container, Divider, Fieldset, Flex, Group, Modal, rem, Select, Stack, Table, Tabs, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { IconLink, IconPlus, IconTrash, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

import { ComicListItem } from '@/app/entities/comic';
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
    const token = await getAccessToken()
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
            <Box component='section'>
                {data?.team?.comics?.map(c => (
                    <ComicListItem
                        key={c.id}
                        data={{
                            title: c.title,
                            subtitle: c.alternativeTitles,
                            lastChange: dayjs(c.updatedAt as string).format('DD.MM.YYYY'),
                            cover: c.cover
                        }}
                        href={`/dashboard/comic/${c.id}`} />
                ))}
                {(data?.team?.comics?.length || 0) < 1 && <Title order={4}>Nothing to show</Title>}


            </Box>
        </Container >
    )
}

export default (TeamList)
