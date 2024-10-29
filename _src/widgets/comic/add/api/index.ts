import { graphql } from '@src/shared/api';

export const addComicMutation = graphql(`
    #graphql
    mutation AddComic($input: AddComicInput!) {
        comic {
            add(input: $input) {
                issue{
                    message
                }
                record {
                    id
                    title
                }
            }
        }
    }
`);
