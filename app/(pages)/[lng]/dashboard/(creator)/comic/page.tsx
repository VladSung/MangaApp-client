import { Button, Container, Flex, rem, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { Comics } from '@/app/widgets/creator-dashboard/comics';
import { PageProps } from '@/app/shared/types';
import { useTranslation } from '@/app/shared/lib/i18n';

const Projects = async ({ params }: PageProps) => {

    const { t } = await useTranslation(params.lng, 'dashboard/creator/comic')

    return (
        <Container size='xl' p='md'>
            <Flex mb='xl' gap='sm' align='center' justify='space-between'>
                <Title variant="h4" order={2}>
                    {t('projects')}
                </Title>
                <Button
                    size='xs'
                    href={`/dashboard/comic/add`}
                    component={Link} variant='contain'
                    leftSection={<IconPlus size={16} stroke={rem(2)} />}
                >
                    {t('add-project')}
                </Button>
            </Flex>
            <Comics />
        </Container>
    );
};

export default Projects;
