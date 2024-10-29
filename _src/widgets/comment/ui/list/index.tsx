'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Box, Button, Group, Loader, Space, Text, Title } from '@mantine/core';
import { Comment } from '@src/entities/comment';
import {
    AddComment,
    CommentMenu,
    commentsByChapterQuery,
    commentsByComicQuery,
} from '@src/features/comment';
import { meProfileInfoQuery } from '@src/pages/profile/api';
import { CommentsByChapterQuery, CommentsByComicQuery, CommentSort } from '@src/shared/api';
import { useEffect, useState } from 'react';

import Replies from './replies';
import { UpdateCommentWidget } from './update-comment';

const COMMENTS_PER_PAGE = 10;

// TODO!: rewrite it to simplify code, use callbacks for actions instead of props with Components:
// TODO!: AddComment, UpdateCommentWidget, CommentMenu

export const CommentsList = ({
    comicId,
    chapterId,
    creatorTeamId,
}: {
    creatorTeamId?: string;
    comicId: string;
    chapterId?: string;
}) => {
    const query = chapterId ? commentsByChapterQuery : commentsByComicQuery;

    const [sort, setSort] = useState<CommentSort>(CommentSort.Popular);
    const variables = {
        id: chapterId || comicId,
        sort,
        paginate: {
            first: COMMENTS_PER_PAGE,
            after: null,
        },
    };

    const { data, loading, fetchMore, refetch } = useQuery<
        CommentsByChapterQuery & CommentsByComicQuery
    >(query, {
        variables,
    });

    const { data: authData, loading: authUserLoading } = useQuery(meProfileInfoQuery);

    const queriesIsLoading = authUserLoading || loading;

    const authUserId = authData?.user.me?.publicId || null;

    const authUserIsCreator = !!authData?.user.me?.membersOf?.edges?.find(
        ({ node }) => node.team?.id === creatorTeamId
    );

    const commentData = chapterId ? data?.comment.allByChapter : data?.comment.allByComic;

    const loadMore = () => {
        fetchMore({
            variables: {
                paginate: {
                    after: commentData?.pageInfo?.endCursor,
                    first: COMMENTS_PER_PAGE,
                },
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }

                const newEdges =
                    fetchMoreResult.comment?.allByChapter?.edges ||
                    fetchMoreResult.comment?.allByComic?.edges ||
                    [];

                const pageInfo =
                    fetchMoreResult.comment?.allByChapter?.pageInfo ||
                    fetchMoreResult.comment?.allByComic?.pageInfo;

                return {
                    comment: {
                        ...prev.comment,
                        allByChapter: {
                            edges: [...(prev.comment?.allByChapter?.edges || []), ...newEdges],
                            pageInfo,
                        },
                        allByComic: {
                            edges: [...(prev.comment?.allByComic?.edges || []), ...newEdges],
                            pageInfo,
                        },
                    },
                };
            },
        });
    };

    const refetchHandler = (newSort: CommentSort) => {
        setSort(newSort);
    };

    console.log(loading);

    useEffect(() => {
        refetch({ ...variables, sort });
    }, [sort]);

    return (
        <Box>
            <Group mb="md">
                <Title order={3} mb="sm">
                    Комментарии ({commentData?.pageInfo?.totalCount || 0})
                </Title>
                <Button
                    size="compact-sm"
                    variant="default"
                    disabled={sort === CommentSort.Popular}
                    onClick={() => refetchHandler(CommentSort.Popular)}
                >
                    Popular
                </Button>
                <Button
                    size="compact-sm"
                    variant="default"
                    disabled={sort === CommentSort.New}
                    onClick={() => refetchHandler(CommentSort.New)}
                >
                    New
                </Button>
            </Group>
            <AddComment comicId={comicId} chapterId={chapterId} />
            <Space h="md" />
            {queriesIsLoading && <Loader />}
            {!queriesIsLoading && commentData?.edges?.length === 0 && (
                <Text>Нет ни одного комментария</Text>
            )}
            {!queriesIsLoading &&
                commentData?.edges?.map(({ node: comment }) => (
                    <Comment
                        key={comment.id}
                        UpdateCommentWidget={UpdateCommentWidget}
                        Menu={CommentMenu}
                        comicId={comicId}
                        chapterId={chapterId}
                        authUserId={authUserId}
                        authUserIsCreator={authUserIsCreator}
                        AddReplyWidget={AddComment}
                        Replies={
                            <Replies
                                sort={sort}
                                commentId={comment.id}
                                Menu={CommentMenu}
                                authUserIsCreator={authUserIsCreator}
                                UpdateCommentWidget={UpdateCommentWidget}
                                authUserId={authUserId}
                                AddReplyWidget={AddComment}
                                comicId={comicId}
                                chapterId={chapterId}
                            />
                        }
                        comment={comment}
                    />
                ))}
            {commentData?.pageInfo?.hasNextPage && (
                <Group justify="center" mt="md">
                    <Button loading={loading} onClick={loadMore} variant="outline">
                        Загрузить еще
                    </Button>
                </Group>
            )}
        </Box>
    );
};
