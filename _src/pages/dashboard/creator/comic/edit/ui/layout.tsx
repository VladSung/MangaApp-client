import { AppShellSection, Container, Flex } from '@mantine/core';
import { PageProps } from '@src/shared/api';
import { Chapters } from '@src/widgets/creator-dashboard/chapters';
import { PropsWithChildren } from 'react';

export const UpdateComicLayout = async ({
    children,
    params,
}: PageProps<{ comicId: string }> & PropsWithChildren) => {
    const { comicId, lng } = await params;

    return (
        <Flex fluid component={Container} gap="lg">
            <AppShellSection grow>{children}</AppShellSection>
            <Chapters lng={lng} comicId={comicId} />
        </Flex>
    );
};
