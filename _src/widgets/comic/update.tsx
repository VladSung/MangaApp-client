'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { AddComicFormInput, UpdateComicForm } from '@src/entities/comic';
import { Team } from '@src/entities/comic/update-form/types';
import { mutationWithUploadImages } from '@src/features/upload-image';
import { ComicStatuses, graphql, MaturityRatings } from '@src/shared/api/graphql';

import { getComicSelectionsQuery } from './queries';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';

const updateComicMutation = graphql(`
    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {
        updateComic(id: $id, input: $input) {
            __typename
        }
    }
`);

const getUserComicQuery = graphql(`
    query getUserComic($id: ID!) {
        comic(id: $id) {
            genres {
                id
                title
            }
            tags {
                id
                title
            }
            team {
                id
                avatar
                name
            }
            title
            alternativeTitles
            cover
            description
            language
            status
            maturityRating
        }
    }
`);

const maturityRatings = [{ title: 'Everyone' }, { title: 'Teen' }, { title: 'Mature' }];

export const UpdateComic = ({ comicId }: { comicId: string }) => {
    const [updateComic, { data: updatedComicData, error: updatedComicError }] = useMutation(updateComicMutation, {
        errorPolicy: 'all',
    });

    const { data, error, loading } = useQuery(getComicSelectionsQuery);
    const { data: comicData, error: comicError, loading: comicLoading } = useQuery(getUserComicQuery, {
        variables: { id: comicId },
    });

    const onSubmit = (data: AddComicFormInput) => {
        if ((data.cover)) {
            mutationWithUploadImages((images) => {
                updateComic({
                    variables: {
                        id: comicId,
                        input: {
                            title: data.title,
                            alternativeTitles: data.alternativeTitles,
                            cover: images ? images.data[0].path : undefined,
                            genres: data.genres,
                            description: data.description,
                            language: 'ru',
                            status: ComicStatuses.Continues,
                            teamId: data.teams,
                            tags: data.tags,
                            maturityRating: MaturityRatings[data.maturityRating],
                        },
                    },
                }).catch((error) => {

                })
            }, { fileFolder: `comics/${data.title}`, files: [data.cover] })
        }
    };

    useEffect(() => {
        if (updatedComicData?.updateComic) {
            notifications.show({
                title: 'Success',
                message: 'Comic updated successfully',
                color: 'green',
            });
        }
    }, [updatedComicData?.updateComic]);

    if (loading || comicLoading) {
        return <div>Loading...</div>;
    }

    if (!data?.me?.member || !data?.tags || !data?.genres) {
        return <div>{JSON.stringify(error)} {JSON.stringify(comicError)}</div>;
    }

    return (
        <>
            <UpdateComicForm
                selectionValues={{
                    loading: false,
                    maturityRatings,
                    teams: data.me.member.map(m => (m.team as Team)),
                    tags: data?.tags,
                    genres: data?.genres,
                }}
                selectedValues={{
                    cover: comicData?.comic?.cover,
                    teams: comicData?.comic?.team?.id || undefined,
                    genres: comicData?.comic?.genres?.map(g => g.title),
                    tags: comicData?.comic?.tags?.map(t => t.title),
                    title: comicData?.comic?.title,
                    description: comicData?.comic?.description || undefined,
                    alternativeTitles: comicData?.comic?.alternativeTitles,
                    maturityRating: comicData?.comic?.maturityRating as unknown as keyof typeof MaturityRatings
                }}
                onSubmit={onSubmit}
            />
        </>
    );
};
