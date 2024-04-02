import { graphql } from './graphql';

export const comicQuery = graphql(`
    query ComicName($id: ID!) {
        comic(id: $id) {
            title
        }
    }
`);

export const getComicChapters = graphql(`
    query getChapters($comicId: ID!, $order: OrderBy, $paginate: PaginateInput) {
        chapters(comicId: $comicId, orderBy: $order, paginate: $paginate) {
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
`);
