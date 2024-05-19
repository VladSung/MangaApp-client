import { AppShellMain, Container } from '@mantine/core';

import { PageProps } from '@src/shared/types';
import { PopularComicsWidget } from '@src/widgets/comic';

const HomePage = async ({ params }: PageProps) => {

    return (
        <AppShellMain>
            <Container size='lg'>
                <PopularComicsWidget lng={params.lng} />
            </Container>
        </AppShellMain>

    );
};

export default HomePage