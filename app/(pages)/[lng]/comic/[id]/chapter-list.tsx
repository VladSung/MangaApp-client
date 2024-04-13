'use client'
import { useQuery } from '@apollo/client';
import { Box,Button, Center, Group, Loader, Text } from '@mantine/core';
import { IconEye, IconEyeClosed, IconSortAscendingNumbers, IconSortDescendingNumbers } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { dayjsRelativeTime } from '@/app/shared/api/dayjs';
import { OrderBy } from '@/app/shared/api/graphql';
import { getComicChapters } from '@/app/shared/api/queries';
import { useTranslation } from '@/app/shared/lib/i18n/client';

const ChaptersList = ({ comic, lng }: { lng: string, comic: { id: string } }) => {
    const { t } = useTranslation(lng, 'comic/id')
    const [sortOrder, setSortOrder] = useState<"Asc" | "Desc">('Desc')

    const chaptersData = useQuery(getComicChapters, {
        variables: {
            comicId: comic.id, order: OrderBy[sortOrder], paginate: {
                take: 10,
            }
        }
    })

    return (
        <>
            {!!chaptersData.data?.chapters?.length && <Group mb={16} align='center'>
                <Button variant='transparent' onClick={() => setSortOrder((prev) => prev === 'Asc' ? 'Desc' : 'Asc')} rightSection={sortOrder === 'Asc' ? <IconSortAscendingNumbers size={18} /> : <IconSortDescendingNumbers size={18} />} size='sm' radius='sm'>
                    {sortOrder === "Asc" ? t('chapter-sort.ascending') : t('chapter-sort.descending')}
                </Button>
            </Group>}
            {chaptersData.loading && <Center><Loader variant='bars' /></Center>}
            {chaptersData.data?.chapters?.map((ch) => (
                <Box mb={8} key={ch.id}>
                    <Button
                        size='sm'
                        variant='default'
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
                        href={`${comic.id}/ch/${ch.volume}/${ch.number}`}
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
            {!chaptersData.loading && !chaptersData.data?.chapters?.length && <Text>{t('publish-not-started')}</Text>}
        </>
    )
}

export default ChaptersList
