import Image from 'next/image';
import Link from 'next/link';

import { Box, Card as MantineCard, Title } from '@mantine/core';

type Props = {
    data?: {
        cover?: string;
        title?: string;
        id: string;
    };
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

export const Card = ({ data }: Props) => {
    return (
        <Box>
            <MantineCard radius='md' shadow='md' style={{ maxWidth: cardWidth }} className={'card  mantine-active'} title={data?.title} href={`/comic/${data?.id}`} component={Link}>
                <MantineCard.Section
                    style={{
                        aspectRatio: '6/9',
                        width: cardWidth,
                        borderRadius: 0.5,
                        overflow: 'hidden',
                    }}

                >
                    <Image
                        blurDataURL={data?.cover}
                        style={{ verticalAlign: 'top' }}
                        alt=""
                        width={cardWidth}
                        height={cardWidth * 1.5}
                        src={(data?.cover) as string}
                    />
                </MantineCard.Section>
            </MantineCard>
            <Box className='card-content' w={cardWidth}>
                <Title order={5}
                    lineClamp={2}
                    size='h6'
                >
                    <Link href={`/comic/${data?.id}`}>{data?.title}</Link>
                </Title>
            </Box>
        </Box>
    );
};
