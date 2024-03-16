'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { AddComicForm, AddComicFormInput } from '@/app/entities/comic';
import { Teams } from '@/app/entities/comic/add-form/types';
import { uploadImage } from '@/app/features/upload-image';
import { ComicStatuses, graphql, MaturityRatings } from '@/app/shared/api/graphql';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';
import { Center, Loader } from '@mantine/core';


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
`);

const getComicSelectionsQuery = graphql(`
    query ComicSelections {
        genres {
            id
            title
        }
        tags {
            id
            title
        }
        teams {
            id
            avatar
            name
        }
    }
`);


const maturityRatings = [{ title: 'Everyone' }, { title: 'Teen' }, { title: 'Mature' }];

export const AddComic = () => {
    const [addComic, { error }] = useMutation(addComicMutation);
    error?.graphQLErrors.map(e => {
        notifications.show({
            title: `[Error]: ${e.extensions.code}`,
            message: e.message as string,
            color: 'red',
            withBorder: true
        })
    })

    const teamId = useSearchParams().get('teamId');

    const { data, loading } = useQuery(getComicSelectionsQuery);
    const [image, setImage] = useLocalStorage({
        key: 'add-comic-image-id',
        defaultValue: JSON.stringify({ 'imageId': '', 'name': '' })
    })

    const onSubmit = async (data: AddComicFormInput) => {

        let imageId = JSON.parse(image).imageId || ''
        let storedImage = JSON.parse(image)
        if (storedImage?.name !== data.cover.name) {
            const imageData = await uploadImage(data.cover, data.title)
            imageId = imageData.data.path;
            setImage(JSON.stringify({ imageId, name: data.cover.name }));
        }

        const newComic = await addComic({
            variables: {
                input: {
                    title: data.title,
                    alternativeTitles: [data.alternativeTitles],
                    cover: imageId,
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
        notifications.show({
            color: 'green',
            title: `${newComic.data?.addComic?.title}`,
            message: `Comic saved`
        })

        setImage('{}');
    };

    if (loading) {
        return <Center>
            <Loader />
        </Center>;
    }

    if (!data?.teams || !data?.tags || !data?.genres) {
        return <div>err...</div>;
    }

    return (
        <>
            <AddComicForm
                selectionValues={{
                    loading: false,
                    maturityRatings,
                    teams: data?.teams as Teams,
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
