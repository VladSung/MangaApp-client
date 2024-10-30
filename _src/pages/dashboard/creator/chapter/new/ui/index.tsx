'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Anchor, AppShellSection, Breadcrumbs, Container, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { chaptersByComicIdQuery } from '@src/entities/chapter';
import { uploadImage } from '@src/features/upload-image';
import Link from 'next/link';

import { addChapterMutation, lastChapterOfComicQuery } from '../api';
import { ChapterUploadForm, OnSubmitHandler } from './form';
import { PageProps } from '@src/shared/api';
import { use } from 'react';

export const ChapterUploadPage = ({ params }: PageProps<{ comicId: string }>) => {
    const { comicId, lng } = use(params);
    const { data: comicData, loading } = useQuery(lastChapterOfComicQuery, {
        variables: { id: comicId },
        fetchPolicy: 'network-only',
    });

    const [uploadChapter, { data, error, loading: uploadChapterLoading }] = useMutation(
        addChapterMutation,
        {
            refetchQueries: [
                {
                    query: lastChapterOfComicQuery,
                    variables: { id: comicId },
                },
                chaptersByComicIdQuery,
            ],
        }
    );

    const onSubmit: OnSubmitHandler = async (data, form) => {
        const uploadFormData = new FormData();
        uploadFormData.append('id', comicId);
        uploadFormData.append('type', 'chapter');

        if (data) {
            const uploadS3Urls = [];

            for (let i = 0; i < data.images.length; i++) {
                const { data: imageData, error } = await uploadImage(data.images[i], true);

                if (error) {
                    notifications.show({
                        title: 'Error: ' + data.images[i].name,
                        message: error.message,
                        color: 'red',
                    });
                }

                uploadS3Urls.push({
                    data: imageData,
                });
            }

            uploadChapter({
                variables: {
                    input: {
                        comicId: comicId,
                        volume: data?.volume,
                        number: data.number,
                        title: data.name,
                        language: '',
                        images: uploadS3Urls.map((u) => ({
                            path: u.data?.key!,
                            aspectRatio: u.data?.aspectRatio!,
                        })),
                        publishDate: data.publishDate.toISOString(),
                    },
                },
            }).then((data) => {
                const issue = data.data?.chapter.add.issue;

                const chapter = data.data?.chapter.add.record;

                if (issue) {
                    notifications.show({
                        message: issue.message,
                    });
                }

                if (chapter) {
                    form.setValues({
                        volume: chapter?.volume,
                        number: chapter?.number + 1,
                        images: [],
                        name: '',
                        publishDate: new Date(),
                    });

                    notifications.show({
                        title: `Chapter ${chapter?.volume}-${chapter?.number}`,
                        message: 'Chapter successfully uploaded',
                        c: 'green',
                    });
                }
            });
        }
    };

    return (
        <AppShellSection component={Container} pt="sm" mb="md">
            <Breadcrumbs mb={32}>
                <Anchor href="/dashboard" component={Link}>
                    Dashboard
                </Anchor>
                <Anchor href="/dashboard/comic" component={Link}>
                    Projects
                </Anchor>
                <Anchor href={`/dashboard/comic/${comicId}`} component={Link}>
                    {comicData?.comic.one?.title}
                </Anchor>
                <Anchor>New chapter</Anchor>
            </Breadcrumbs>
            {loading ? (
                <Loader />
            ) : (
                <ChapterUploadForm
                    onSubmitHandler={onSubmit}
                    submitLoading={uploadChapterLoading}
                    number={(comicData?.comic.one?.chapters?.edges?.[0].node.number || 0) + 1}
                    volume={comicData?.comic.one?.chapters?.edges?.[0].node.volume || 1}
                    comicId={comicId}
                    lng={lng}
                />
            )}
        </AppShellSection>
    );
};
