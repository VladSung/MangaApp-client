import { Button, Container, Flex, Paper, Box, Group, rem, Title, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { Comics } from '@/app/widgets/creator-dashboard/comics';

const Projects = () => {
    return (
        <Container size='lg' p='md'>
            <Flex mb='xl' gap='sm' align='center' justify='space-between'>
                <Title variant="h4" order={2}>
                    Список проектов
                </Title>
                <Button size='xs' href={`/dashboard/comic/add`} component={Link} variant='contain' leftSection={<IconPlus size={16} stroke={rem(2)} />}>Project</Button>
            </Flex>
            <Comics />
        </Container>
    );
};

export default Projects;
