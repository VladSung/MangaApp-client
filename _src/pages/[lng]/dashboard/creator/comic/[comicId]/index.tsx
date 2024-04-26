import { Paper, Text, Title, SimpleGrid, Button, Group, Container, ActionIcon, Avatar, Modal, Fieldset } from '@mantine/core';
import { IconTrendingUp, IconUser, IconBookmarks, IconEdit, IconExternalLink, IconSettings, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { PageProps } from '@src/shared/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { graphql } from '@src/shared/api/graphql';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { SettingsModal } from './settings-modal';

type Props = PageProps & {
    params: {
        comicId: string
    }
}

const getComicQuery = graphql(`
    query getComicPageData($id: ID!) {
        comic(id:$id){
            title
            cover
        }
    }
`)

const ComicPage = async ({ params }: Props) => {

    const { data } = await getClient().query({
        query: getComicQuery,
        variables: { id: params.comicId }
    })


    const items = [
        { icon: IconTrendingUp, title: 'Популярность', value: 0 },
        { icon: IconUser, title: 'Читатели', value: 0 },
        { icon: IconBookmarks, title: 'В закладках', value: 0 },
        { icon: IconUser, title: 'Платные подписки', value: 0 },
    ];


    return (
        <Container size='xl' pt='lg'>
            <Group justify="space-between" mb='lg'>
                <Group>
                    <Avatar w={40} h={40 * 1.5} radius='md'>
                        <Image src={data?.comic?.cover!} width={40} height={40 * 1.5} alt='' />
                    </Avatar>
                    <Title order={3}>{data?.comic?.title}</Title>
                    <ActionIcon title='Перейти к комиксу' aria-label='Перейти к комиксу' size='sm' component={Link} href={`/comic/${params.comicId}`}>
                        <IconExternalLink size={14} />
                    </ActionIcon>
                </Group>
                <Group>
                    <Button size='xs' component={Link} href={`/dashboard/comic/${params.comicId}/ch-new`} leftSection={<IconPlus size={16} />}>
                        Главу
                    </Button>
                    <Button size='xs' variant='outline' component={Link} href={`/dashboard/comic/${params.comicId}/edit`} leftSection={<IconEdit size={16} />}>
                        Редактировать
                    </Button>
                    <SettingsModal params={params} />
                </Group>
            </Group>
            <Title order={4} mb="md">Статистика за последний месяц</Title>
            <SimpleGrid cols={3} >
                {items.map((item, index) => (
                    <Paper key={index} withBorder p="md">
                        <item.icon size={24} strokeWidth={2} color="gray" />
                        <Text size="sm" c="dimmed" fw={500}>
                            {item.title}
                        </Text>
                        <Text size="xl" fw={700}>
                            {item.value}
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ComicPage;