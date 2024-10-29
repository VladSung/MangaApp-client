import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Group,
    Paper,
    Spoiler,
    Stack,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Text,
    Title,
    UnstyledButton,
} from '@mantine/core';
import { ComicInfoQuery } from '@src/shared/api';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { ChaptersList } from '@src/widgets/chapter';
import { Statistics } from '@src/widgets/comic/statistics';
import { CommentsList } from '@src/widgets/comment';
import { IconChevronDown, IconChevronUp, IconCircleChevronDown } from '@tabler/icons-react';
import Link from 'next/link';

import classes from './styles.module.css';

type ComicContentProps = {
    lng: string;
    comic: NonNullable<ComicInfoQuery['comic']['one']>;
};

// export const ComicContent = async ({ comic, lng }: ComicContentProps) => {
//     const { t } = await fetchTranslation(lng, 'comic/id');

//     return (
//         <Tabs defaultValue="chapters" style={{ width: '100%' }}>
//             <Divider mb="sm" />
//             <Box pb="lg">
//                 <Spoiler maxHeight={96} showLabel="Show more" hideLabel="Hide">
//                     <Text
//                         component="pre"
//                         style={{
//                             textWrap: 'balance',
//                             whiteSpace: 'pre-wrap',
//                             fontFamily: 'var(--mantine-font-family)',
//                         }}
//                     >
//                         {comic.description}
//                     </Text>
//                 </Spoiler>
//             </Box>
//             <Box mb="md">
//                 {comic.genres?.map((g) => (
//                     <Button
//                         key={g?.id}
//                         href={`/comic?genre=${g?.id}`}
//                         size="compact-xs"
//                         component={Link}
//                         style={{ cursor: 'pointer', margin: 4 }}
//                         variant="default"
//                     >
//                         {g?.title}
//                     </Button>
//                 ))}
//                 {comic.tags?.map((g) => (
//                     <Button
//                         key={g?.id}
//                         href={`/comic?tag=${g?.id}`}
//                         size="compact-xs"
//                         component={Link}
//                         style={{ cursor: 'pointer', margin: 4 }}
//                         variant="default"
//                     >
//                         {g?.title}
//                     </Button>
//                 ))}
//             </Box>
//             <Box className={classes.creators} mb="md">
//                 <Title order={2} size="h5" mb="sm">
//                     {t('creators')}
//                 </Title>
//                 <Stack>
//                     {
//                         <UnstyledButton
//                             className="mantine-active"
//                             key={comic?.team?.id}
//                             component={Link}
//                             href={`/team/${comic?.team?.id}`}
//                         >
//                             <Group align="center" gap="xs">
//                                 <Avatar src={comic?.team?.avatar} size="md" />
//                                 <div>
//                                     <Text size="md">{comic?.team?.name}</Text>
//                                 </div>
//                             </Group>
//                         </UnstyledButton>
//                     }
//                 </Stack>
//             </Box>

//             <TabsList defaultValue="chapters">
//                 <TabsTab style={{ fontSize: '14px', fontWeight: 700 }} value="chapters">
//                     {t('chapter-list')}
//                 </TabsTab>
//                 <TabsTab style={{ fontSize: '14px', fontWeight: 700 }} value="comments">
//                     {t('comments')}
//                 </TabsTab>
//             </TabsList>
//             <TabsPanel value="chapters" py="xs">
//                 <ChaptersList lng={lng} comic={comic} />
//             </TabsPanel>
//             <TabsPanel value="comments">
//                 <CommentList comicId={comic.id} />
//             </TabsPanel>
//         </Tabs>
//     );
// };

export const ComicContent = async ({ comic, lng }: ComicContentProps) => {
    const { t } = await fetchTranslation(lng, 'comic/id');

    return (
        <Stack gap="md">
            <Box style={{ flex: 1 }}>
                <Title order={1} style={{ lineHeight: 0.9 }} size="h1" mb="xs">
                    {comic.title}
                </Title>
                <Text size="xs" mb="xs">
                    {comic.alternativeTitles}
                </Text>
                <Statistics lng={lng} comic={comic} />
            </Box>
            <Card withBorder padding="sm">
                <Spoiler maxHeight={100} showLabel={t('show-more')} hideLabel={t('hide')}>
                    <Text
                        size="sm"
                        component="pre"
                        style={{
                            textWrap: 'balance',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'var(--mantine-font-family)',
                        }}
                    >
                        {comic.description}
                    </Text>
                </Spoiler>
            </Card>
            <Box>
                <Title order={3} size="h5" mb="xs" fw={600}>
                    {t('genres-and-tags')}
                </Title>
                <Group gap="xs">
                    {comic.genres?.map((g) => (
                        <Button
                            key={g?.id}
                            href={`/comic?genre=${g?.id}`}
                            size="compact-xs"
                            component={Link}
                            variant="light"
                        >
                            {g?.title}
                        </Button>
                    ))}
                    {comic.tags?.map((g) => (
                        <Button
                            key={g?.id}
                            href={`/comic?tag=${g?.id}`}
                            size="compact-xs"
                            component={Link}
                            variant="subtle"
                        >
                            {g?.title}
                        </Button>
                    ))}
                </Group>
            </Box>

            <Box>
                <Title order={3} size="h5" mb="xs" fw={600}>
                    {t('creators')}
                </Title>
                <UnstyledButton component={Link} href={`/team/${comic?.team?.id}`}>
                    <Group align="center" gap="sm">
                        <Avatar src={comic?.team?.avatar} size="md" />
                        <Text size="sm" fw={500}>
                            {comic?.team?.name}
                        </Text>
                    </Group>
                </UnstyledButton>
            </Box>
            <Box mb="md">
                <ChaptersList lng={lng} comic={comic} />
            </Box>
            <CommentsList comicId={comic.id} creatorTeamId={comic?.team?.id} />
        </Stack>
    );
};
