import { getComic, getComicMeta } from "@/app/entities/comic/queries";
import AutoComicPage from "./auto-comic-page";
import { useTranslation } from "@/app/shared/lib/i18n";

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

    return (
        <AutoComicPage {...props} comic={data} />
    )
}

export default ComicPage;