import {
    Box,
    Card as MantineCard,
    CardSection,
    rem,
    Skeleton,
    UnstyledButton,
} from '@mantine/core';

const cardWidth = 147;

export const CardSkeleton = () => {
    return (
        <div>
            <UnstyledButton
                variant="transparent"
                className={'mantine-active'}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
            >
                <MantineCard
                    mb="sm"
                    radius="md"
                    shadow="md"
                    style={{ maxWidth: rem(cardWidth) }}
                    className="card"
                >
                    <CardSection
                        style={{
                            aspectRatio: '6/9',
                            borderRadius: 0.5,
                            overflow: 'hidden',
                        }}
                    >
                        <Skeleton
                            radius="md"
                            style={{ verticalAlign: 'top', objectFit: 'cover' }}
                            width={cardWidth}
                            height={cardWidth * 1.5}
                        />
                    </CardSection>
                </MantineCard>
                <Box className="card-content" maw={cardWidth}>
                    <Skeleton mt="md" h={14} w="90%" />
                    <Skeleton mt={4} h={14} w="50%"></Skeleton>
                </Box>
            </UnstyledButton>
        </div>
    );
};
