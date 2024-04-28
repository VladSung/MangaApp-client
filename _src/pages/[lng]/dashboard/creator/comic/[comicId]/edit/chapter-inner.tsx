'use client';
import { AppShellAside, AppShellSection, Button, Flex, Group, Paper, rem, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { ChapterListItem } from '@src/entities/chapter';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './styles.module.css';
import { Chapter } from '@src/shared/api/graphql';

export const ChaptersInner = ({ comicId, chapters }: {
    comicId: string, chapters?: Pick<Chapter, 'title'
        | 'volume'
        | 'number'
        | 'id'
        | 'publishDate'
        | 'price'>[] | null
}) => {
    const [opened, { toggle }] = useDisclosure()
    const smallerViewport = useMediaQuery('(max-width: 1200px)', true);

    const children = (<AppShellSection miw={smallerViewport ? 'auto' : 480} py={32} pr={24}>
        {smallerViewport && <Button onClick={toggle} hiddenFrom='lg' className={classes.button}>Open chapters list</Button>}
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
            <Stack gap='sm' w={'100%'}>
                {chapters?.length
                    ? chapters?.map(
                        ch => (<ChapterListItem key={ch.id} comicId={comicId} chapter={{ title: ch.title, createdAt: ch.publishDate as string, volume: ch.volume, number: ch.number, id: ch.id, price: ch.price }} />)
                    )
                    : <Text>Chapters not found</Text>
                }
            </Stack>
        </Paper>
    </AppShellSection>)

    if (smallerViewport) return (<AppShellAside style={{ transition: '280ms' }} className={`${classes.chapters} ${opened && classes.open}`}>{children}</AppShellAside>)

    return children
}