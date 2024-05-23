'use client';

import { Avatar, Box, Card, CardSection, Flex, Skeleton, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    data: { title: string; id: string; subtitle?: string | null; lastChange?: string | null; cover: string };
    children?: React.ReactNode;
    href?: string;
    onClick?: () => void
};

export const ListItem = ({
    children,
    onClick,
    href,
    data: { lastChange, id, title, subtitle, cover },
}: Props) => {
    return (
        <Card
            href={href || `/comic/${id}`}
            onClick={onClick}
            component={Link}
            className='mantine-active'
            radius='sm'
            style={{
                display: 'flex',
                flex: '1 0 auto',
                gap: 3,
            }}
        >
            <CardSection style={{ padding: 2 }}>
                <Flex gap={16} direction='row'>
                    <Avatar
                        w={70.7}
                        style={{ height: 'auto', aspectRatio: '180/270' }}
                        variant="rounded"
                        radius='sm'
                    >
                        <Image
                            loading="lazy"
                            style={{ objectFit: 'cover', height: 'auto', aspectRatio: '180/270', minWidth: 70.7, width: '100%', maxWidth: 180, maxHeight: 270 }}

                            height={270}
                            width={180}
                            src={cover}
                            alt=""
                        />
                    </Avatar>
                    <Box style={{ flexGrow: 1 }}>
                        <Title
                            order={3}
                            size='h4'
                            lineClamp={1}
                        >
                            {title}
                        </Title>
                        <Text
                            size="xs"
                            component="p"
                            style={{
                                width: 'auto',
                                WebkitLineClamp: '1',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {subtitle}
                        </Text>
                        <Text size='xs'>{lastChange}</Text>
                    </Box>
                </Flex>
            </CardSection>
            {children}
        </Card>
    );
};

export const SkeletonListItem = () => {
    return (
        <Card
            radius='sm'
            style={{
                display: 'flex',
                flex: '1 0 auto',
                gap: 3,
            }}
        >
            <CardSection style={{ padding: 2 }}>
                <Flex gap={16} direction='row'>
                    <Skeleton
                        w={70.7}
                        style={{ height: 'auto', aspectRatio: '180/270' }}
                        variant="rounded"
                        radius='sm'
                    />
                    <Box style={{ flexGrow: 1 }}>
                        <Skeleton mt={4}><Title
                            order={3}
                            size='h4'
                            lineClamp={1}
                        >
                            Title
                        </Title></Skeleton>
                        <Skeleton mt='md'>
                            <Text
                                size="xs"
                                component="p"
                                style={{
                                    width: 'auto',
                                    WebkitLineClamp: '1',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                Description
                            </Text>
                        </Skeleton>
                    </Box>
                </Flex>
            </CardSection>
        </Card>
    );
}