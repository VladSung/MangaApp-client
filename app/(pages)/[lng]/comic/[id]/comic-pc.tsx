import { AppShellMain, Box, Button, Card, CardSection, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconBookmark, IconBookmarksFilled, IconEyeFilled, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { ListItemWithAvatar } from '@/app/shared/ui/ListItemWithAvatar';
import { NotFoundError } from '@/app/widgets/not-found';

import { ComicContent } from './comic-content';
import { ComicPageProps } from './types';
import classes from './styles.module.css'

const Statistics = () => {
    return (
        <Group align='center' mb='md'>
            <Group gap={4} c='yellow'>
                <IconStarFilled color='inherit' size={14} />
                <Text c='yellow' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group gap={4}>
                <IconEyeFilled size={14} />
                <Text c='gray' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group gap={4}>
                <IconBookmarksFilled size={14} />
                <Text c='gray' inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group align='center' gap={4}>
                <Text component='span'>Year:</Text>
                <Text component='span' fw={700}>2022</Text>
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
                className={classes.container}
                size='xl'
                style={{
                    display: 'flex',
                    gap: 4 * 8,
                    padding: '40px 32px'
                }}
            >
                <Box className={classes.posterWrapper}>
                    <Box className={classes.posterBackground}>
                        <div className={classes.overlay}></div>
                        <Image

                            src={comic?.cover}
                            width={40}
                            height={40 * 1.5}
                            alt=""
                        />
                    </Box>
                    <Card className={classes.poster}>
                        <CardSection>
                            <Image
                                className={classes.posterImage}
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
                        mb={16}
                    >
                        {(comic.lastReadedChapter?.number || 1) > 1
                            ? <>
                                {t('continue')} Vol. {comic.lastReadedChapter?.volume} Ch. {comic.lastReadedChapter?.number}
                            </>
                            : t('start-reading')}
                    </Button>
                    <Button mb={16} size="xs" leftSection={<IconBookmark size={20} />} variant="default" fullWidth>
                        {t('add-bookmark')}
                    </Button>
                    <Button
                        mb={16}
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
                <Box className={classes.content}>
                    <Text size='xs'>{comic.alternativeTitles}</Text>
                    <Title order={1} size='h2' style={{ marginBottom: 16, fontWeight: 700 }}>
                        {comic.title} <Text component='span' size='sm'>[{comic.status}]</Text>
                    </Title>
                    <Statistics />
                    <ComicContent lng={params.lng} comic={comic} />

                </Box>
                <Box className={classes.creators}>
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
