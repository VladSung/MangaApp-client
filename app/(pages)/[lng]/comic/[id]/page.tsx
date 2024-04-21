'use server'
import { AppShellMain, Box, Button, Card, CardSection, Container, Flex, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { IconBookmarksFilled, IconEyeFilled, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { getComic, getComicMeta } from "@/app/entities/comic/queries";
import { useTranslation } from "@/app/shared/lib/i18n";
import { NotFoundError } from '@/app/widgets/not-found';

import { ComicContent } from './comic-content';
import classes from './styles.module.css'
import { GetComicPageQuery } from '@/app/shared/api/graphql';
import { AddBookmark } from '@/app/features/bookmark';
import { Avatar } from '@/app/shared/ui/Avatar';

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

export async function generateMetadata({ params: { id } }: Props) {
    const c = await getComicMeta(id)

    return {
        title: c?.data?.comic?.title,
    };
}



const Statistics = ({ data }: { data: GetComicPageQuery }) => {
    return (
        <Group align='center' mb='md'>
            <Group gap={4}>
                <IconStarFilled color='inherit' size={14} />
                <Text inline span size='md' tt='uppercase'>
                    7/
                    <Text inline span size='xs'>10</Text>
                </Text>
            </Group>
            <Group gap={4}>
                <IconEyeFilled size={14} />
                <Text inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group gap={4}>
                <IconBookmarksFilled size={14} />
                <Text inline span size='md' tt='uppercase'>18к</Text>
            </Group>
            <Group align='center' gap={4}>
                <Text component='span' fw={700}>2022</Text>
                <Text component='span' size='sm'>[{data?.comic?.status}]</Text>
            </Group>
        </Group>
    );
};



export default async function ComicDesktopPage({ params }: Props) {

    const { data } = await getComic(params.id);
    const { t } = await useTranslation(params.lng, 'comic/id')

    if (!data.comic) {
        return <AppShellMain>
            <NotFoundError params={params} />
        </AppShellMain>
    }

    return (
        <AppShellMain>
            <Container
                className={classes.container}
                size='xl'
            >
                <Box className={classes.posterWrapper}>
                    <Box className={classes.posterBackground}>
                        <div className={classes.overlay}></div>
                        <Image

                            src={data.comic?.cover}
                            width={40}
                            height={40 * 1.5}
                            alt=""
                        />
                    </Box>
                    <Card className={classes.poster}>
                        <CardSection>
                            <Image
                                className={classes.posterImage}
                                src={data.comic?.cover}
                                width={270}
                                height={270 * 1.5}
                                alt=""
                            />
                        </CardSection>
                    </Card>
                    <Flex gap='sm' direction='column' className={classes.comicActions}>
                        <Button
                            component={data.comic.lastReadedChapter?.id ? Link : undefined}
                            href={`/comic/${data.comic.id}/ch/${data.comic.lastReadedChapter?.volume}/${data.comic.lastReadedChapter?.number}`}
                            size="sm"
                            disabled={!data.comic.lastReadedChapter?.id}
                            variant="contained"
                            fullWidth
                        >
                            {(data.comic.lastReadedChapter?.number || 1) > 1
                                ? <>
                                    {t('continue')} Vol. {data.comic.lastReadedChapter?.volume} Ch. {data.comic.lastReadedChapter?.number}
                                </>
                                : t('start-reading')}
                        </Button>
                        <AddBookmark lng={params.lng} />
                    </Flex>
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
                    <Text size='xs'>{data.comic.alternativeTitles}</Text>
                    <Title order={1} size='h2' style={{ marginBottom: 16, fontWeight: 700 }}>
                        {data.comic.title}
                    </Title>
                    <Statistics data={data} />
                    <ComicContent lng={params.lng} comic={data.comic} />

                </Box>
                <Box className={classes.creators} ml='lg'>
                    <Title order={2} size="h5" mb='md'>
                        {t('creators')}
                    </Title>
                    <Stack>
                        {data.comic.team?.members?.map((member) => (
                            <UnstyledButton
                                className='mantine-active'
                                key={member.id}
                                component={Link}
                                href={`/team/${data.comic?.team?.id}`}
                            >
                                <Group align="center" gap='xs'>
                                    <Avatar src={member?.user?.avatar} size='md' />
                                    <div>
                                        <Text size='md'>{member?.user?.username}</Text>
                                        <Text c="dimmed" size="xs">
                                            {member.role}
                                        </Text>
                                    </div>
                                </Group>
                            </UnstyledButton>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </AppShellMain>
    );
}

