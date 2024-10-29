'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, Box, Button, ButtonGroup, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { comicMetaQuery } from '@src/entities/comic/api';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { ChaptersList } from '@src/widgets/chapter';
import { IconChevronLeft, IconChevronRight, IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import classes from './header.module.css';
import { SearchComicByName } from './search-comic-by-name';

const parseComic: (path: string) => {
    id: string | undefined;
    volume: string | undefined;
    chapter: string | undefined;
} = (path: string) => {
    const comic = path.split('comic/')?.[1]?.split('/ch/');
    const chapter = comic?.[1]?.split('/');

    return {
        id: comic?.[0],
        volume: chapter?.[0],
        chapter: chapter?.[1],
    };
};

export const Navigation = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'header');

    const pathname = usePathname();
    const [opened, { close, open }] = useDisclosure(false);

    useEffect(() => {}, [typeof window !== 'undefined' && window?.location, pathname]);

    const comic = parseComic(pathname);
    const { data } = useQuery(comicMetaQuery, { variables: { id: comic.id || '' } });

    if (!comic.id || !comic.chapter) {
        return (
            <>
                <Box p={4}>
                    <ActionIcon size="lg" radius="xl" variant="subtle" href="/" component={Link}>
                        <Image width={28} height={28} src="/assets/logo.svg" alt="logo" />
                    </ActionIcon>
                </Box>
                <Group h="100%" gap={0}>
                    <Button
                        c="initial"
                        visibleFrom="md"
                        variant="subtle"
                        component={Link}
                        href="/popular"
                    >
                        {t('popular')}
                    </Button>
                    <Button
                        c="initial"
                        visibleFrom="md"
                        variant="subtle"
                        component={Link}
                        href="/comic"
                    >
                        {t('catalog')}
                    </Button>
                    <Button
                        onClick={open}
                        c="initial"
                        leftSection={<IconSearch stroke={3} size={13} />}
                        variant="subtle"
                        component={Link}
                        href="#"
                    >
                        {t('search')}
                    </Button>
                    <SearchComicByName opened={opened} onClose={close} />
                </Group>
            </>
        );
    }

    return (
        <>
            <div className={classes.logoBox}>
                <Box p={4}>
                    <ActionIcon size="lg" radius="xl" variant="subtle" href="/" component={Link}>
                        <Image width={28} height={28} src="/assets/logo.svg" alt="logo" />
                    </ActionIcon>
                </Box>
                <Button
                    visibleFrom="xs"
                    variant="subtle"
                    c="initial"
                    style={{ alignSelf: 'center' }}
                    component={Link}
                    href={`/comic/${comic.id}`}
                >
                    {data?.comic.one?.title}
                </Button>
            </div>
            <ButtonGroup>
                <Button
                    disabled={Number(comic.chapter || 0) - 1 < 1}
                    component={Number(comic.chapter || 0) - 1 >= 1 ? Link : undefined}
                    variant="default"
                    href={`/comic/${comic.id}/ch/${comic.volume}/${Number(comic.chapter) - 1}`}
                >
                    <IconChevronLeft size={16} />
                </Button>
                <Button variant="default" onClick={open}>
                    {`Vol. ${comic.volume} Ch. ${comic.chapter}`}
                </Button>
                <Button
                    variant="default"
                    href={`/comic/${comic.id}/ch/${comic.volume}/${Number(comic.chapter) + 1}`}
                    component={Link}
                >
                    <IconChevronRight size={16} />
                </Button>
            </ButtonGroup>
            <Modal
                opened={opened}
                onClose={close}
                title={
                    <Button
                        leftSection={<IconChevronLeft size={16} />}
                        onClick={close}
                        visibleFrom="xs"
                        variant="subtle"
                        c="initial"
                        component={Link}
                        href={`/comic/${comic.id}`}
                    >
                        {data?.comic.one?.title}
                    </Button>
                }
                size="lg"
            >
                <ChaptersList
                    activeChapter={comic.chapter ? Number(comic.chapter) : undefined}
                    lng={lng}
                    comic={{ id: comic.id }}
                />
            </Modal>
        </>
    );
};
