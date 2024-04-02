import { graphql } from '@/app/shared/api/graphql';

export const getComicSelectionsQuery = graphql(`
    query ComicSelections {
        genres {
            id
            title
        }
        tags {
            id
            title
        }
        me {
            member {
                team {
                    id
                    avatar
                    name
                }
            }
        }
    }
`);

export const popularComicsQuery = graphql(`
    query GetPopularComics($paginate: PaginateInput!) {
        popularComics(paginate: $paginate) {
            title
            cover
            id
        }
    }
`);
