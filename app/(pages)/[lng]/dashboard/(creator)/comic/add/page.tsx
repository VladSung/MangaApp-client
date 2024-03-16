import { AddComicWidget } from '@/app/widgets/comic';
import { AppShellSection, Container } from '@mantine/core';

const AddComic = () => {
    return (
        <Container size='lg'>
            <AppShellSection grow><AddComicWidget /></AppShellSection>
        </Container>
    );
};

export default AddComic;
