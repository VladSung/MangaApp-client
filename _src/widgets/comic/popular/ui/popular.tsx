// import { Anchor, AppShellSection, Box, Group, Title } from '@mantine/core';
// import { ComicCard , ComicGrid } from '@src/entities/comic';
// import { getClient } from '@src/shared/lib/apollo/client';
// import { fetchTranslation } from '@src/shared/lib/i18n';
// import Link from 'next/link';

// import { popularComicsQuery } from '../api';

// export const ComicPopularWidget = async ({ lng }: { lng: string }) => {
//     const comicsData = await getClient().query({
//         query: popularComicsQuery,
//         variables: { paginate: { first: 20 } },
//         errorPolicy: 'all',
//     });

//     const { t } = await fetchTranslation(lng, 'index');

//     const List = comicsData?.data?.comic.popular?.edges?.map((edge) => (
//         <ComicCard key={edge?.node?.id} data={edge?.node} />
//     ));

//     return (
//         <AppShellSection component="section" pt="lg">
//             <Group mb="md">
//                 <Title order={2}>{t('popular')}</Title>
//                 <Anchor href="/popular" component={Link}>
//                     {t('more')}
//                 </Anchor>
//             </Group>
//             <ComicGrid>{List}</ComicGrid>
//         </AppShellSection>
//     );
// };

import {
    AppShell,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    GridCol,
    Group,
    Paper,
    Text,
    Title,
} from '@mantine/core';
import { ComicCard, ComicGrid } from '@src/entities/comic';
import { getClient } from '@src/shared/lib/apollo/client';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { IconBookmark, IconChevronRight, IconStar, IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';

import { popularComicsQuery } from '../api';

export const ComicPopularWidget = async ({ lng }: { lng: string }) => {
    const comicsData = await getClient().query({
        query: popularComicsQuery,
        variables: { paginate: { first: 20 } },
        errorPolicy: 'ignore',
    });

    const { t } = await fetchTranslation(lng, 'index');

    const PopularComics = comicsData?.data?.comic.popular?.edges?.map((edge) => (
        <ComicCard key={edge?.node?.id} data={edge?.node} />
    ));

    const SectionWithMore = ({
        title,
        href,
        children,
    }: {
        title: string;
        href: string;
        children: React.ReactNode;
    }) => (
        <Box component="section" mb="xl">
            <Group align="center" mb="md">
                <Title order={2}>{title}</Title>
                <Button
                    component={Link}
                    href={href}
                    variant="subtle"
                    rightSection={<IconChevronRight size={16} />}
                >
                    {t('seeMore')}
                </Button>
            </Group>
            {children}
        </Box>
    );

    const FeaturedSection = ({
        title,
        icon,
        children,
        href,
    }: {
        title: string;
        href: string;
        icon: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <Paper p="md" withBorder>
            <Group align="center" mb="sm">
                <Group>
                    {icon}
                    <Title order={3}>{title}</Title>
                </Group>
                <Button
                    component={Link}
                    href={href}
                    variant="subtle"
                    rightSection={<IconChevronRight size={16} />}
                >
                    {t('viewAll')}
                </Button>
            </Group>
            {children}
            {/* Add featured content here */}
        </Paper>
    );

    return (
        <AppShell padding="md">
            <Container size="xl">
                <Box mb="xl">
                    <Title order={1} ta="center" mb="sm">
                        {t('welcomeMessage')}
                    </Title>
                    <Text ta="center" c="dimmed" mb="lg">
                        {t('subWelcomeMessage')}
                    </Text>
                    <Group justify="center">
                        <Button component={Link} href="/browse" variant="filled" size="lg">
                            {t('browseAllComics')}
                        </Button>
                        <Button component={Link} href="/random" variant="outline" size="lg">
                            {t('randomComic')}
                        </Button>
                    </Group>
                </Box>

                <Divider my="xl" />

                <SectionWithMore title={t('popular')} href="/popular">
                    <ComicGrid>{PopularComics || null}</ComicGrid>
                </SectionWithMore>

                <SectionWithMore title={t('latestUpdates')} href="/latest">
                    <ComicGrid>{PopularComics || null}</ComicGrid>
                    {/* Add LatestUpdatesGrid component here */}
                </SectionWithMore>

                <SectionWithMore title={t('topRated')} href="/top-rated">
                    <ComicGrid>{PopularComics || null}</ComicGrid>
                    {/* Add TopRatedGrid component here */}
                </SectionWithMore>

                <SectionWithMore title={t('genres')} href="/genres">
                    <ComicGrid>{PopularComics || null}</ComicGrid>
                    {/* Add GenreGrid component here */}
                </SectionWithMore>

                <Grid gutter="md" mb="xl">
                    <GridCol span={6}>
                        <FeaturedSection
                            title={t('editorsPick')}
                            icon={<IconStar size={20} />}
                            href="/editors-pick"
                        >
                            <ComicGrid>{PopularComics || null}</ComicGrid>
                        </FeaturedSection>
                    </GridCol>
                    <GridCol span={6}>
                        <FeaturedSection
                            title={t('mostBookmarked')}
                            icon={<IconBookmark size={20} />}
                            href="/most-bookmarked"
                        >
                            <ComicGrid>{PopularComics || null}</ComicGrid>
                        </FeaturedSection>
                    </GridCol>
                </Grid>

                <Box mb="xl">
                    <Title order={2} mb="md">
                        {t('trendingTags')}
                    </Title>
                    <Group>
                        {['Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Drama'].map((tag) => (
                            <Badge key={tag} size="lg" variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </Group>
                </Box>

                <Box mb="xl">
                    <Title order={2} mb="md">
                        {t('featuredCreators')}
                    </Title>
                    <Grid>
                        {[1, 2, 3].map((creator) => (
                            <GridCol key={creator} span={4}>
                                <Paper p="md" withBorder>
                                    <Group>
                                        <Avatar size="lg" radius="xl" />
                                        <Box>
                                            <Text fw={500}>Creator Name</Text>
                                            <Text size="sm" c="dimmed">
                                                Popular Series
                                            </Text>
                                        </Box>
                                    </Group>
                                </Paper>
                            </GridCol>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    <Title order={2} mb="md">
                        {t('communitySpotlight')}
                    </Title>
                    {/* Add Community Spotlight content here */}
                </Box>
            </Container>
        </AppShell>
    );
};
