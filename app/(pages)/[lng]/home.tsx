import { AppShellMain, Container } from '@mantine/core';

import { PageProps } from '@/app/shared/types';
import { PopularComicsWidget } from '@/app/widgets/comic';

const imageLink = 'https://res.cloudinary.com/dd5xzevrq/image/upload/v1692970541/5_725145be3b_kuci2c.jpg';

export const Home = async ({ params }: PageProps) => {

    return (
        <AppShellMain>
            <Container>
                <PopularComicsWidget lng={params.lng} />
            </Container>
        </AppShellMain>

    );
};
