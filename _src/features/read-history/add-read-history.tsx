'use client'
import { gql, useMutation } from '@apollo/client';
import { useWindowScroll } from '@mantine/hooks';
import { useEffect } from 'react';

import { addReadHistoryMutation } from './api';

export const AddHistory = ({
    params,
    chapterId,
}: {
    params: { id: string };
    chapterId?: string | null;
}) => {
    const scrollPosition = useWindowScroll();

    const [addReadHistory] = useMutation(addReadHistoryMutation, { errorPolicy: 'all' });

    useEffect(() => {
        return () => {
            if (chapterId) {
                addReadHistory({
                    variables: { input: { comicId: params.id, chapterId: chapterId } },
                    update: (cache, { data: history }) => {
                        cache.writeFragment({
                            id: `Chapter:${history?.readHistory?.add?.record?.chapter?.id}`,
                            fragment: gql`
                                fragment _ on Chapter {
                                    usersReadHistory {
                                        id
                                    }
                                }
                            `,
                            data: {
                                usersReadHistory: history?.readHistory?.add?.record,
                            },
                        });
                    },
                });
            }
        };
    }, [chapterId]);

    return <div></div>;
};
