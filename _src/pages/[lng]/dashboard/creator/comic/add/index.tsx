import { AppShellSection, Container } from '@mantine/core';

import { AddComicWidget } from '@src/widgets/comic';

const AddComic = () => {
    return (
        <Container size='lg'>
            <AppShellSection grow><AddComicWidget /></AppShellSection>
        </Container>
    );
};

export default AddComic;
