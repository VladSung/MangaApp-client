'use client'
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { graphql } from '@/app/shared/api/graphql';
import { getComicChapters } from '@/app/shared/api/queries';


const addReadingHistoryMutation = graphql(`
    mutation setReadingHistory($comicId:ID!, $chapterId:ID!){
        addReadingHistory(comicId:$comicId, chapterId:$chapterId){
            id
            chapter{
                id
            }
        }
    }
`)


export const AddHistory = ({ params, chapterId }: { params: { id: string }, chapterId?: string | null }) => {
    const [addReadingHistory] = useMutation(addReadingHistoryMutation, { errorPolicy: 'all' })

    useEffect(() => {
        if (chapterId) {
            addReadingHistory({
                variables: { comicId: params.id, chapterId: chapterId },
                update: (cache, { data: history }) => {


                    cache.writeFragment({
                        id: `Chapter:${history?.addReadingHistory?.chapter?.id}`,
                        fragment: gql`
                            fragment _ on Chapter {
                            usersReadHistory {
                                id
                            }
                            }
                        `,
                        data: {
                            usersReadHistory: history?.addReadingHistory
                        }
                    });
                }
            });
        }
    }, [])

    return <div></div>
}
