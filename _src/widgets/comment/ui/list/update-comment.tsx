import { useMutation } from '@apollo/client';
import { Button, Group, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { commentFragment, updateCommentMutation } from '@src/features/comment';

export const UpdateCommentWidget = ({
    id,
    content,
    onClose,
}: {
    id: string;
    content: string;
    onClose: () => void;
}) => {
    const [newContent, setNewContent] = useInputState(content);
    const [updateComment, { loading }] = useMutation(updateCommentMutation);

    console.log(newContent);

    const updateCommentHandler = () => {
        newContent &&
            updateComment({
                variables: {
                    input: {
                        id,
                        content: newContent,
                    },
                },
                update: (cache, result, { variables }) => {
                    if (!result.data?.comment.update.record?.id) {
                        return;
                    }

                    const comment = cache.readFragment({
                        fragment: commentFragment,
                        id: result.data?.comment.update.record?.id,
                    });

                    return cache.writeFragment({
                        fragment: commentFragment,
                        id: result.data?.comment.update.record?.id,
                        data: {
                            ...comment,
                            content: result.data?.comment.update.record?.content,
                        },
                    });
                },
            }).then(() => {
                onClose();
            });
    };

    return (
        <>
            <TextInput onBlur={(e) => setNewContent(e.target.value)} defaultValue={content} />
            <Group justify="flex-end" mt="md">
                <Button variant="subtle" color="gray" onClick={onClose} size="sm">
                    Отмена
                </Button>
                <Button
                    disabled={newContent === content}
                    loading={loading}
                    onClick={updateCommentHandler}
                    color="blue"
                    size="sm"
                >
                    Сохранить
                </Button>
            </Group>
        </>
    );
};
