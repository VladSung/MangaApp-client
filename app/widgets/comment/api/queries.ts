import { graphql } from '@/app/shared/api/graphql';

export const getCommentsQuery = graphql(`
    query CommentsByComic($comicId: ID!) {
        commentsByComic(comicId: $comicId) {
            count
            comments {
                createdAt
                content
                id
                _count {
                    replies
                }
                author {
                    id
                    avatar
                    username
                }
            }
        }
    }
`);
