
import { graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';
import { ChaptersInner } from './chapter-inner';


const getChaptersQuery = graphql(`
    query ChaptersByComicId($id:ID!){
        chapters(comicId:$id){
            title
            volume
            number
            id
            publishDate
            price
        }    
    }
`)

export const Chapters = async ({ comicId }: { comicId: string }) => {
    const chapters = await getClient().query({ query: getChaptersQuery, variables: { id: comicId } })

    return <ChaptersInner comicId={comicId} chapters={chapters.data.chapters} />

}