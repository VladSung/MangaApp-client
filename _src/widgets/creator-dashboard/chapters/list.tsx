
import { graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';
import { ChaptersInner } from './ui/list';


const getChaptersQuery = graphql(`
    query ChaptersByComicId($id:ID!){
        chapters(comicId:$id){
            count
            chapters{
                title
                volume
                number
                id
                publishDate
                price
            }
        }    
    }
`)

export const Chapters = async ({ comicId }: { comicId: string }) => {
    const chapters = await getClient().query({ query: getChaptersQuery, variables: { id: comicId } })

    return <ChaptersInner comicId={comicId} data={chapters?.data?.chapters} />

}