import { AppShellMain, Container } from '@mantine/core';
import { PageProps } from '@src/shared/api/types';
import { Comics } from '@src/widgets/comic/list-with-filters';

export const ComicsPage = async ({}: PageProps) => {
    return (
        <AppShellMain>
            <Container size="xl" p="md">
                <Comics />
            </Container>
        </AppShellMain>
    );
};
