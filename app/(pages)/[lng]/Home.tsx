import { AppShellMain, BackgroundImage, Badge, Box, Button, Card, CardSection, Container, Flex, Loader, Overlay, Paper, ScrollArea, Text, Title } from '@mantine/core';
import Image from 'next/image';

import { useTranslation } from '@/app/shared/lib/i18n';
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
