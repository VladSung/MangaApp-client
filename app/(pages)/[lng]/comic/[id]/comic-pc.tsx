import { AppShellMain, Box, Button, Card, CardSection, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconBookmark, IconBookmarksFilled, IconEyeFilled, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { ListItemWithAvatar } from '@/app/shared/ui/ListItemWithAvatar';
import { NotFoundError } from '@/app/widgets/not-found';

import { ComicContent } from './comic-content';
import { ComicPageProps } from './types';

const Statistics = () => {
    return (
        <Group mb='md'>
            <Group align='center' gap={4} c='yellow'>
                <IconStarFilled color='inherit' size={14} />
                <Text c='yellow' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group align='center' gap={4}>
                <IconEyeFilled size={14} />
                <Text c='gray' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group align='center' gap={4}>
                <IconBookmarksFilled size={14} />
                <Text c='gray' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
        </Group>
    );
};



export default function ComicDesktopPage({ t, comic: { comic }, params }: ComicPageProps) {

    if (!comic) {
        return <AppShellMain>
            <NotFoundError params={params} />
        </AppShellMain>
    }

    return (
        <AppShellMain>
            <Container
                size='xl'
                style={{
                    display: 'flex',
                    gap: 4 * 8,
                    padding: '40px 32px',
                    '@media(max-width:600px)':{
                        flexDirection:'column'
                    },
                }}
            >
                <Box id="poster" style={{ width: 230 }}>
                    <Card id="poster" style={{ marginBottom: 3 * 8 }}>
                        <CardSection>
                            <Image
                                style={{ borderRadius: '8px', objectFit: 'cover' }}
                                src={comic?.cover}
                                width={230}
                                height={230 * 1.5}
                                alt=""
                            />
                        </CardSection>
                    </Card>
                    <Button
                        component={comic.lastReadedChapter?.id ? Link : undefined}
                        href={`/comic/${comic.id}/ch/${comic.lastReadedChapter?.volume}/${comic.lastReadedChapter?.number}`}
                        size="sm"
                        disabled={!comic.lastReadedChapter?.id}
                        variant="contained"
                        fullWidth
                        style={{ marginBottom: 2 * 8 }}
                    >
                        {(comic.lastReadedChapter?.number || 1) > 1
                            ? <>
                                {t('continue')} Vol. {comic.lastReadedChapter?.volume} Ch. {comic.lastReadedChapter?.number}
                            </>
                            : t('start-reading')}
                    </Button>
                    <Button style={{ marginBottom: 2 * 8 }} size="xs" leftSection={<IconBookmark size={20} />} variant="default" fullWidth>
                        {t('add-bookmark')}
                    </Button>
                    <Button
                        style={{ marginBottom: 2 * 8 }}
                        component={Link}
                        href={`/dashboard/comic/${params.id}`}
                        size="xs"
                        variant="default"
                        fullWidth
                        color="primary"
                    >
                        {t('edit')}
                    </Button>
                </Box>
                <Box style={{ width: '100%', maxWidth: 600 }}>
                    <Group align='flex-start'>
                        <div>
                            <Text size='xs'>{comic.alternativeTitles}</Text>
                            <Title order={1} size='h2' style={{ marginBottom: 16, fontWeight: 700 }}>
                                {comic.title} <Text component='span' size='sm'>[{comic.status}]</Text>
                            </Title>
                        </div>

                        <Text fw={700} ml='auto'>2022</Text>
                    </Group>
                    <Statistics />
                    <ComicContent lng={params.lng} comic={comic} />

                </Box>
                <Box style={{ width: '100%', maxWidth: 256 }}>
                    <Title order={2} size="h5" style={{ marginBottom: 2 * 8 }}>
                        Creators
                    </Title>
                    {comic.team?.members?.map((m) => (
                        <ListItemWithAvatar
                            key={m?.user?.id}
                            href={`/team/${m?.user?.id}`}
                            avatar={m?.user?.avatar &&
                                <Image
                                    style={{ borderRadius: '4px', verticalAlign: 'top' }}
                                    width={56}
                                    height={56}
                                    alt=""
                                    src={m.user.avatar}
                                />
                            }
                        >
                            <Title order={2} size='h5' style={{ mb: 2 }}>{m?.user?.username}</Title>
                        </ListItemWithAvatar>
                    ))}
                </Box>
            </Container>
        </AppShellMain>
    );
}
