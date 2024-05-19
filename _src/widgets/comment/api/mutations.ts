import { graphql } from '@src/shared/api/graphql';

export const getCommentRepliesQuery = graphql(`
    query getCommentReplies($commentId: ID!) {
        repliesOnCommentByCommentId(commentId: $commentId) {
            content
            createdAt
            id
            author {
                name
                avatar
            }
            _count {
                replies
            }
        }
    }
`);
