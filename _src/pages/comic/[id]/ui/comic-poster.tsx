import { Box, Button,Card, CardSection, Flex } from '@mantine/core';
import { AddBookmark } from '@src/features/bookmark';
import { ComicInfoQuery } from '@src/shared/api';
import { fetchTranslation } from '@src/shared/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

import { NotifyButton } from './notify-button';
import classes from './styles.module.css';

export const ComicPosterWithActions = async ({
    lng,
    comic,
}: {
    lng: string;
    comic: NonNullable<ComicInfoQuery['comic']['one']>;
}) => {
    const { t } = await fetchTranslation(lng, 'comic/id');
    const lastReadChapter = comic.lastReadChapter;

    return (
        <Box className={classes.posterWrapper}>
            <Box className={classes.posterBackground}>
                <div className={classes.overlay}></div>
                <Image src={comic?.cover} width={40} height={40 * 1.5} alt="" />
            </Box>
            <Card className={classes.poster}>
                <CardSection>
                    <Image
                        className={classes.posterImage}
                        src={comic?.cover}
                        width={270}
                        height={270 * 1.5}
                        alt=""
                    />
                </CardSection>
            </Card>
            <Flex className={classes.comicActions}>
                {comic.chapters?.pageInfo.totalCount ? (
                    <Button
                        component={Link}
                        href={
                            lastReadChapter?.id
                                ? `/comic/${comic.id}/ch/${lastReadChapter?.volume}/${comic.lastReadChapter?.number}`
                                : `/comic/${comic.id}/ch/1/1`
                        }
                        size="sm"
                        variant="contained"
                        style={{ flexGrow: 1 }}
                    >
                        {lastReadChapter?.id
                            ? `${t('continue')} Vol. ${lastReadChapter?.volume} Ch. ${lastReadChapter?.number}`
                            : t('start-reading')}
                    </Button>
                ) : (
                    <NotifyButton lng={lng} />
                )}
                <AddBookmark lng={lng} comicId={comic.id} bookmarkTitle={'read'} />
            </Flex>
            <Button
                mb={16}
                component={Link}
                href={`/dashboard/comic/${comic.id}`}
                size="xs"
                variant="default"
                fullWidth
                color="primary"
            >
                {t('manage')}
            </Button>
        </Box>
    );
};
