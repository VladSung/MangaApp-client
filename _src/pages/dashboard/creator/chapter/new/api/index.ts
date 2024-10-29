import { graphql } from '@src/shared/api';

export const lastChapterOfComicQuery = graphql(`
    query LastChapterOfComic($id: ID!) {
        comic {
            one(id: $id) {
                title
                chapters(paginate: { first: 1, before: null }, sort: desc) {
                    edges {
                        node {
                            id
                            volume
                            number
                        }
                    }
                    pageInfo {
                        totalCount
                    }
                }
            }
        }
    }
`);
export const addChapterMutation = graphql(`
    mutation AddChapter($input: addChapterInput!) {
        chapter {
            add(input: $input) {
                record {
                    id
                    volume
                    number
                }
                issue {
                    message
                }
            }
        }
    }
`);
