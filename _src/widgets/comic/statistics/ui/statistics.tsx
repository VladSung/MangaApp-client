import { Badge, Group, Text } from '@mantine/core';
import { RateButton } from '@src/features/comic/rate';
import { ComicInfoQuery, MaturityRatings } from '@src/shared/api';
import { IconBookmarksFilled, IconEyeFilled } from '@tabler/icons-react';

export const Statistics = ({
    lng,
    comic,
}: {
    lng: string;
    comic: NonNullable<ComicInfoQuery['comic']['one']>;
}) => {
    const formatter = Intl.NumberFormat(lng, { notation: 'compact' });

    return (
        <Group align="center">
            <Group gap={4}>
                <Badge
                    size="md"
                    variant="light"
                    color={comic.maturityRating === MaturityRatings.Everyone ? undefined : 'red'}
                >
                    {comic.maturityRating}
                </Badge>
            </Group>
            <Group gap={4}>
                <IconEyeFilled size={14} />
                <Text inline span size="md" tt="uppercase">
                    {formatter.format(comic?.usersReadHistory?.pageInfo.totalCount || 0)}
                </Text>
            </Group>
            <Group gap={4}>
                <IconBookmarksFilled size={14} />
                <Text inline span size="md" tt="uppercase">
                    {formatter.format(comic?.bookmarks?.pageInfo.totalCount || 0)}
                </Text>
            </Group>
            <Group align="center" gap={4}>
                <Text component="span" fw={700}>
                    {new Date(comic?.createdAt).getFullYear()}
                </Text>
                <Text component="span" size="sm">
                    {`[${comic?.status}]`}
                </Text>
            </Group>
            <Group ml="auto" gap={4}>
                <RateButton
                    rating={comic.rating?.rating}
                    totalCount={comic.rating?.totalCount}
                    comicId={comic?.id}
                    lng={lng}
                />
            </Group>
        </Group>
    );
};
