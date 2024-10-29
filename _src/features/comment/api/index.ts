import { graphql } from '@src/shared/api';

export const addCommentMutation = graphql(`
    #graphql
    mutation AddCommentToComic($input: CommentInput!) {
        comment {
            create(input: $input) {
                issue {
                    message
                }
                record {
                    repliesCount
                    isReply
                    reactions {
                        like
                        dislike
                        userReactType
                    }
                    content
                    createdAt
                    updatedAt
                    isPinned
                    id
                    author {
                        id
                        publicId
                        name
                        avatar
                    }
                }
            }
        }
    }
`);

export const commentsByComicQuery = graphql(`
    #graphql
    query CommentsByComic($id: ID!, $paginate: PaginateInput!, $sort: CommentSort!) {
        comment {
            allByComic(comicId: $id, paginate: $paginate, sort: $sort) {
                pageInfo {
                    totalCount
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        createdAt
                        content
                        id
                        isReply
                        updatedAt
                        reactions {
                            userReactType
                            like
                            dislike
                        }
                        isPinned
                        repliesCount
                        author {
                            id
                            publicId
                            avatar
                            name
                        }
                    }
                }
            }
        }
    }
`);

export const commentRepliesQuery = graphql(`
    #graphql
    query CommentReplies($id: ID!, $sort: CommentSort!) {
        commentReply {
            allByCommentId(commentId: $id, sort: $sort) {
                pageInfo {
                    totalCount
                }
                edges {
                    node {
                        createdAt
                        content
                        isReply
                        id
                        updatedAt
                        reactions {
                            like
                            dislike
                            userReactType
                        }
                        mentionedUserPublicId
                        isPinned
                        author {
                            id
                            publicId
                            avatar
                            name
                        }
                    }
                }
            }
        }
    }
`);

export const commentsByChapterQuery = graphql(`
    query CommentsByChapter($id: ID!, $paginate: PaginateInput!, $sort: CommentSort!) {
        comment {
            allByChapter(chapterId: $id, paginate: $paginate, sort: $sort) {
                pageInfo {
                    totalCount
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        createdAt
                        content
                        isPinned
                        reactions {
                            like
                            dislike
                        }
                        updatedAt
                        isReply
                        repliesCount
                        id
                        author {
                            id
                            publicId
                            avatar
                            name
                        }
                    }
                }
            }
        }
    }
`);

export const commentFragment = graphql(`
    fragment commentFragment on Comment {
        createdAt
        content
        isPinned
        reactions {
            like
            dislike
            userReactType
        }
        isReply
        updatedAt
        repliesCount
        id
        author {
            id
            publicId
            avatar
            name
        }
    }
`);

export const updateCommentMutation = graphql(`
    #graphql
    mutation UpdateComment($input: CommentUpdateInput!) {
        comment {
            update(input: $input) {
                record {
                    id
                    content
                }
            }
        }
    }
`);

export const deleteCommentMutation = graphql(`
    #graphql
    mutation DeleteComment($commentId: ID!) {
        comment {
            delete(id: $commentId) {
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

export const pinCommentMutation = graphql(`
    #graphql
    mutation PinComment($commentId: ID!) {
        comment {
            pin(id: $commentId) {
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

export const unpinCommentMutation = graphql(`
    #graphql
    mutation UnpinComment($commentId: ID!) {
        comment {
            unpin(id: $commentId) {
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
