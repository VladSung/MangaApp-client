'use client'
import { UnstyledButton, Text, Anchor, Box, Button, Flex, Group, GroupProps, Modal, Title } from '@mantine/core';
import { IconChevronRight, IconShare3, IconWorld, IconExclamationCircle, IconLoader } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Avatar } from '@src/shared/ui/Avatar';
import { User } from '@src/shared/api/graphql';
import { ElementType, Suspense } from 'react';

export const ProfileHeader = ({ user, children, ...props }: GroupProps & { user?: Partial<Pick<User, 'name' | 'avatar' | 'description'>> | null }) => {
    const [opened, { close, open }] = useDisclosure(false);

    const links: [ElementType, string][] = [
        ['twitter', 'https://twitter.com/johndoe'],
        ['github', 'https://github.com/johndoe'],
        ['youtube', 'https://youtube.com/johndoe'],
        ['instagram', 'https://instagram.com/johndoe']
    ].map(([name, url]) => {
        const Icon = IconWorld;
        return [Icon, url]
    });

    return (
        <Box align="center" wrap='nowrap' gap="xl" {...props} >
            <Group wrap='nowrap' style={{ alignSelf: 'flex-start' }} align='flex-start'>
                <Avatar src={user?.avatar} size="2xl" />
                <div style={{ flexGrow: 1 }}>
                    <Group wrap='nowrap' mb='xs' gap="xs">
                        <Title size='h1' component='p' fw={700}>
                            {user?.name}
                        </Title>
                    </Group>
                    <Group wrap='nowrap' mb='sm' gap="xs">
                        <Text size="sm" fw={500} inline>
                            @{user?.name}
                        </Text>
                        <Text size="sm" fw={500} inline>
                            32K followers
                        </Text>
                        <Text size="sm" fw={500} inline>
                            32K subscriptions
                        </Text>
                    </Group>
                    <Flex direction='column' align='flex-start' gap='xs'>
                        <Group gap={4} maw='min(700px, 80%)' w='100%' wrap='nowrap' onClick={open} className='mantine-active' component={UnstyledButton}>
                            <Text inline size="sm" lineClamp={1}>
                                {user?.description ?? 'More info'}
                            </Text>
                            <IconChevronRight stroke={1.5} size={14} />
                        </Group>
                        <Group onClick={open} gap='xs' className='mantine-active' component={UnstyledButton}>
                            <Group gap='sm' mb='xs'>
                                <Anchor>{links[0][1]}</Anchor>
                                {links.length && <Text size='sm'> and {links.length - 1} links</Text>}
                            </Group>
                        </Group>
                        {children}
                    </Flex>
                </div>
            </Group>
            <Modal size='lg' title={<Text fw={700} size='lg'>Info</Text>} opened={opened} onClose={close}>
                <Text size="sm" mb='xl' maw='700px'>
                    {user?.description}
                </Text>
                <Text fw={700} size='lg' inline mb='xs'>Links</Text>
                <div>
                    {links.map(([Icon, url]) => (
                        <Group key={url} gap='sm' mb='xs'>
                            <Suspense fallback={<IconLoader size={16} />}>
                                <Icon size={16} />
                            </Suspense>
                            <Anchor href={url}>{url}</Anchor>
                        </Group>
                    ))}
                </div>
                <Group mt='lg'>
                    <Button style={{ flexGrow: 1 }} variant='default' leftSection={<IconShare3 size={16} />}>Share</Button>
                    <Button style={{ flexGrow: 1 }} variant='default' leftSection={<IconExclamationCircle size={16} />}>Report</Button>
                </Group>
            </Modal>
        </Box >
    );
};


