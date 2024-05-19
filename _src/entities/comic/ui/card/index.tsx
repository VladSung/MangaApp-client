import { Box, Card as MantineCard, CardSection, rem, Title, UnstyledButton } from '@mantine/core';
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
            >
                <MantineCard mb='sm'
                    radius='md'
                    shadow='md'
                    style={{ maxWidth: rem(cardWidth) }}
                    className='card'
                    title={data?.title}>
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
