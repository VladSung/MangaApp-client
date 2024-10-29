import { AppShellMain, Box, Container } from '@mantine/core';
import { comicInfoQuery } from '@src/entities/comic';
import { getClient } from '@src/shared/lib/apollo/client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ComicContent } from './comic-content';
import { ComicPosterWithActions } from './comic-poster';
import classes from './styles.module.css';

type Props = {
    params: Promise<{
        id: string;
        lng: string;
    }>;
};

const client = getClient();

export const ComicPage = async ({ params }: Props) => {
    const { id, lng } = await params;
    const {
        data: {
            comic: { one: comic },
        },
    } = await client.query({
        query: comicInfoQuery,
        variables: { id },
        errorPolicy: 'all',
        context: {
            nextRevalidate: 5 * 60,
        },
    });

    if (!comic) {
        return notFound();
    }

    return (
        <AppShellMain>
            <Container className={classes.container} size="xl">
                <Suspense>
                    <ComicPosterWithActions lng={lng} comic={comic} />
                </Suspense>
                <Box className={classes.content}>
                    <ComicContent lng={lng} comic={comic} />
                </Box>
                <Box component="article"></Box>
            </Container>
        </AppShellMain>
    );
};
