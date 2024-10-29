import { graphql } from '@src/shared/api';

export const addReadHistoryMutation = graphql(`
    #graphql
    mutation addReadHistory($input: AddReadHistoryInput!) {
        readHistory {
            add(input: $input) {
                record {
                    id
                    chapter {
                        id
                    }
                }
                issue {
                    message
                }
            }
        }
    }
`);
