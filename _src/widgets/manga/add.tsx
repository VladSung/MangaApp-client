'use client';
import { SubmitHandler } from 'react-hook-form';

import { AddMangaForm, AddMangaFormInput } from '@/_src/entities/manga';
import { graphql } from '@/_src/shared/api/graphql';
import { MaturityRatings } from '@/_src/shared/api/graphql/graphql';
import { uploadImage } from '@/_src/features/uploadImage';
import { addManga } from '@/_src/features/manga';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const getMangaSelectionsQuery = graphql(`
    query MangaSelections {
        genres {
            title
        }
        tags {
            title
        }
    }
`);

const maturityRatings = [{ title: 'Everyone' }, { title: 'Teen' }, { title: 'Mature' }];

export const AddManga = () => {
    const { data, loading } = useQuery(getMangaSelectionsQuery);
    const onSubmit: SubmitHandler<AddMangaFormInput> = async (data) => {
        const imageData = await uploadImage({ image: data.image, tags: [data?.title] });

        const newManga = await addManga({
            input: {
                // altTitle: data.altTitle,
                title: data.title,
                cover: imageData?.data.public_id,
                genres: data.genres,
                description: data.description,
                language: 'ru',
                teamId: '',
                alternativeTitles: '',
                tags: data.genres,
                maturityRating: MaturityRatings[data.maturityRating],
            },
        });
    };

    return (
        <>
            <AddMangaForm
                selectionValues={{
                    loading: loading,
                    maturityRatings,
                    // tags: data?.tags || undefined,
                    genres: data?.genres || undefined,
                }}
                defaultValues={{
                    maturityRating: 'Everyone',
                }}
                onSubmit={onSubmit}
            />
        </>
    );
};
