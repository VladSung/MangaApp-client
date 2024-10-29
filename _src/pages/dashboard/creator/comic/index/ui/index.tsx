import { Button, Container, Group, Title } from '@mantine/core';
import { PageProps } from '@src/shared/api/types';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { Comics } from '@src/widgets/creator-dashboard/comics';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export const DashboardComicsPage = async ({ params }: PageProps) => {
    const { lng } = await params;
    const { t } = await fetchTranslation(lng, 'dashboard/creator/comic');

    return (
        <Container size="xl" p="md">
            <Group mb="lg">
                <Title order={2}>{t('projects')}</Title>
                <Button
                    size="xs"
                    component={Link}
                    href="/dashboard/comic/add"
                    leftSection={<IconPlus size={14} />}
                >
                    {t('add-project')}
                </Button>
            </Group>
            <Comics />
        </Container>
    );
};
