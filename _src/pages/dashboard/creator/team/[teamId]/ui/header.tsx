'use client';
import { useMutation } from '@apollo/client';
import {
    ActionIcon,
    Box,
    Button,
    Fieldset,
    Group,
    Modal,
    rem,
    Select,
    Stack,
    Table,
    Tabs,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProfileHeader } from '@src/entities/profile';
import { GetTeamInviteLinkButton } from '@src/features/team/get-team-invite-link';
import { SendInviteByEmail } from '@src/features/team/send-invite-by-email';
import { TeamInfoQuery } from '@src/shared/api';
import { PageProps } from '@src/shared/api/types';
import { useTranslation } from '@src/shared/lib/i18n/client';
import { Avatar } from '@src/shared/ui';
import { IconTrash, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { deleteTeamMutation } from '../api';

type Props = PageProps & {
    team: NonNullable<TeamInfoQuery['team']['one']>;

    params: { teamId: string };
};

export const TeamPageHeader = ({ params, team }: Props) => {
    const router = useRouter();
    const [deleteTeam, { data: deleteTeamData }] = useMutation(deleteTeamMutation);

    const deleteTeamHandler = () => {
        deleteTeam({
            variables: { teamId: params.teamId },
            update: (cache, { data }) => {
                cache.evict({
                    id: `Team:${data?.team?.delete.record?.id}`,
                });

                cache.gc();
            },
        });

        router.push('/dashboard');
    };

    const { t } = useTranslation(params.lng, 'dashboard/creator/team/index');

    const [opened, { close: close, open: open }] = useDisclosure(false);

    const handleOpenModal = () => {
        open();
    };

    const ModalContent = (
        <Tabs defaultValue="members" variant="pills" activateTabWithKeyboard>
            <Tabs.List mb={24}>
                <Tabs.Tab value="members" tabIndex={0}>
                    {t('team.members')}
                </Tabs.Tab>
                <Tabs.Tab value="settings" tabIndex={0}>
                    {t('team.settings')}
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="members">
                <Title order={4} mb="md">
                    Invite users
                </Title>
                <Box mb="lg">
                    <SendInviteByEmail teamId={params.teamId} />
                    <GetTeamInviteLinkButton teamId={params.teamId} />
                </Box>
                <Title order={4} mb="sm">
                    Members
                </Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('team.table.user')}</Table.Th>
                            <Table.Th>{t('team.table.email')}</Table.Th>
                            <Table.Th>{t('team.table.role')}</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {team?.members?.edges?.map((m) => (
                            <Table.Tr key={m?.node.user?.name}>
                                <Group component={Table.Td} gap="sm" wrap="nowrap">
                                    <Avatar
                                        size="sm"
                                        src={m?.node.user?.avatar}
                                        alt={m?.node.user?.name}
                                    />
                                    <Text lineClamp={1} size="sm">
                                        {m?.node.user?.name}
                                    </Text>
                                </Group>
                                <Table.Td>{m?.node.user?.email}</Table.Td>
                                <Table.Td>
                                    {m?.node.role === 'Creator' ? (
                                        m?.node.role
                                    ) : (
                                        <Select
                                            data={['Admin', 'Editor', 'Artist', 'Publisher']}
                                            defaultValue={m?.node.role}
                                        />
                                    )}
                                </Table.Td>
                                <Table.Td>
                                    {m?.node.role !== 'Creator' && (
                                        <ActionIcon color="red">
                                            <IconTrash size={18} />
                                        </ActionIcon>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Tabs.Panel>
            <Tabs.Panel value="settings">
                <Stack>
                    <Group align="flex-end">
                        <TextInput flex={1} label="Name" defaultValue={team?.name || undefined} />
                        <Button variant="default" size="sm">
                            Изменить
                        </Button>
                    </Group>
                    <Group>
                        <Textarea
                            flex={1}
                            label="Description"
                            minRows={1}
                            defaultValue={team?.description || undefined}
                        />
                        <Button variant="default" size="sm">
                            Изменить
                        </Button>
                    </Group>
                    <Fieldset color="red" legend="Danger Zone">
                        <Text mb={8} size="md" fw={700}>
                            Delete this team
                        </Text>
                        <Text mb={24} size="sm">
                            Once you delete a team, there is no going back. Please be certain.
                        </Text>
                        <Button onClick={deleteTeamHandler} color="red" variant="light">
                            Delete team
                        </Button>
                    </Fieldset>
                </Stack>
            </Tabs.Panel>
        </Tabs>
    );

    return (
        <ProfileHeader user={{ ...team, name: team?.name, description: team?.description }} mb="lg">
            <Button
                size="xs"
                variant="outline"
                leftSection={<IconUser size={16} stroke={rem(2)} />}
                onClick={handleOpenModal}
                aria-label={t('manage team')}
            >
                {team?.members?.pageInfo.totalCount || 0}
            </Button>
            <Modal
                size="lg"
                lockScroll={false}
                opened={opened}
                onClose={close}
                title={t('team.header')}
            >
                {ModalContent}
            </Modal>
        </ProfileHeader>
    );
};
