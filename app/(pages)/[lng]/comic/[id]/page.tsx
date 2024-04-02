import { AppShellMain } from '@mantine/core';
import { headers } from 'next/headers'
import { userAgentFromString } from 'next/server';

import { getComic, getComicMeta } from "@/app/entities/comic/queries";
import { useTranslation } from "@/app/shared/lib/i18n";
import { NotFoundError } from '@/app/widgets/not-found';

import ComicMobile from "./comic-mobile";
import ComicDesktopPage from "./comic-pc";

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

export async function generateMetadata({ params: { id } }: Props) {
    const c = await getComicMeta(id)

    return {
        title: c?.data?.comic?.title,
    };
}

const ComicPage = async (props: Props) => {


    const { data } = await getComic(props.params.id);
    const { t } = await useTranslation(props.params.lng, 'comic/id')
    const isMobile = userAgentFromString(headers().get('user-agent') || undefined).device.type === 'mobile'

    if (!data.comic?.id) {
        return (
            <AppShellMain>
                <NotFoundError params={{
                    lng: props.params.lng
                }} />
            </AppShellMain>
        )
    }

    if (isMobile) {
        return <ComicMobile params={props.params} comic={data} t={t} />
    }

    return <ComicDesktopPage params={props.params} comic={data} t={t} />
}

export default ComicPage;
