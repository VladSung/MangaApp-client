'use client'
import { useQuery } from '@apollo/client';
import { ActionIcon, Box, Button, Center, Group, Loader, Text } from '@mantine/core';
import { IconEye, IconEyeClosed, IconReload, IconSortAscendingNumbers, IconSortDescendingNumbers } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { dayjsRelativeTime } from '@src/shared/api/dayjs';
import { OrderBy } from '@src/shared/api/graphql';
import { getComicChapters } from '@src/shared/api/queries';
import { useTranslation } from '@src/shared/lib/i18n/client';

const ChaptersList = ({ comic, activeChapter, lng }: { lng: string, activeChapter?: number, comic: { id: string } }) => {
    const { t } = useTranslation(lng, 'comic/id')
    const [sortOrder, setSortOrder] = useState<"Asc" | "Desc">('Desc')

    const { data: chaptersData, loading, refetch } = useQuery(getComicChapters, {
        variables: {
            comicId: comic.id, order: OrderBy[sortOrder], paginate: {
                take: 10,
            }
        },
        nextFetchPolicy: 'cache-and-network'
    })

    return (
        <>
            {(!!chaptersData?.chapters?.chapters?.length || loading) && <Group mb={16} align='center' justify='space-between'>
                <Button variant='transparent' onClick={() => setSortOrder((prev) => prev === 'Asc' ? 'Desc' : 'Asc')} rightSection={sortOrder === 'Asc' ? <IconSortAscendingNumbers size={18} /> : <IconSortDescendingNumbers size={18} />} size='sm' radius='sm'>
                    {sortOrder === "Asc" ? t('chapter-sort.ascending') : t('chapter-sort.descending')}
                </Button>
                <ActionIcon aria-label='refetch chapters' title='refetch chapters' onClick={() => refetch()} variant='subtle'>
                    <IconReload size={18} />
                </ActionIcon>
            </Group>}
            {loading && <Center><Loader variant='bars' /></Center>}
            {(!loading) && chaptersData?.chapters?.chapters?.map((ch) => (
                <Box mb={8} key={ch.id}>
                    <Button
                        size='sm'
                        variant={activeChapter === ch.number ? 'filled' : 'default'}
                        radius='sm'
                        styles={
                            {

                                label: {
                                    flexGrow: 1
                                }
                            }
                        }
                        justify='space-between'
                        component={Link}
                        fullWidth
                        href={`/comic/${comic.id}/ch/${ch.volume}/${ch.number}`}
                        leftSection={ch?.usersReadHistory?.id ? <IconEye size={18} /> : <IconEyeClosed size={18} />}
                        rightSection={<span>{ch.createdAt && dayjsRelativeTime().to(ch.createdAt as string)}</span>}
                    >
                        <Text>
                            <span style={{ marginRight: '8px' }}>
                                {ch.volume} - {ch.number}
                            </span>
                            <span>{ch.title}</span>

                        </Text>
                    </Button>
                </Box>
            ))}
            {!loading && !chaptersData?.chapters?.count && <Text>{t('publish-not-started')}</Text>}
        </>
    )
}

export default ChaptersList
