'use client'
import {
    Anchor,
    Box,
    Button,
    Flex,
    Group,
    GroupProps,
    Modal,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MeProfileInfoQuery, TeamInfoQuery } from '@src/shared/api';
import { Avatar } from '@src/shared/ui/Avatar';
import {
    IconChevronRight,
    IconExclamationCircle,
    IconLoader,
    IconShare3,
    IconWorld,
} from '@tabler/icons-react';
import { ElementType, Suspense } from 'react';

export const ProfileHeader = ({
    user,
    children,
    ...props
}: GroupProps & {
    user: NonNullable<MeProfileInfoQuery['user']['me'] | TeamInfoQuery['team']['one']>;
}) => {
    const [opened, { close, open }] = useDisclosure(false);

    const links = user?.socialLinks?.map((url) => {
        return [IconWorld, url];
    }) satisfies [ElementType, string][] | undefined;

    const DescriptionsWithLinks = (
        <Flex direction="column" align="flex-start" gap="xs">
            <Group
                gap={4}
                wrap="nowrap"
                onClick={open}
                className="mantine-active"
                component={UnstyledButton}
            >
                <Text span hiddenFrom="md" size="xs" lineClamp={2}>
                    {user?.description ?? 'More info'}
                </Text>
                <Text visibleFrom="md" span size="sm" lineClamp={2}>
                    {user?.description ?? 'More info'}
                </Text>
                <Group gap={4} wrap="nowrap">
                    <IconChevronRight size={16} />
                </Group>
            </Group>
            {Boolean(links?.length) && (
                <Group
                    onClick={open}
                    gap="xs"
                    className="mantine-active"
                    component={UnstyledButton}
                >
                    <Group gap="sm">
                        <Anchor size="sm">{links?.[0]?.[1]}</Anchor>
                        {links?.length && <Text size="sm"> {`and ${links.length - 1} links`}</Text>}
                    </Group>
                </Group>
            )}
            <Box visibleFrom="md">{children}</Box>
        </Flex>
    );

    return (
        <Box align="center" wrap="nowrap" gap="xl" {...props}>
            <Group wrap="nowrap" style={{ alignSelf: 'flex-start' }} align="flex-start">
                <Box visibleFrom="md">
                    <Avatar src={user?.avatar} size="2xl" />
                </Box>
                <Box hiddenFrom="md">
                    <Avatar src={user?.avatar} size="2lg" />
                </Box>
                <div style={{ flexGrow: 1 }}>
                    <Group wrap="nowrap" mb="xs" gap="xs">
                        <Title size="h1">{user?.name}</Title>
                    </Group>
                    <Group mb="sm" gap="xs" justify="flex-start">
                        {'publicId' in user && (
                            <Text
                                size="xs"
                                c="dimmed"
                                style={{ textAlign: 'left' }}
                                w={{ base: '100%', sm: 'max-content' }}
                                inline
                            >
                                {user.publicId}
                            </Text>
                        )}
                        <Text size="xs" c="dimmed" inline>
                            32K followers
                        </Text>
                        <Text size="xs" c="dimmed" inline>
                            32K follows
                        </Text>
                    </Group>
                    <Box visibleFrom="md">{DescriptionsWithLinks}</Box>
                </div>
            </Group>
            <Box mt="xs" hiddenFrom="md">
                <Box my="md">{DescriptionsWithLinks}</Box>
                {children}
            </Box>
            <Modal
                size="xl"
                title={
                    <Text fw={700} size="lg">
                        Info
                    </Text>
                }
                opened={opened}
                onClose={close}
            >
                <Text size="sm" mb="xl" maw="700px">
                    {user?.description}
                </Text>
                {Boolean(links?.length) && (
                    <>
                        <Text fw={700} size="lg" inline mb="xs">
                            Links
                        </Text>
                        <div>
                            {links?.map(([Icon, url]) => (
                                <Group key={url} gap="sm" mb="xs">
                                    <Suspense fallback={<IconLoader size={16} />}>
                                        <Icon size={16} />
                                    </Suspense>
                                    <Anchor href={url}>{url}</Anchor>
                                </Group>
                            ))}
                        </div>
                    </>
                )}
                <Group mt="lg">
                    <Button
                        style={{ flexGrow: 1 }}
                        variant="default"
                        leftSection={<IconShare3 size={16} />}
                    >
                        Share
                    </Button>
                    <Button
                        style={{ flexGrow: 1 }}
                        variant="default"
                        leftSection={<IconExclamationCircle size={16} />}
                    >
                        Report
                    </Button>
                </Group>
            </Modal>
        </Box>
    );
};


