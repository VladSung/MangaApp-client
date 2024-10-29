'use client';

import { Box, Card, CardSection, Flex, Skeleton, Text, Title } from '@mantine/core';

export const ListItemSkeleton = () => {
    return (
        <Card
            radius="sm"
            style={{
                display: 'flex',
                flex: '1 0 auto',
                gap: 3,
            }}
        >
            <CardSection style={{ padding: 2 }}>
                <Flex gap={16} direction="row">
                    <Skeleton
                        w={70.7}
                        style={{ height: 'auto', aspectRatio: '180/270' }}
                        variant="rounded"
                        radius="sm"
                    />
                    <Box style={{ flexGrow: 1 }}>
                        <Skeleton mt={4}>
                            <Title order={3} size="h4" lineClamp={1}>
                                Title
                            </Title>
                        </Skeleton>
                        <Skeleton mt="md">
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
};
