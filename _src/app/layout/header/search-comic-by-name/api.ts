import { graphql } from '@src/shared/api';

export const searchComicsBySearchTextQuery = graphql(`
    query searchComicsBySearchText($search: String!) {
        comic {
            all(filter: { searchText: $search }, paginate: { first: 10 }) {
                pageInfo {
                    totalCount
                }
                edges {
                    node {
                        id
                        title
                        alternativeTitles
                        cover
                    }
                }
            }
        }
    }
`);
