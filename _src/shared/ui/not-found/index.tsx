import { AppShellMain, Flex } from '@mantine/core';
import { PageProps } from '@src/shared/api/types';
import { NotFoundError } from '@src/widgets/not-found';

export const NotFoundPage = ({ params }: PageProps) => {
    return (
        <AppShellMain>
            <Flex h="100%" justify="center">
                <NotFoundError params={params} />
            </Flex>
        </AppShellMain>
    );
};
