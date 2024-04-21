import { Anchor, AppShellSection, Group, Title } from "@mantine/core"
import Link from "next/link"

import { ComicCard } from "@/app/entities/comic"
import { getClient } from "@/app/shared/lib/apollo/client"
import { useTranslation } from "@/app/shared/lib/i18n"

import { popularComicsQuery } from "./queries"

const Popular = async ({ lng }: { lng: string }) => {
    const comicsData = await getClient().query({ query: popularComicsQuery, variables: { paginate: { take: 20 } } })
    const { t } = await useTranslation(lng, 'index')

    const Lists = comicsData?.data?.popularComics?.map(c => <ComicCard key={c?.id} data={c} />)

    return (
        <AppShellSection component='section' pt='lg'>
            <Group mb='md'>
                <Title order={2} >
                    {t('popular')}
                </Title>
                <Anchor href='/popular' component={Link}>{t('more')}</Anchor>
            </Group>
            <Group align='stretch'>
                {Lists}
            </Group>
        </AppShellSection>
    )
}

export default Popular
