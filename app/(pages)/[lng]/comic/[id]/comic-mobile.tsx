import { AppShellMain, Box, Button, Card, Container, Flex, Stack, Text, Title } from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { ComicContent } from './comic-content';
import { ComicPageProps } from './types';


const Statistics = () => {
    return (
        <Stack>
            <Flex direction={'column'}>
                <Text span size='sm'>Просмотров</Text>
                <Text fw={700} span size='xl' tt='uppercase'>18к</Text>
            </Flex>
            <Flex direction={'column'}>
                <Text span size='sm'>В закладках</Text>
                <Text fw={700} span size='xl' tt='uppercase'>18к</Text>
            </Flex>
            <Flex direction={'column'}>
                <Text span size='sm'>Понравилось</Text>
                <Text fw={700} span size='xl' tt='uppercase'>18к</Text>
            </Flex>
        </Stack>
    );
};

export default function ComicPage({ t, comic: { comic }, params }: ComicPageProps) {
    if (!comic) {
        return <p>dd</p>;
    }

    return (
        <AppShellMain>
            <Box style={{ padding: `${8 * 3}px ${8 * 4}px`, position: 'relative', marginBottom: 16 }}>

                <Image
                    fill
                    style={{ filter: 'blur(8px) brightness(.7)', objectFit: 'cover', objectPosition: '  center' }}
                    src={comic?.cover}
                    sizes='100px'
                    alt=""
                />
                <Box style={{ display: 'flex', width: '100%', position: 'relative', zIndex: 1, justifyContent: 'space-around' }}>
                    <Card style={{ width: 128, height: 128 * 1.5 }}>
                        <Image
                            placeholder="blur"
                            blurDataURL={comic?.cover}
                            priority
                            style={{ margin: -16 }}
                            src={comic?.cover}
                            width={128}
                            height={128 * 1.5}
                            alt=""
                        />
                    </Card>
                    <Statistics />
                </Box>
            </Box>
            <Container style={{ width: '100%', maxWidth: 600 }}>
                <Title order={1} size='h3' style={{ marginBottom: 8 * 3 }}>
                    {comic.title}
                </Title>
                <Title order={6}>{comic.alternativeTitles}</Title>
                <Button
                    component={Link}
                    href={`/comic/${params.id}/ch/1/1`}
                    fullWidth
                    style={{ marginBottom: 8 * 2 }}
                >
                    {t('start-reading')}
                </Button>
                <Button
                    variant='default'
                    size='xs'
                    leftSection={<IconBookmark size={18} />}
                    fullWidth
                    style={{ marginBottom: 8 }}
                >
                    {t('add-bookmark')}
                </Button>
                <Button
                    variant='default'
                    size='xs'
                    fullWidth
                    style={{ marginBottom: 4 * 8 }}
                    component={Link}
                    href={`/comic/${params.id}/ch/1/1`}
                >{t('edit')}</Button>
                <ComicContent lng={params.lng} comic={comic} />
            </Container>
            <Box style={{ width: '100%', maxWidth: 256 }}>
                <Title order={5} style={{ marginBottom: 2 * 8 }}>
                    Creators
                </Title>
            </Box>
        </AppShellMain>
    );

}
