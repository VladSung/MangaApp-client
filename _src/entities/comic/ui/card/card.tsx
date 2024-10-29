'use client';
import {
    AspectRatio,
    Box,
    Card as MantineCard,
    CardSection,
    rem,
    Text,
    UnstyledButton,
} from '@mantine/core';
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
        <article>
            <UnstyledButton
                className={'mantine-active'}
                component={Link}
                href={href || `/comic/${data?.id}`}
                style={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: theme.radius.md,
                    overflow: 'hidden',
                })}
            >
                <MantineCard
                    component={AspectRatio}
                    shadow="sm"
                    p={0}
                    w="100%"
                    ratio={6 / 9}
                    radius="md"
                    style={{ width: '100%' }}
                >
                    <div>
                        <Image
                            src={data?.cover as string}
                            alt={data?.title || ''}
                            fill
                            sizes="280px"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </MantineCard>
                <Box mt="xs">
                    <Text size="sm" fw={500} lineClamp={2}>
                        {data?.title}
                    </Text>
                </Box>
            </UnstyledButton>
        </article>
    );
};
// export const Card = ({ data, href }: Props) => {
//     return (
//         <article className={'mantine-active'}>
//             <UnstyledButton
//                 variant="transparent"
//                 className={'mantine-active'}
//                 href={href || `/comic/${data?.id}`}
//                 component={Link}
//                 style={{ borderRadius: 'var(--mantine-radius-md)' }}
//                 title={data?.title}
//             >
//                 <MantineCard
//                     mb="sm"
//                     radius="md"
//                     shadow="md"
//                     style={{ maxWidth: rem(cardWidth) }}
//                     className="card"
//                 >
//                     <CardSection
//                         style={{
//                             aspectRatio: '6/9',
//                             borderRadius: 0.5,
//                             overflow: 'hidden',
//                         }}
//                     >
//                         <Image
//                             blurDataURL={data?.cover}
//                             style={{ verticalAlign: 'top', objectFit: 'cover' }}
//                             alt=""
//                             width={cardWidth}
//                             height={cardWidth * 1.5}
//                             src={data?.cover as string}
//                         />
//                     </CardSection>
//                 </MantineCard>
//                 <Box className="card-content" maw={cardWidth}>
//                     <Title order={1} lineClamp={2} size="h6">
//                         {data?.title}
//                     </Title>
//                 </Box>
//             </UnstyledButton>
//         </article>
//     );
// };
