'use client'
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import ComicMobile from "./comic-mobile";
import ComicDesktop from "./comic-pc";
import { ComicPageProps } from "./types";
import { useTranslation } from "@/app/shared/lib/i18n/client";

const AutoComicPage = ({ ...props }: Omit<ComicPageProps, 't'>) => {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const { t } = useTranslation(props.params.lng, 'comic/id')

    if (isMobile) return <ComicMobile {...props} t={t} />
    return <ComicDesktop {...props} t={t} />
}
export default AutoComicPage