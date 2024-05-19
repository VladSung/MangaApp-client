import { graphql } from './graphql';

export const comicQuery = graphql(`
    query ComicName($id: ID!) {
        comic(id: $id) {
            title
        }
    }
`);

export const getComicChapters = graphql(`
    query getChapters($comicId: ID!, $order: OrderBy, $paginate: ChapterPaginateInput) {
        chapters(comicId: $comicId, orderBy: $order, paginate: $paginate) {
            count
            chapters {
                id
                createdAt
                number
                volume
                title
                usersReadHistory {
                    id
                }
            }
        }
    }
`);
