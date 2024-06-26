'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useLocalStorage } from '@mantine/hooks';

import { AddComicFormInput, UpdateComicForm } from '@/app/entities/comic';
import { Team } from '@/app/entities/comic/update-form/types';
import { uploadImages } from '@/app/features/upload-image';
import { ComicStatuses, graphql, MaturityRatings } from '@/app/shared/api/graphql';

import { getComicSelectionsQuery } from './queries';

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
    const [updateComic] = useMutation(updateComicMutation);

    const { data, error, loading } = useQuery(getComicSelectionsQuery);
    const { data: comicData, error: comicError, loading: comicLoading } = useQuery(getUserComicQuery, {
        variables: { id: comicId },
    });

    const [image, setImage] = useLocalStorage({
        key: 'update-comic-image-id',
        defaultValue: ''
    })

    const onSubmit = async (data: AddComicFormInput) => {
        let newImage = image || null

        if ((data.cover)) {
            const imageData = await uploadImages([data.cover], data.title, comicData?.comic?.cover);
            console.log(imageData)
            newImage = imageData?.data?.[0].path;
            setImage(newImage);
        }

        await updateComic({
            variables: {
                id: comicId,
                input: {
                    title: data.title,
                    alternativeTitles: data.alternativeTitles,
                    cover: newImage,
                    genres: data.genres,
                    description: data.description,
                    language: 'ru',
                    status: ComicStatuses.Continues,
                    teamId: data.teams,
                    tags: data.tags,
                    maturityRating: MaturityRatings[data.maturityRating],
                },
            },
        });
    };

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
