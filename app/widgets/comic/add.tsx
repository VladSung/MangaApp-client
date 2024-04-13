'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Center, Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useSearchParams } from 'next/navigation';

import { AddComicForm, AddComicFormInput } from '@/app/entities/comic';
import { Team } from '@/app/entities/comic/add-form/types';
import { uploadImages } from '@/app/features/upload-image';
import { ComicStatuses, graphql, MaturityRatings } from '@/app/shared/api/graphql';

import { getComicSelectionsQuery } from './queries';
import { useEffect } from 'react';


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
    const [addComic, { data: comicData, error, reset }] = useMutation(addComicMutation);


    const teamId = useSearchParams().get('teamId');

    const { data, loading } = useQuery(getComicSelectionsQuery, {
        context: {
            headers: ''
        }
    });

    const [image, setImage] = useLocalStorage<string>({
        key: 'add-comic-image-id',
        defaultValue: JSON.stringify({ 'imageId': '', 'name': '' })
    })

    const onSubmit = async (data: AddComicFormInput) => {

        const storedImage = (JSON.parse(image) as { 'imageId': string, 'name': string })

        if (storedImage?.name !== data?.cover?.name && data?.cover) {
            const imageData = await uploadImages([data.cover], data.title)
            storedImage.imageId = imageData.data[0].path;
            setImage(JSON.stringify({ imageId: storedImage.imageId, name: data.cover.name }));
        }

        const newComic = await addComic({
            variables: {
                input: {
                    title: data.title,
                    alternativeTitles: data.alternativeTitles,
                    cover: storedImage.imageId,
                    description: data.description,
                    language: 'ru',
                    status: ComicStatuses.Continues,
                    teamId: data.teams,
                    maturityRating: data.maturityRating as MaturityRatings,
                    genres: data?.genres,
                    tags: data?.tags
                },
            },
        });

        setImage('{}');
    };

    if (loading) {
        return <Center>
            <Loader />
        </Center>;
    }

    useEffect(() => {
        if (error?.graphQLErrors) {
            error.graphQLErrors.map(e => {
                notifications.show({
                    title: `[Error]: ${e.extensions.code as string}`,
                    message: e.message,
                    color: 'red',
                    withBorder: true
                })
            });

            reset()
        }

        notifications.show({
            color: 'green',
            title: `${comicData?.addComic?.title}`,
            message: `Comic saved`
        })

    }, [error, reset])

    if (!data?.me?.member || !data?.tags || !data?.genres) {
        return <div>err...</div>;
    }

    return (
        <>
            <AddComicForm
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
