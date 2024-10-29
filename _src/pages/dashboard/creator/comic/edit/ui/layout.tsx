import { AppShellSection, Container, Flex } from '@mantine/core';
import { Chapters } from '@src/widgets/creator-dashboard/chapters';
import { PropsWithChildren } from 'react';

export const UpdateComicLayout = async ({
    children,
    params: { comicId, lng },
}: { params: { comicId: string; lng: string } } & PropsWithChildren) => {
    return (
        <Flex fluid component={Container} gap="lg">
            <AppShellSection grow>{children}</AppShellSection>
            <Chapters lng={lng} comicId={comicId} />
        </Flex>
    );
};
