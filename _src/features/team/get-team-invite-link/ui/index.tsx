'use client';
import { useMutation } from '@apollo/client';
import { Button, Group, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLink } from '@tabler/icons-react';

import { getInviteLinkMutation } from '../api';

type Props = { teamId: string };

export const GetTeamInviteLinkButton = ({ teamId }: Props) => {
    const clipboard = useClipboard({ timeout: 5000 });
    const [genInviteLink, { loading: LinkLoading }] = useMutation(getInviteLinkMutation);

    const getInviteLink = async () => {
        const data = await genInviteLink({ variables: { teamId } });
        const token = data.data?.team.generateTeamInviteLink;

        if (token?.record) {
clipboard.copy(
                `${process.env.NEXT_PUBLIC_APP_ORIGIN || window.location.hostname}/team?invite=${token?.record}`
            );
}

        if (token?.issue) {
notifications.show({
                message: token.issue.message,
                color: 'red',
            });
}
    };

    return (
        <Group>
            <Button
                size="sm"
                c={clipboard.copied ? 'green' : undefined}
                onClick={getInviteLink}
                variant="subtle"
                disabled={clipboard.copied}
                loading={LinkLoading}
                leftSection={<IconLink size={14} />}
            >
                {clipboard.copied ? 'Link saved to Clipboard' : 'Or get private invite link'}
            </Button>
            <Text c="dimmed" size="sm">
                Link expired after 1 week
            </Text>
        </Group>
    );
};
