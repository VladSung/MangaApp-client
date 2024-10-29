'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { notifications } from '@mantine/notifications';
import { comicFormSelectionsQuery } from '@src/entities/comic';
import { uploadImage } from '@src/features/upload-image';
import { ComicStatuses, MaturityRatings } from '@src/shared/api';

import { comicInfoForUpdate, updateComicMutation } from '../api';
import { ComicUpdateFormInput, UpdateForm } from './update-form';
import { revalidatePath } from 'next/cache';

const maturityRatings = [{ title: 'Everyone' }, { title: 'Teen' }, { title: 'Mature' }];

export const UpdateComic = ({ comicId }: { comicId: string }) => {
    const [updateComic] = useMutation(updateComicMutation, {
        errorPolicy: 'all',
    });

    const {
        data: selectionsData,
        error: selectionsError,
        loading: selectionsLoading,
    } = useQuery(comicFormSelectionsQuery);

    const {
        data: comicData,
        error: comicError,
        loading: comicLoading,
    } = useQuery(comicInfoForUpdate, {
        variables: { id: comicId },
    });

    const onSubmit = async (data: ComicUpdateFormInput) => {
        if (data.cover) {
            const image = await uploadImage(data.cover, false);
            updateComic({
                variables: {
                    id: comicId,
                    input: {
                        title: data.title,
                        alternativeTitles: data.alternativeTitles,
                        cover: image.data?.key ?? undefined,
                        genres: data.genres,
                        description: data.description,
                        language: 'ru',
                        status: ComicStatuses.Continues,
                        teamId: data.teams,
                        tags: data.tags,
                        maturityRating: MaturityRatings[data.maturityRating],
                    },
                },
            })
                .then(({ data }) => {
                    if (data?.comic?.update.record) {
                        notifications.show({
                            title: 'Success',
                            message: 'Comic updated successfully',
                            color: 'green',
                        });
                        revalidatePath('/[lng]/comic/' + data?.comic?.update?.record?.id, 'page');
                    }
                })
                .catch((error) => {
                    notifications.show({
                        title: 'Error',
                        message: 'There was an error when publishing the comic',
                        color: 'red',
                    });
                    console.log(error);
                });
        }
    };

    if (comicLoading || selectionsLoading) {
        return <div>Loading...</div>;
    }

    const teams = selectionsData?.user.me?.membersOf?.edges?.map((edge) => edge?.node.team);
    const tags = selectionsData?.tag.all;
    const genres = selectionsData?.genre.all;

    if (!genres || !teams || !tags) {
        return `${JSON.stringify(selectionsError)} + ${JSON.stringify(comicError)}`;
    }

    return (
        <>
            <UpdateForm
                selectionValues={{
                    loading: false,
                    maturityRatings,
                    teams: teams,
                    tags: tags,
                    genres: genres,
                }}
                selectedValues={{
                    cover: comicData?.comic.one?.cover,
                    teams: comicData?.comic.one?.team?.id || undefined,
                    genres: comicData?.comic.one?.genres?.map((g) => g?.title),
                    tags: comicData?.comic.one?.tags?.map((t) => t?.title),
                    title: comicData?.comic.one?.title,
                    description: comicData?.comic.one?.description || undefined,
                    alternativeTitles: comicData?.comic.one?.alternativeTitles,
                    maturityRating: comicData?.comic.one
                        ?.maturityRating as unknown as keyof typeof MaturityRatings,
                }}
                onSubmit={onSubmit}
            />
        </>
    );
};
