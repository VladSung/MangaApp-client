import { graphql } from '@src/shared/api';

export const comicBaseInfoQuery = graphql(`
    query ComicBaseInfo($id: ID!) {
        comic {
            one(id: $id) {
                id
                title
                cover
                description
                status
                maturityRating
                language
                createdAt
                updatedAt
                count
                rating {
                    totalCount
                    rating
                }
                genres {
                    title
                }
                tags {
                    title
                }
            }
        }
    }
`);

export const deleteComicMutation = graphql(`
    mutation deleteComic($id: ID!) {
        comic {
            delete(id: $id) {
                record {
                    id
                    title
                }
            }
        }
    }
`);
