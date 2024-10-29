'use client';
import { useMutation } from '@apollo/client';
import { Button, Group, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

import { sendInviteToEmailMutation } from '../api';

type Props = { teamId: string };

export const SendInviteByEmail = ({ teamId }: Props) => {
    const [sendInviteToEmail, { loading }] = useMutation(sendInviteToEmailMutation);
    const [email, setEmail] = useState<string>();

    const handleSendInvite = () => {
        if (!email) {
return notifications.show({
                message: 'Please enter email first!',
                color: 'red',
            });
}

        sendInviteToEmail({ variables: { teamId, email: email } }).then((data) => {
            notifications.show({
                message: `Invite successfully sended to ${email}`,
            });
        });
    };

    return (
        <Group mb="sm" gap="sm">
            <TextInput
                size="sm"
                required
                onBlur={(e) => setEmail(e.currentTarget.value)}
                style={{ flexGrow: 1 }}
                type="email"
                placeholder="Enter email"
            />
            <Button variant="outline" loading={loading} onClick={handleSendInvite} size="sm">
                Send invite
            </Button>
        </Group>
    );
};
