import { graphql } from '@src/shared/api';

export const UPDATE_COMMENT_REACTION_MUTATION = graphql(`
    mutation UpdateCommentReaction($input: UpdateCommentReactionInput!) {
        comment {
            updateReaction(input: $input) {
                issue {
                    message
                }
                record {
                    reactions {
                        like
                        dislike
                        userReactType
                    }
                }
            }
        }
    }
`);
