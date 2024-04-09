'use client'
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { ActionIcon, Box, Button, ButtonGroup, Group } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from "next/navigation"

import { comicQuery } from "@/app/shared/api/queries"
import { useTranslation } from "@/app/shared/lib/i18n/client"

import classes from './header.module.css'

const parseComic: (path: string) => ({
    id: string | undefined
    volume: string | undefined
    chapter: string | undefined
}) = (path: string) => {
    const comic = path.split('comic/')?.[1]?.split('/ch/')
    const chapter = comic?.[1]?.split('/')

    return {
        id: comic?.[0],
        volume: chapter?.[0],
        chapter: chapter?.[1]
    }
}

export const Navigation = ({ lng }: { lng: string }) => {
    const pathname = usePathname()
    const { t } = useTranslation(lng, 'header')
    const comic = parseComic(pathname)
    const { data } = useQuery(comicQuery, { variables: { id: comic.id || '' } })

    if (comic.volume && comic.chapter && comic.id) {
        return (<>
            <div className={classes.logoBox}>
                <Box>
                    <ActionIcon size='xl' radius='sm' variant="subtle" href="/" component={Link}>
                        <Image width={32} height={32} src='/assets/logo.svg' alt='logo' />
                    </ActionIcon>
                </Box>
                <Button visibleFrom='xs' variant="subtle" c='initial' component={Link} href={`/comic/${comic.id}`}>
                    {data?.comic?.title}
                </Button>
            </div>
            <ButtonGroup >
                <Button disabled={Number(comic.chapter || 0) - 1 < 1} component={(Number(comic.chapter || 0) - 1 >= 1) ? Link : undefined} variant="default" href={`/comic/${comic.id}/ch/${comic.volume}/${Number(comic.chapter) - 1}`}>&lt;</Button>
                <Button variant="default">
                    Vol. {comic.volume} Ch. {comic.chapter}
                </Button>
                <Button variant="default" href={`/comic/${comic.id}/ch/${comic.volume}/${Number(comic.chapter) + 1}`} component={Link}>&gt;</Button>
            </ButtonGroup>
        </>)
    }

    return (<>
        <Box>
            <ActionIcon size='xl' radius='sm' variant="subtle" href="/" component={Link}>
                <Image width={32} height={32} src='/assets/logo.svg' alt='logo' />
            </ActionIcon>
        </Box>
        <Group h="100%" gap={0} visibleFrom="md">
            <Button c='initial' variant="subtle" component={Link} href="/popular">
                {t('popular')}
            </Button>
            <Button c='initial' variant="subtle" component={Link} href="/comic">
                {t('catalog')}
            </Button>
            <Button c='initial' leftSection={<IconSearch stroke={3} size={13} />} variant="subtle" component={Link} href="#">
                {t('search')}
            </Button>
        </Group>
    </>
    )
}
