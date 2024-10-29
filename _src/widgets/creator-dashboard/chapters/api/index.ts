import { graphql } from '@src/shared/api';

export const deleteChapterMutation = graphql(`
    mutation deleteChapter($id: ID!) {
        chapter {
            delete(id: $id) {
                record {
                    id
                }
                issue {
                    message
                }
            }
        }
    }
`);
