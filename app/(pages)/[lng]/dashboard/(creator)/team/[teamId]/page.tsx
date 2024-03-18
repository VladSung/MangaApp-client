'use client'
import { ComicListItem } from '@/app/entities/comic';
import { graphql } from '@/app/shared/api/graphql';
import { useTranslation } from '@/app/shared/lib/i18n/client';
import { PageProps } from '@/app/shared/types';
import { Avatar } from '@/app/shared/ui/Avatar';
import { NotFoundError } from '@/app/widgets/not-found';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Box, Button, Container, Flex, Text, Modal, Table, Tabs, Title, rem, ActionIcon, Anchor, Fieldset, Stack, Group, TextInput, Textarea, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

// написать запрос если ничего не найдено то
//      показать компонент ошибка с сообщением что контента нет, можно добавить какую то илюстрацию
//      показать список команд

type Props = PageProps & {
    params: {
        teamId: string;
    }
}

const teamQuery = graphql(`
    query MyTeamInfo($id:ID!) {
        team(id:$id) {
            id
            name
            avatar
            members{
                role
                user{
                    username
                    avatar
                    email
                }
            }
            comics{
                id
                title
                alternativeTitles
                cover
                updatedAt
            }
        }
    }
`);



export default function TeamList({ params }: Props) {

    const { t } = useTranslation(params.lng, 'creator-dashboard/team');
    const { data, loading } = useQuery(teamQuery, { variables: { id: params.teamId } });
    const [opened, { close: close, open: open }] = useDisclosure(false);
    const [modalContent, setModalContent] = useState<'invite' | 'team'>('invite')

    const handleOpenModal = (mode: 'invite' | 'team') => {
        setModalContent(mode)
        open()
    }

    const ModalContent = modalContent === 'team' ? (
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
                        {data?.team?.members?.map((m) => (
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
                        <TextInput flex={1} label='Name' defaultValue={data?.team?.name || undefined} />
                        <Button variant='default' size='sm'>Изменить</Button>
                    </Group>
                    <Group>
                        <Textarea flex={1} label='Description' minRows={1} defaultValue={data?.team?.name || undefined} />
                        <Button variant='default' size='sm'>Изменить</Button>
                    </Group>
                    <Fieldset color='red' legend="Danger Zone">
                        <Text mb={8} size='md' fw={700}>Delete this team</Text>
                        <Text mb={24} size='sm'>Once you delete a team, there is no going back. Please be certain.</Text>
                        <Button color='red' variant='light'>Delete team</Button>

                    </Fieldset>
                </Stack>
            </Tabs.Panel>
        </Tabs >) : (
        <Box>
            <Title order={4}>Invite</Title>

        </Box>);

    if (!loading && !data?.team) {
        return <NotFoundError params={params} />
    }

    return (
        <Container fluid p={24}>
            <Flex component='header' mb={24} justify='space-between' align='center'>
                <Flex gap={8} align='center'>
                    <Avatar size='lg' src={data?.team?.avatar} alt={data?.team?.name} />
                    <Title style={{ mb: 2 }} order={2} component='p'>
                        {data?.team?.name}
                    </Title>
                </Flex>

                <Flex gap={8}>
                    <Button size='xs' href={`/dashboard/comic/add?teamId=${data?.team?.id}`} component={Link} variant='contain' leftSection={<IconPlus size={16} stroke={rem(2)} />}>{t('header.project')}</Button>
                    <Button size='xs' variant='outline' onClick={() => handleOpenModal('invite')}>{t('invite.button')}</Button>
                    <Button size='xs' variant='outline' leftSection={<IconUser size={16} stroke={rem(2)} />} onClick={() => handleOpenModal('team')} aria-label={t('manage team')}>
                        {data?.team?.members?.length}
                    </Button>
                </Flex>
            </Flex>
            <Box component='section'>
                {data?.team?.comics?.map(c => (
                    <ComicListItem
                        key={c.id}
                        data={{
                            title: c.title,
                            subtitle: c.alternativeTitles,
                            lastChange: dayjs(c.updatedAt).format('DD.MM.YYYY'),
                            cover: c.cover
                        }}
                        href={`/dashboard/comic/${c.id}`} />
                ))}
                {(data?.team?.comics?.length || 0) > 0 && <Title order={4}>Nothing to show</Title>}
                <Modal size='lg' lockScroll={false} opened={opened} onClose={close} title={modalContent === 'team' ?
                    t('team.header') : t('invite.header')}>
                    {ModalContent}
                </Modal>

            </Box>
        </Container >
    )
}

