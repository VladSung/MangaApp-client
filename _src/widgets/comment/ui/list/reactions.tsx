import { useMutation } from '@apollo/client';
import { Button,ButtonGroup } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { commentFragment } from '@src/features/comment';
import { CommentReaction, ReactionType } from '@src/shared/api';
import {
    IconThumbDown,
    IconThumbDownFilled,
    IconThumbUp,
    IconThumbUpFilled,
} from '@tabler/icons-react';

import { UPDATE_COMMENT_REACTION_MUTATION } from '../../api';

type Props = { reactions?: CommentReaction | null; commentId: string };

export const CommentReactions = ({ reactions, commentId }: Props) => {
    const [updateReaction] = useMutation(UPDATE_COMMENT_REACTION_MUTATION);

    const updateReactionHandler = (reaction: ReactionType) => () => {
        updateReaction({
            variables: {
                input: {
                    id: commentId,
                    reaction,
                },
            },
            update(cache, { data: resultData }) {
                if (resultData?.comment.updateReaction.issue) {
return;
}

                const comment = cache.updateFragment(
                    {
                        fragment: commentFragment,
                        id: `Comment:${commentId}`,
                    },
                    (data) => {
                        console.log('data', data);

                        return {
                            ...data!,
                            reactions: resultData?.comment.updateReaction.record?.reactions,
                        };
                    }
                );
            },
        }).then((data) => {
            data.data?.comment.updateReaction.issue &&
                notifications.show({
                    color: 'red',
                    message: data.data?.comment.updateReaction.issue.message,
                });
        });
    };

    return (
        <ButtonGroup>
            <Button
                size="compact-sm"
                variant="transparent"
                color="gray"
                leftSection={
                    reactions?.userReactType === ReactionType.Like ? (
                        <IconThumbUpFilled size={14} stroke={1.5} />
                    ) : (
                        <IconThumbUp size={14} stroke={1.5} />
                    )
                }
                aria-label="like"
                onClick={updateReactionHandler(ReactionType.Like)}
            >
                {reactions?.like ?? 0}
            </Button>
            <Button
                size="compact-sm"
                variant="transparent"
                color="gray"
                leftSection={
                    reactions?.userReactType === ReactionType.Dislike ? (
                        <IconThumbDownFilled size={14} stroke={1.5} />
                    ) : (
                        <IconThumbDown size={14} stroke={1.5} />
                    )
                }
                aria-label="dislike"
                onClick={updateReactionHandler(ReactionType.Dislike)}
            >
                {reactions?.dislike ?? 0}
            </Button>
        </ButtonGroup>
    );
};
