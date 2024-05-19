import { graphql } from '@src/shared/api/graphql';

export const getComicCommentsQuery = graphql(`
    query CommentsByComic($id: ID!) {
        commentsByComic(comicId: $id) {
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
                    name
                }
            }
        }
    }
`);

export const getChapterCommentsQuery = graphql(`
    query CommentsByChapter($id: ID!) {
        commentsByChapter(chapterId: $id) {
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
                    name
                }
            }
        }
    }
`);