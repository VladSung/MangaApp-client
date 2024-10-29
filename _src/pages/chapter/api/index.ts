import { graphql } from '@src/shared/api';

export const chapterImagesQuery = graphql(`
    query chapterImages($comicId: ID!, $paginate: ChapterPaginateInput!) {
        chapter {
            all(comicId: $comicId, paginate: $paginate, sort: asc) {
                edges {
                    node {
                        id
                        title
                        volume
                        number
                        images {
                            path
                            aspectRatio
                        }
                    }
                }

                pageInfo {
                    hasNextPage
                    totalCount
                    endCursor
                }
            }
        }
    }
`);

export const usersReadHistoryFragment = graphql(`
    fragment _ on Chapter {
        usersReadHistory {
            id
        }
    }
`);
