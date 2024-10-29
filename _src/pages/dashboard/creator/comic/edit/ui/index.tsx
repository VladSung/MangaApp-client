import { UpdateComic } from '@src/widgets/comic/update';

export const EditComicPage = async ({ params: { comicId } }: { params: { comicId: string } }) => {
    return <UpdateComic comicId={comicId} />;
};
