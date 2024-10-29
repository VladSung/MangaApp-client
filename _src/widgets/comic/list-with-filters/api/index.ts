import { graphql } from '@src/shared/api';

export const comicsWithFiltersQuery = graphql(`
    query ComicsWithFilters($paginate: PaginateInput!, $filter: ComicFilterInput) {
        comic {
            all(paginate: $paginate, filter: $filter) {
                pageInfo {
                    endCursor
                    totalCount
                    hasNextPage
                }
                edges {
                    node {
                        id
                        cover
                        title
                        alternativeTitles
                        updatedAt
                    }
                }
            }
        }
    }
`);
