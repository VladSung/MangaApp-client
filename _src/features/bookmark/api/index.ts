import { graphql } from '@src/shared/api';

export const addBookmarkMutation = graphql(`
    #graphql
    mutation addBookmark($input: BookmarkInput!) {
        bookmark {
            add(input: $input) {
                record {
                    title
                    id
                }
                issue {
                    message
                }
            }
        }
    }
`);

export const deleteBookmarkMutation = graphql(`
    #graphql
    mutation deleteBookmark($id: ID!) {
        bookmark {
            delete(id: $id) {
                record {
                    title
                    id
                }
                issue {
                    message
                }
            }
        }
    }
`);
