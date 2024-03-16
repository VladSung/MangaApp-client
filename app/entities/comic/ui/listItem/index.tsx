'use client';

import { Avatar, Box, Card, CardSection, Flex, Group, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    data: { title: string; subtitle?: string; lastChange?: string | null; cover: string };
    children?: React.ReactNode;
    href: any | string;
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
                width: 300,
                gap: 3,
            }}
        >
            <CardSection style={{ padding: 2 }}>
                <Flex gap={16} direction='row'>
                    <Avatar
                        style={{ height: 106, aspectRatio: '180/270', width: 70.7 }}
                        variant="rounded"
                        radius='sm'
                    >
                        <Image
                            loading="lazy"
                            height={106}
                            width={70.7}
                            src={cover}
                            alt=""
                        />
                    </Avatar>
                    <Box>
                        <Title
                            order={3}
                            size='h4'
                            style={{
                                mb: 1,
                                textWrap: 'balance',
                                WebkitLineClamp: '2',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                            }}
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
