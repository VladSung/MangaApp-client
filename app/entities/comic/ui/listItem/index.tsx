'use client';

import { Avatar, Box, Card, CardSection, Flex, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    data: { title: string; subtitle?: string | null; lastChange?: string | null; cover: string };
    children?: React.ReactNode;
    href: string;
};

export const ListItem = ({
    children,
    href,
    data: { lastChange, title, subtitle, cover },
}: Props) => {
    return (
        <Card
            href={href}
            component={Link}
            className='mantine-active'
            radius='sm'
            style={{
                display: 'flex',
                maxWidth: '50%',
                flex: '1 0 auto',
                gap: 3,
            }}
        >
            <CardSection style={{ padding: 2 }}>
                <Flex gap={16} direction='row'>
                    <Avatar
                        style={{ height: 'auto', aspectRatio: '180/270', minWidth: 70.7, width: '100%', maxWidth: 180, maxHeight: 270 }}
                        variant="rounded"
                        radius='sm'
                    >
                        <Image
                            loading="lazy"
                            style={{ objectFit: 'cover' }}
                            height={270}
                            width={180}
                            src={cover}
                            alt=""
                        />
                    </Avatar>
                    <Box>
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
