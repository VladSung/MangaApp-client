'use client'
import { gql, useMutation } from '@apollo/client';
import { use, useEffect } from 'react';

import { addReadHistoryMutation } from './api';

export const AddHistory = ({
    chapterId,
    comicId,
}: {
    comicId: string;
    chapterId?: string | null;
}) => {
    const [addReadHistory] = useMutation(addReadHistoryMutation, { errorPolicy: 'all' });

    useEffect(() => {
        return () => {
            if (chapterId) {
                addReadHistory({
                    variables: { input: { comicId, chapterId: chapterId } },
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
