import { AppShellSection, Container, Flex } from '@mantine/core';
import { Chapters } from '@src/widgets/creator-dashboard/chapters';
import { PropsWithChildren } from 'react';


const UpdateComicLayout = async ({ children, params: { comicId } }: { params: { comicId: string } } & PropsWithChildren) => {

    return (
        <Flex fluid component={Container} gap='lg'>
            <AppShellSection grow>
                {children}
            </AppShellSection>
            <Chapters comicId={comicId} />
        </Flex>
    );
};

export default UpdateComicLayout;
