import { AppShellMain, Container } from '@mantine/core';

import { Comics } from '@src/widgets/comic/comics';
import { PageProps } from '@src/shared/types';

const ComicsPage = async ({ params }: PageProps) => {

    return (
        <AppShellMain>
            <Container size='xl' p='md'>
                <Comics />
            </Container>
        </AppShellMain>
    );
};

export default ComicsPage;
