'use client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Center, Loader } from '@mantine/core';
import { comicFormSelectionsQuery } from '@src/entities/comic/api';
import { ErrorComponent } from '@src/entities/error';
import { uploadImage } from '@src/features/upload-image/api';
import { ComicStatuses, MaturityRatings } from '@src/shared/api';
import { ComicAddFormInput } from '@src/widgets/comic/add/ui/add-form/types';
import { useRouter, useSearchParams } from 'next/navigation';

import { addComicMutation } from '../api';
import { AddForm } from './add-form';

export const AddComicWidget = () => {
    const [addComic, { loading: MutateLoading }] = useMutation(addComicMutation);

    const router = useRouter();

    const teamId = useSearchParams().get('teamId');

    const {
        data: selectionsData,
        error: selectionsError,
        loading,
    } = useQuery(comicFormSelectionsQuery);

    const onSubmit = async (data: ComicAddFormInput) => {
        if (data.cover) {
            const { data: coverData } = await uploadImage(data.cover, false);

            if (coverData?.key) {
                addComic({
                    variables: {
                        input: {
                            title: data.title,
                            alternativeTitles: data.alternativeTitles,
                            description: data.description,
                            cover: coverData?.key,
                            language: 'ru',
                            status: ComicStatuses.Continues,
                            teamId: data.teams,
                            maturityRating: data.maturityRating as MaturityRatings,
                            genres: data?.genres,
                            tags: data?.tags,
                        },
                    },
                }).then((newComic) => {
                    router.push(`/comic/${newComic.data?.comic?.add?.record?.id}`);
                });
            }
        }
    };

    if (loading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    const teams = selectionsData?.user.me?.membersOf?.edges?.map((edge) => edge?.node.team);
    const tags = selectionsData?.tag.all;
    const genres = selectionsData?.genre.all;

    if (!genres || !teams || !tags) {
        return selectionsError ? (
            <div>{JSON.stringify(selectionsError)}</div>
        ) : (
            <ErrorComponent errorCode={'500'} message={'Cannot get tags or genres or empty'} />
        );
    }

    return (
        <AddForm
            loading={MutateLoading}
            selectionValues={{
                loading: false,
                maturityRatings: Object.values(MaturityRatings),
                teams,
                tags,
                genres,
            }}
            selectedValues={{
                teams: teamId || undefined,
            }}
            onSubmit={onSubmit}
        />
    );
};
