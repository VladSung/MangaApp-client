import { graphql } from '@src/shared/api';

export const chaptersByComicIdQuery = graphql(`
    query ChaptersByComicId($id: ID!, $sort: OrderBy!, $paginate: ChapterPaginateInput!) {
        chapter {
            all(comicId: $id, sort: $sort, paginate: $paginate) {
                edges {
                    node {
                        title
                        volume
                        number
                        id
                        publishDate
                        price
                        usersReadHistory {
                            id
                        }
                    }
                }
                pageInfo {
                    totalCount
                }
            }
        }
    }
`);
