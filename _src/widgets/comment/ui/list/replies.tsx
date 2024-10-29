'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Box, Center, Loader } from '@mantine/core';
import { Comment, CommentMenuComponent } from '@src/entities/comment';
import { commentRepliesQuery } from '@src/features/comment';
import { CommentSort } from '@src/shared/api';

type AddReplyWidget = ({
    comicId,
    chapterId,
    parentCommentId,
}: {
    comicId: string;
    chapterId?: string;
    parentCommentId?: string;
}) => React.JSX.Element;

const Replies = ({
    commentId,
    AddReplyWidget,
    Menu,
    sort,
    comicId,
    authUserId,
    UpdateCommentWidget,
    chapterId,
    authUserIsCreator,
}: {
    commentId: string;
    sort: CommentSort;
    Menu: CommentMenuComponent;
    AddReplyWidget: AddReplyWidget;
    comicId: string;
    UpdateCommentWidget: ({
        id,
        content,
        onClose,
    }: {
        id: string;
        content: string;
        onClose: () => void;
    }) => React.ReactNode;
    authUserId: string | null;
    authUserIsCreator: boolean;
    chapterId?: string;
}) => {
    const { data, loading } = useQuery(commentRepliesQuery, { variables: { id: commentId, sort } });

    if (loading) {
        return (
            <Center>
                <Loader size="sm" />
            </Center>
        );
    }

    return (
        <Box>
            {data?.commentReply.allByCommentId.edges?.map(({ node: reply }) => (
                <Comment
                    Menu={Menu}
                    UpdateCommentWidget={UpdateCommentWidget}
                    AddReplyWidget={AddReplyWidget}
                    comicId={comicId}
                    authUserId={authUserId}
                    authUserIsCreator={authUserIsCreator}
                    chapterId={chapterId}
                    key={reply.id}
                    comment={reply}
                    parentCommentId={commentId}
                    isReply={true}
                />
            ))}
        </Box>
    );
};

export default Replies;
