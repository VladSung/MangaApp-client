'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Grid, Text } from '@mantine/core';

import { ComicListItem } from '@/app/entities/comic';
import { graphql } from '@/app/shared/api/graphql';

const userComicsQuery = graphql(`
    query getUserComics {
        me {
            id
            member {
                id
                team {
                    id
                    name
                    comics {
                        id
                        cover
                        title
                        alternativeTitles
                        updatedAt
                    }
                }
            }
        }
    }
`);

export const Comics = () => {
    const { data, loading } = useQuery(userComicsQuery);

    const comics = [];

    if (loading) {
        return <></>;
    }

    if (!data?.me?.member) {
        return <Text>Здесь пусто</Text>;
    }

    for (let i = 0; i < data?.me?.member.length; ++i) {
        const member = data?.me?.member[i];

        if (member?.team?.comics) {
            comics.push(...member.team.comics);
        }
    }

    if (comics.length === 0) {
        return <Text>Здесь пусто</Text>;
    }

    return (
        <Grid p={24}>
            {comics.map((comic) => (
                <Grid key={comic.id}>
                    <ComicListItem
                        key={comic.id}
                        href={`/dashboard/comic/${comic.id}`}
                        data={{
                            title: comic.title as string,
                            subtitle: (comic.alternativeTitles as string) || undefined,
                            lastChange: (comic.updatedAt as Date).toLocaleString(),
                            cover: comic.cover!,
                        }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
