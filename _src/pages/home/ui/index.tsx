import { AppShellMain, Container } from '@mantine/core';
import { PageProps } from '@src/shared/api/types';
import { ComicPopularWidget } from '@src/widgets/comic';

export const HomePage = async ({ params }: PageProps) => {
    const { lng } = await params;
    return (
        <AppShellMain>
            <Container size="lg">
                {/* <ContinueReadComicsWidget /> */}
                <ComicPopularWidget lng={lng} />
            </Container>
        </AppShellMain>
    );
};
