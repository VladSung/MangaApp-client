'use client';
import { useMutation } from '@apollo/client';
import { Button, Fieldset, Stack, Switch, Text, Title } from '@mantine/core';

import router from 'next/router';

import { deleteComicMutation } from '../api';

type Props = {
    params: {
        comicId: string;
    };
};

export const SettingsTab = ({ params }: Props) => {
    const [deleteComic, { data }] = useMutation(deleteComicMutation);

    const deleteComicHandler = () => {
        deleteComic({
            variables: { id: params.comicId },
            update: (cache, { data }) => {
                cache.evict({
                    id: `Comic:${data?.comic.delete.record?.id}`,
                });

                cache.gc();
            },
        });

        router.push('/dashboard/comic/');
    };

    return (
        <Stack>
            <Title order={4}>Comic Settings</Title>
            <Switch label="Allow comments" defaultChecked />
            <Switch label="Show in featured list" defaultChecked />
            <Switch label="Enable content warnings" />
            <Button mt="md" mb="mb">
                Save Settings
            </Button>
            <Fieldset color="red" legend="Danger Zone">
                <Text mb={8} size="md" fw={700}>
                    Delete this comic
                </Text>
                <Text mb={24} size="sm">
                    Once you delete a comic, there is no going back. Please be certain.
                </Text>
                <Button onClick={deleteComicHandler} color="red" variant="light">
                    Delete comic
                </Button>
            </Fieldset>
        </Stack>
    );
};
