import { Box, Card as MantineCard, Text, CardSection, rem, Title, UnstyledButton, Skeleton } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    href?: string;
    data?: {
        cover?: string;
        title?: string;
        id: string;
    } | null;
};

const cardWidth = 147;

export const Card = ({ data, href }: Props) => {
    return (
        <article className={'mantine-active'}>
            <UnstyledButton
                variant='transparent'
                className={'mantine-active'}
                href={href || `/comic/${data?.id}`}
                component={Link}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
                title={data?.title}
            >
                <MantineCard mb='sm'
                    radius='md'
                    shadow='md'
                    style={{ maxWidth: rem(cardWidth) }}
                    className='card'>
                    <CardSection
                        style={{
                            aspectRatio: '6/9',
                            borderRadius: 0.5,
                            overflow: 'hidden',
                        }}

                    >
                        <Image
                            blurDataURL={data?.cover}
                            style={{ verticalAlign: 'top', objectFit: 'cover' }}
                            alt=""
                            width={cardWidth}
                            height={cardWidth * 1.5}
                            src={(data?.cover) as string}
                        />
                    </CardSection>
                </MantineCard>
                <Box className='card-content' maw={cardWidth}>
                    <Title order={1}
                        lineClamp={2}
                        size='h6'
                    >
                        {data?.title}
                    </Title>
                </Box>
            </UnstyledButton>
        </article>
    )
}

export const CardSkeleton = () => {
    return (
        <div>
            <UnstyledButton
                variant='transparent'
                className={'mantine-active'}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
            >
                <MantineCard mb='sm'
                    radius='md'
                    shadow='md'
                    style={{ maxWidth: rem(cardWidth) }}
                    className='card'>
                    <CardSection
                        style={{
                            aspectRatio: '6/9',
                            borderRadius: 0.5,
                            overflow: 'hidden',
                        }}

                    >
                        <Skeleton
                            radius='md'
                            style={{ verticalAlign: 'top', objectFit: 'cover' }}
                            width={cardWidth}
                            height={cardWidth * 1.5}
                        />
                    </CardSection>
                </MantineCard>
                <Box className='card-content' maw={cardWidth}>
                    <Skeleton mt='md' h={14} w='90%' />
                    <Skeleton mt={4} h={14} w='50%'>  
                    </Skeleton>
                </Box>
            </UnstyledButton>
        </div>
    )
}