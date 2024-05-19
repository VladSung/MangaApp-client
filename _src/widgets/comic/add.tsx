'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Center, Loader } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';

import { AddComicForm, AddComicFormInput } from '@src/entities/comic';
import { Team } from '@src/entities/comic/add-form/types';
import { mutationWithUploadImages } from '@src/features/upload-image';
import { ComicStatuses, graphql, MaturityRatings } from '@src/shared/api/graphql';

import { getComicSelectionsQuery } from './queries';
import { useState } from 'react';


const addComicMutation = graphql(`
    mutation AddComic($input: AddComicInput!) {
        addComic(input: $input) {
            __typename
            ... on Comic {
                id
                title
            }
        }
    }
`)

const maturityRatings = [{ title: 'Everyone' }, { title: 'Teen' }, { title: 'Mature' }];

export const AddComic = () => {
    const [addComic, { loading: MutateLoading }] = useMutation(addComicMutation);
    const [imageLoading, setImageLoading] = useState(false);
    const router = useRouter();

    const teamId = useSearchParams().get('teamId');

    const { data, loading } = useQuery(getComicSelectionsQuery, {
        context: {
            headers: ''
        }
    });


    const onSubmit = (data: AddComicFormInput) => {
        if (data.cover) {

            mutationWithUploadImages((images) => {
                if (images) {
                    addComic({
                        variables: {
                            input: {
                                title: data.title,
                                alternativeTitles: data.alternativeTitles,
                                cover: images.data[0].path,
                                description: data.description,
                                language: 'ru',
                                status: ComicStatuses.Continues,
                                teamId: data.teams,
                                maturityRating: data.maturityRating as MaturityRatings,
                                genres: data?.genres,
                                tags: data?.tags
                            },
                        },
                    }).then((newComic => {
                        router.push(`/comic/${newComic.data?.addComic?.id}`)
                    }))

                }
            }, { type: 'cover', files: [data.cover], fileFolder: `/teams/${data.teams}/comics/${data.title}` }, setImageLoading)
        }
    };

    if (loading) {
        return <Center>
            <Loader />
        </Center>;
    }


    if (!data?.me?.member || !data?.tags || !data?.genres) {
        return <div>err...</div>;
    }

    return (
        <>
            <AddComicForm
                loading={MutateLoading || imageLoading}
                selectionValues={{
                    loading: false,
                    maturityRatings,
                    teams: data.me.member.map(m => (m.team as Team)),
                    tags: data?.tags,
                    genres: data?.genres,
                }}
                selectedValues={{
                    teams: teamId || undefined
                }}
                onSubmit={onSubmit}
            />
        </>
    );
};
