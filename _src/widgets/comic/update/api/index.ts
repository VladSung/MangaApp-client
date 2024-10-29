import { graphql } from '@src/shared/api';

export const comicInfoForUpdate = graphql(`
    query UserComicForUpdate($id: ID!) {
        comic {
            one(id: $id) {
                genres {
                    id
                    title
                }
                tags {
                    id
                    title
                }
                team {
                    id
                    avatar
                    name
                }
                title
                alternativeTitles
                cover
                description
                language
                status
                maturityRating
            }
        }
    }
`);

export const updateComicMutation = graphql(`
    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {
        comic {
            update(id: $id, input: $input) {
                record {
                    id
                }
            }
        }
    }
`);
