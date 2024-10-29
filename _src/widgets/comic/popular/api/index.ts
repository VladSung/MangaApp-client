import { graphql } from '@src/shared/api';

export const popularComicsQuery = graphql(`
    query PopularComics($paginate: PaginateInput!) {
        comic {
            popular(paginate: $paginate) {
                edges {
                    node {
                        title
                        cover
                        id
                    }
                }
            }
        }
    }
`);
