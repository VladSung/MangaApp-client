import { AppShellSection, Container, Flex } from '@mantine/core';

import { UpdateComicWidget } from '@src/widgets/comic';
import { Chapters } from './edit-chapters';


const EditComicPage = async ({ params: { comicId } }: { params: { comicId: string } }) => {

    return (
        <Flex fluid component={Container} gap='lg'>
            <AppShellSection grow><UpdateComicWidget comicId={comicId} /></AppShellSection>
            <Chapters comicId={comicId} />
        </Flex>
    );
};

export default EditComicPage;
