import { Box, Card as MantineCard, CardSection, Title, rem } from '@mantine/core';
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

// .card {
//     box - sizing: border - box;
//     & -media {
//         margin - bottom: 8px;
//     }
//     & -content {
//         padding: 8px;
//         display: -webkit - box;
//         overflow: hidden;
//         text - overflow: ellipsis;
//         -webkit - line - clamp: 2;
//         -webkit - box - orient: vertical;

//     }
// }


const cardWidth = 156;

export const Card = ({ data, href }: Props) => {
    return (
        <div>
            <MantineCard mb='sm' radius='md' shadow='md' style={{ maxWidth: rem(cardWidth) }} className={'card  mantine-active'} title={data?.title} href={`/comic/${data?.id}`} component={Link}>
                <CardSection
                    style={{
                        aspectRatio: '6/9',
                        width: rem(cardWidth),
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
            <Box className='card-content' w={cardWidth}>
                <Title order={5}
                    lineClamp={2}
                    size='h6'
                >
                    <Link href={href || `/comic/${data?.id}`}>{data?.title}</Link>
                </Title>
            </Box>
        </div>
    )
}
