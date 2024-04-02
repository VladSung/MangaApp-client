import { ActionIcon, AppShellSection, Button, Flex, Group, Paper, rem, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { ChapterListItem } from '@/app/entities/chapter';
import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';
import { UpdateComicWidget } from '@/app/widgets/comic';

const getChaptersQuery = graphql(`
    query ChaptersByComicId($id:ID!){
        chapters(comicId:$id){
            title
            volume
            number
            id
            publishDate
            price
        }    
    }
`)

const AddComic = async ({ params: { comicId } }: { params: { comicId: string } }) => {
    const chapters = await getClient().query({ query: getChaptersQuery, variables: { id: comicId } })

    return (
        <Flex gap='lg'>
            <AppShellSection grow><UpdateComicWidget comicId={comicId} /></AppShellSection>
            <AppShellSection w={480} py={32} pr={24}>
                <Paper h='100%' p={16}>
                    <Group mb='xl' gap={8} align='center' justify='space-between'>
                        <Title size="h4" order={2}>
                            Comic Chapters
                        </Title>
                        <Button
                            size='xs'
                            href={`/dashboard/comic/${comicId}/ch-new`} component={Link} variant='contain'
                            leftSection={<IconPlus size={16} stroke={rem(2)} />}
                        >
                            Chapter
                        </Button>
                    </Group>
                    <Stack gap='sm' miw={420}>
                        {chapters.data.chapters
                            ? chapters.data.chapters?.map(
                                ch => (<ChapterListItem key={ch.id} comicId={comicId} chapter={{ title: ch.title, createdAt: ch.publishDate as string, volume: ch.volume, number: ch.number, id: ch.id, price: ch.price }} />)
                            )
                            : <Text>Chapters not found</Text>
                        }
                    </Stack>
                </Paper>
            </AppShellSection>
        </Flex>
    );
};

export default AddComic;
