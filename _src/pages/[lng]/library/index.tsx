'use client'
import { Group, Text, Paper, RingProgress, AppShellMain, Container, Tabs, TabsPanel, TabsList, TabsTab, Button, ActionIcon, SimpleGrid } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Image from 'next/image'
type ReadingProgressProps = {
    title: string;
    volume: number;
    chapter: number;
    progress: number;
}
const ReadingProgress = ({ title, volume, chapter, progress }: ReadingProgressProps) => {
    return (
        <Paper withBorder p="md">
            <Group wrap='nowrap' gap="xs">
                <Image
                    style={{ objectFit: 'cover' }}
                    src="https://rjqfpsoszpkdygjeykxf.supabase.co/storage/v1/object/public/s3/2sg_0/Omniscient%20Reader/0.png" // Замените на реальный путь к обложке комикса
                    alt={title}
                    width={64}
                    height={90}
                />
                <div>
                    <Text size="sm" fw={500}>
                        {title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        Том {volume} - Глава {chapter}
                    </Text>
                    <Group wrap='nowrap' gap='xs'>
                        <RingProgress
                            size={24}
                            sections={[{ value: progress, color: 'blue' }]}
                        />
                        <Text size="xs" color="dimmed">
                            Глава: {progress}%
                        </Text>
                    </Group>
                </div>
            </Group>
        </Paper>
    );
};

type LibraryProps = {
    id: string;
    title: string;
    volume: number;
    chapter: number;
    progress: number;
}

type libraryList = Object & {
    [key: string]: LibraryProps[]
}
const library: libraryList = {
    'planned': [
        { id: '0', title: 'Межгалактическая война', volume: 1, chapter: 4, progress: 0 },
        { id: '0', title: 'Тайны подземного мира', volume: 3, chapter: 2, progress: 0 },
        { id: '0', title: 'Хроники темного рыцаря', volume: 2, chapter: 6, progress: 0 },
        { id: '0', title: 'Легенда о потерянном артефакте', volume: 4, chapter: 1, progress: 0 },
        { id: '0', title: 'Приключения на краю галактики', volume: 1, chapter: 7, progress: 0 },
        { id: '0', title: 'Тайны забытых богов', volume: 2, chapter: 5, progress: 0 },
        { id: '0', title: 'Хроники магического ордена', volume: 3, chapter: 8, progress: 0 },
        { id: '0', title: 'Битва за кибермир', volume: 2, chapter: 3, progress: 0 }
    ],
    'favorites': [
        { id: '0', title: 'Возвращение героя', volume: 3, chapter: 7, progress: 21 },
        { id: '0', title: 'Легенда о небесном воине', volume: 1, chapter: 5, progress: 48 },
        { id: '0', title: 'Путь самурая', volume: 2, chapter: 11, progress: 73 },
        { id: '0', title: 'Таинственный мир духов', volume: 4, chapter: 3, progress: 15 },
        { id: '0', title: 'Хроники магической академии', volume: 1, chapter: 9, progress: 62 },
        { id: '0', title: 'Эпическая сага о боге войны', volume: 5, chapter: 4, progress: 100 }
    ],
    'reading': [
        { id: '0', title: 'Межгалактические приключения', volume: 5, chapter: 2, progress: 37 },
        { id: '0', title: 'Тайны древнего храма', volume: 3, chapter: 6, progress: 28 },
        { id: '0', title: 'Воины киберпространства', volume: 2, chapter: 4, progress: 51 }
    ],
    'dropped': [
        { id: '0', title: 'Легенда о потерянном королевстве', volume: 1, chapter: 3, progress: 44 },
        { id: '0', title: 'Хроники темного лорда', volume: 4, chapter: 8, progress: 67 }
    ],
    'completed': [
        { id: '0', title: 'Меч и магия', volume: 1, chapter: 12, progress: 100 },
        { id: '0', title: 'Космическая одиссея', volume: 3, chapter: 9, progress: 100 },
        { id: '0', title: 'Тайны древних цивилизаций', volume: 2, chapter: 6, progress: 100 },
        { id: '0', title: 'Путешествие в параллельный мир', volume: 4, chapter: 5, progress: 100 },
        { id: '0', title: 'Хроники бессмертного воина', volume: 1, chapter: 8, progress: 100 },
        { id: '0', title: 'Легенда о драконьем всаднике', volume: 3, chapter: 11, progress: 100 },
        { id: '0', title: 'Приключения в подземелье', volume: 2, chapter: 7, progress: 100 }
    ]
}

const LibraryPage = () => {
    const libraryKeys = Object.keys(library);

    return (
        <AppShellMain>
            <Container pt='lg'>
                <Tabs defaultValue={'reading'} variant='pills'>
                    <Group wrap='nowrap' align='flex-start'>
                        <TabsList mb='md'>
                            {libraryKeys.map((key) => (
                                <TabsTab size='sm' style={{ textTransform: 'capitalize' }} key={key} value={key}>{key}</TabsTab>
                            ))}
                        </TabsList>
                        <ActionIcon
                            variant='light'
                            ml='auto'
                            aria-label='Tabs settings'
                            size='md'
                            mb='sm'
                        >
                            <IconSettings />
                        </ActionIcon>
                    </Group>
                    {libraryKeys.map((key) => {
                        const libraryItem = library[key];
                        return (
                            <TabsPanel key={key} value={key}>
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='sm' verticalSpacing='sm'>
                                    {libraryItem.map((item) => (
                                        <ReadingProgress
                                            key={key + item.title}
                                            title={item.title}
                                            volume={item.volume}
                                            chapter={item.chapter}
                                            progress={item.progress}
                                        />
                                    ))}
                                </SimpleGrid>
                            </TabsPanel>
                        )
                    })}

                </Tabs>
            </Container>
        </AppShellMain>
    );
}
export default LibraryPage