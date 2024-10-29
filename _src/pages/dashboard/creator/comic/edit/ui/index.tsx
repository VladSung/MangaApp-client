import { PageProps } from '@src/shared/api';
import { UpdateComic } from '@src/widgets/comic/update';

export const EditComicPage = async ({ params }: PageProps<{ comicId: string }>) => {
    const { comicId } = await params;
    return <UpdateComic comicId={comicId} />;
};
