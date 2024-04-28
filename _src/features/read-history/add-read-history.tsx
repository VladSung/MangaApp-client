'use client'
import { gql, useMutation } from '@apollo/client';
import { useLayoutEffect, useRef } from 'react';

import { graphql } from '@src/shared/api/graphql';
import { getComicChapters } from '@src/shared/api/queries';
import { useScrollIntoView, useWindowScroll } from '@mantine/hooks';


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


export const AddHistory = ({ params, chapterId, scroll }: { params: { id: string }, scroll?: { image?: { current: number }, all?: number }, chapterId?: string | null }) => {

    useLayoutEffect(() => {
        console.log(`${chapterId}: start`)
        return () => {
            console.log(`${chapterId}: ${window.scrollY}, image: ${scroll?.image?.current}/${scroll?.all}`)
            if (chapterId) {
                // addReadingHistory({
                //     variables: { comicId: params.id, chapterId: chapterId },
                //     update: (cache, { data: history }) => {
                //         cache.writeFragment({
                //             id: `Chapter:${history?.addReadingHistory?.chapter?.id}`,
                //             fragment: gql`
                //             fragment _ on Chapter {
                //             usersReadHistory {
                //                 id
                //             }
                //             }
                //         `,
                //             data: {
                //                 usersReadHistory: history?.addReadingHistory
                //             }
                //         });
                //     }
                // });
            }
        }
    }, [chapterId])

    return <div></div>
}
