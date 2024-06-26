import { graphql } from '@/app/shared/api/graphql';

export const getComicQuery = graphql(`
    query getComicPage($id: ID!) {
        comic(id: $id) {
            id
            title
            alternativeTitles
            cover
            description
            status
            lastReadedChapter {
                id
                volume
                number
            }
            genres {
                id
                title
            }
            tags {
                id
                title
            }
            team {
                members {
                    user {
                        id
                        avatar
                        username
                    }
                }
            }
        }
    }
`);

export const getComicMetaQuery = graphql(`
    query getComicMeta($id: ID!) {
        comic(id: $id) {
            title
            description
        }
    }
`);
