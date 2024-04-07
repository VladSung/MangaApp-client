'use client'
import { gql, Reference, useMutation } from "@apollo/client"
import { ActionIcon, Box, Button, Divider, Fieldset, Flex, Group, Modal, rem, Select, Stack, Table, Tabs, Text, Textarea, TextInput,Title } from "@mantine/core"
import { useClipboard, useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconLink, IconPlus, IconTrash, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

import { Team } from "@/app/entities/team"
import { graphql } from "@/app/shared/api/graphql"
import { useTranslation } from "@/app/shared/lib/i18n/client"
import { PageProps } from "@/app/shared/types"
import { Avatar } from "@/app/shared/ui/Avatar"
import { useRouter } from "next/navigation"

type Props = PageProps & {
    team?: Pick<Team, 'avatar' | 'name' | 'id' | 'members' | 'tagline'> | null

    params: { teamId: string; }
}

// !Разобрать на отдельные компоненты

const genInviteLinkMutation = graphql(`
    mutation generateInviteLink($teamId:ID!){
    generateTeamInviteLink(teamId:$teamId, role: "Viewer")
    }
`)

const sendInviteToEmailMutation = graphql(`
    mutation SendIviteEmail($teamId:ID!, $email:String!){
        sendInviteToEmail(teamId:$teamId, email:$email, role:"Viewer")
    }
`)

const deleteTeamMutation = graphql(`
    mutation DeleteUserTeam($teamId:ID!){
        deleteTeam(id:$teamId){
            id
        }
    }
`)

export const TeamPageHeader = ({ params, team }: Props) => {

    const router = useRouter()
    const [deleteTeam] = useMutation(deleteTeamMutation)

    const deleteTeamHandler = () => {
        deleteTeam({
            variables: { teamId: params.teamId },
            update: (cache, { data }) => {
                cache.evict({
                    id: `Team:${data?.deleteTeam.id}`,
                    args: {
                        id: null,
                        name: null,
                        avatar: null
                    }
                });
                cache.gc();
            }
        })
        notifications.show({ title: "Team", message: "Team successfuly deleted" })
        router.push('/dashboard')
    }

    const clipboard = useClipboard({ timeout: 5000 });
    const { t } = useTranslation(params.lng, "creator-dashboard/team");
    const [genInviteLink, { loading: LinkLoading }] = useMutation(genInviteLinkMutation)
    const [sendInviteToEmail] = useMutation(sendInviteToEmailMutation)
    const [opened, { close: close, open: open }] = useDisclosure(false);

    const [email, setEmail] = useState<string>()

    const handleSendInvite = async () => {
        if (email) {
            sendInviteToEmail({ variables: { teamId: params.teamId, email: email } })
            notifications.show({ title: "Invite", message: `Email successfuly send to ${email}` })
        }
    }

    const getInviteLink = async () => {
        const token = await genInviteLink({ variables: { teamId: params.teamId } })
        clipboard.copy(`${process.env.NEXT_PUBLIC_APP_ORIGIN || window.location.hostname}/team?invite=${token.data?.generateTeamInviteLink}`)
    }

    const handleOpenModal = () => {
        open()
    }

    const ModalContent = (
        <Tabs defaultValue='members' variant='pills' activateTabWithKeyboard>
            <Tabs.List mb={24}>
                <Tabs.Tab value='members' tabIndex={0}>
                    {t('team.members')}
                </Tabs.Tab>
                <Tabs.Tab value='settings' tabIndex={0}>
                    {t('team.settings')}
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='members'>
                <Title order={4} mb='md'>Invite users</Title>
                <Box mb='lg'>
                    <Group mb='sm' gap='sm'>
                        <TextInput size='sm' required onBlur={(e) => setEmail(e.currentTarget.value)} style={{ flexGrow: 1 }} type='email' placeholder='Enter email' />
                        <Button variant='outline' onClick={handleSendInvite} size='sm'>Send invite</Button>
                    </Group>
                    <Group>
                        <Button
                            size='sm'
                            c={clipboard.copied ? 'green' : undefined}
                            onClick={getInviteLink} variant='subtle'
                            disabled={clipboard.copied}
                            loading={LinkLoading}
                            leftSection={<IconLink size={14} />}
                        >
                            {clipboard.copied ? 'Link saved to Clipboard' : 'Or get private invite link'}
                        </Button>
                        <Text c='dimmed' size='sm'>Link expired after 1 day</Text>
                    </Group>
                </Box>
                <Title order={4} mb='sm'>Members</Title>
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
                        {team?.members?.map((m) => (
                            <Table.Tr key={m?.user?.username}>
                                <Group component={Table.Td} gap='sm' wrap='nowrap'>
                                    <Avatar size='sm' src={m?.user?.avatar} alt={m?.user?.username} />
                                    <Text lineClamp={1} size='sm'>{m?.user?.username}</Text>
                                </Group>
                                <Table.Td>{m?.user?.email}</Table.Td>
                                <Table.Td>{m.role === 'Creator' ? m.role : <Select data={['Admin', 'Editor', 'Artist', 'Publisher']} defaultValue={m.role} />}</Table.Td>
                                <Table.Td>{m.role !== 'Creator' && <ActionIcon color='red'><IconTrash size={18} /></ActionIcon>}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

            </Tabs.Panel>
            <Tabs.Panel value='settings'>
                <Stack>
                    <Group align='flex-end'>
                        <TextInput flex={1} label='Name' defaultValue={team?.name || undefined} />
                        <Button variant='default' size='sm'>Изменить</Button>
                    </Group>
                    <Group>
                        <Textarea flex={1} label='Description' minRows={1} defaultValue={team?.tagline || undefined} />
                        <Button variant='default' size='sm'>Изменить</Button>
                    </Group>
                    <Fieldset color='red' legend="Danger Zone">
                        <Text mb={8} size='md' fw={700}>Delete this team</Text>
                        <Text mb={24} size='sm'>Once you delete a team, there is no going back. Please be certain.</Text>
                        <Button onClick={deleteTeamHandler} color='red' variant='light'>Delete team</Button>

                    </Fieldset>
                </Stack>
            </Tabs.Panel>
        </Tabs >);

    return (
        <Flex component='header' mb='lg' justify='space-between' align='center'>
            <Flex gap={8} align='center'>
                <Avatar size='lg' src={team?.avatar} alt={team?.name} />
                <Title style={{ mb: 2 }} order={2} component='p'>
                    {team?.name}
                </Title>
            </Flex>

            <Flex gap={8}>
                <Button size='xs' href={`/dashboard/comic/add?teamId=${team?.id}`} component={Link} variant='contain' leftSection={<IconPlus size={16} stroke={rem(2)} />}>{t('header.project')}</Button>
                <Button size='xs' variant='outline' leftSection={<IconUser size={16} stroke={rem(2)} />} onClick={handleOpenModal} aria-label={t('manage team')}>
                    {team?.members?.length}
                </Button>
            </Flex>
            <Modal size='lg' lockScroll={false} opened={opened} onClose={close} title={t('team.header')}>
                {ModalContent}
            </Modal>
        </Flex>
    )
}
