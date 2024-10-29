import { Comment, CommentReply, User } from '@src/shared/api';

export type CommentBase = Omit<Comment, 'authorId' | 'author' | 'repliesCount'> & {
    author?: null | Pick<User, 'id' | 'avatar' | 'publicId'>;
    repliesCount?: Comment['repliesCount'] | null;
};
// {
//     id?: string;
//     createdAt?: string;
//     _count?: { replies?: number | null } | null;
//     pinned?: boolean;
//     replies?: CommentBase[];
//     content?: string;
//     author?: Pick<User, 'avatar' | 'id' | 'name'> | null;
// };

export type CommentMenuComponent = ({
    commentId,
    authUserIsAuthor,
    authUserIsCreator,
    enableEditCommentHandler,
    isPinned,
}: {
    commentId: string;
    enableEditCommentHandler: () => void;
    authUserIsAuthor: boolean;
    isPinned: boolean;
    authUserIsCreator: boolean;
}) => React.JSX.Element;

export type AddReplyWidget = ({
    comicId,
    chapterId,
    parentCommentId,
    mentionedUserId,
}: {
    comicId: string;
    chapterId?: string;
    parentCommentId?: string;
    mentionedUserId?: string;
}) => React.JSX.Element;
