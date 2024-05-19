import { AppShellSection, Container, Flex } from '@mantine/core';

import { UpdateComicWidget } from '@src/widgets/comic';

const EditComicPage = async ({ params: { comicId } }: { params: { comicId: string } }) => {

    return (
        <UpdateComicWidget comicId={comicId} />
    );
};

export default EditComicPage;
