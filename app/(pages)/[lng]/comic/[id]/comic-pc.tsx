import Image from 'next/image';
import { ListItemWithAvatar } from '@/app/shared/ui/ListItemWithAvatar';

import { ComicContent } from './comic-content';
import Link from 'next/link';
import { Box, Button, Card, Title, Text, CardSection, AppShellMain, Group, Container } from '@mantine/core';
import { IconBookmark, IconBookmarksFilled, IconEyeFilled, IconStarFilled } from '@tabler/icons-react';
import { ComicPageProps } from './types';

const Statistics = () => {
    return (
        <Group mb='md'>
            <Group gap={4}>
                <IconStarFilled color='yellow' size={16} />
                <Text fw={700} span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group gap={4}>
                <IconEyeFilled size={16} />
                <Text fw={700} span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group gap={4}>
                <IconBookmarksFilled size={16} />
                <Text fw={700} span size='md' tt='uppercase'>18к</Text>
            </Group>
        </Group>
    );
};



export default function ComicDesktopPage({ t, comic: { comic }, params }: ComicPageProps) {
    if (!comic) {
        return <p>dd</p>;
    }

    return (
        <AppShellMain>
            <Container
                size='xl'
                style={{
                    display: 'flex',
                    gap: 4 * 8,
                    padding: '40px 32px',
                }}
            >
                <Box id="poster" style={{ width: 230 }}>
                    <Card id="poster" style={{ marginBottom: 3 * 8 }}>
                        <CardSection>
                            <Image
                                priority
                                style={{ borderRadius: '8px' }}
                                src={comic?.cover}
                                width={230}
                                height={230 * 1.5}
                                alt=""
                            />
                        </CardSection>
                    </Card>
                    <Button
                        component={Link}
                        href={`/comic/${params.id}/ch/1/1`}
                        size="sm"
                        disabled={!comic.chapters?.length}
                        variant="contained"
                        fullWidth
                        style={{ marginBottom: 2 * 8 }}
                    >
                        {t('start-reading')}
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
                            <Title order={1} size='h2' style={{ marginBottom: 2 * 8, fontWeight: 700 }}>
                                {comic.title} <Text component='span' size='sm'>[{comic.status}]</Text>
                            </Title>
                        </div>
                        <Group ml='auto' c='yellow' gap='xs' justify='flex-end'>
                            <IconStarFilled size={20} />
                            <Text fw={700} size='h4' component={'span'}>9.2</Text>
                        </Group>
                    </Group>
                    <ComicContent t={t} comic={comic} />

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
