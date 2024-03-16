import { Flex, Container, Title, Button, rem, Group, AppShellMain } from '@mantine/core';
import Link from 'next/link';

import { Comics } from '@/app/widgets/creator-dashboard/comics';
import { IconPlus } from '@tabler/icons-react';

const Projects = () => {
    return (
        <Container fluid p={24}>
            <Flex mb={16} gap={8} align='center' justify='space-between'>
                <Title variant="h4" order={2}>
                    Список проектов
                </Title>
                <Button size='xs' href={`/dashboard/comic/add`} component={Link} variant='contain' leftSection={<IconPlus size={16} stroke={rem(2)} />}>Project</Button>
            </Flex>
            <Group wrap='wrap' gap={2}>
                <Comics />
            </Group>
        </Container>
    );
};

export default Projects;
