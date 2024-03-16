import { useTranslation } from '@/app/shared/lib/i18n';
import { PageProps } from '@/app/shared/types';
import { ComicList } from '@/app/widgets/comic/list';
import Image from 'next/image';
import { AppShellMain, Box, Card, CardSection, Container, Flex, Title, Text, Badge, BackgroundImage, Paper, ScrollArea, Overlay, Button } from '@mantine/core';

const imageLink = 'https://res.cloudinary.com/dd5xzevrq/image/upload/v1692970541/5_725145be3b_kuci2c.jpg';
export const Home = async ({ params }: PageProps) => {
    const { t } = await useTranslation(params.lng, 'index');
    return (
        <AppShellMain>
            <Container size='lg'>
                <Flex justify='space-between' mt={24} mb={32} gap={16} w={'max-content'}>
                    <Paper withBorder radius='lg' w={858} pos='relative'>
                        <BackgroundImage
                            radius='lg'
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                position: 'absolute',
                                objectFit: "cover",
                                filter: 'blur(4px)'
                            }}
                            src={imageLink} />
                        <BackgroundImage
                            radius='lg'
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                position: 'absolute',
                                objectFit: "cover",
                            }}
                            src={imageLink} />
                        <Overlay color="#000" backgroundOpacity={0.6} radius='lg' >
                            <Flex pos='relative' p={24} direction='column'>
                                <Badge size='lg' variant='default' style={{ marginLeft: 'auto' }}>TОП №1</Badge>
                                <Box pl={8} mb={32} style={{ borderLeft: '3px solid var(--mantine-color-dark-0)' }}>
                                    <Title c='var(--mantine-color-dark-0)' order={1}>Возвращение Героя</Title>
                                    <Text c='var(--mantine-color-dark-0)' size='sm'>Hero Returns</Text>
                                </Box>
                                <Text c='var(--mantine-color-dark-0)' maw={858 * .8}>"Что посеешь, то и пожнëшь".Попав в это тело, у меня появилось много обязанностей и вещей. Вещей, которые нужно уничтожить...
                                    Прежде всего нужно начать с того, чтобы избавиться от моего жениха и его любовницы, которые кутят любовные шашни прямо в моем доме.Нужно убить моего свободного брата и отца, ведь они покушаются на мою жизнь.
                                </Text>
                            </Flex>
                        </Overlay>
                    </Paper>
                    <ScrollArea h={377}>
                        <Flex direction='column' gap={8}>
                            <Card withBorder radius='lg' w={858 / 3.4} h={377 / 3.4}>
                                <CardSection>
                                    <Image
                                        blurDataURL={imageLink}
                                        alt=""
                                        placeholder="blur"
                                        quality={100}
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover",
                                            filter: 'blur(16px)'
                                        }}
                                        src={imageLink} />
                                </CardSection>
                            </Card>
                            <Card withBorder radius='lg' w={858 / 3.4} h={377 / 3.4}>
                                <CardSection>
                                    <Image
                                        blurDataURL={imageLink}
                                        alt=""
                                        placeholder="blur"
                                        quality={100}
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover",
                                            filter: 'blur(16px)'
                                        }}
                                        src={imageLink} />
                                </CardSection>
                            </Card>
                            <Card withBorder radius='lg' w={858 / 3.4} h={377 / 3.4}>
                                <CardSection>
                                    <Image
                                        blurDataURL={imageLink}
                                        alt=""
                                        placeholder="blur"
                                        quality={100}
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover",
                                            filter: 'blur(16px)'
                                        }}
                                        src={imageLink} />
                                </CardSection>
                            </Card>
                            <Card withBorder radius='lg' w={858 / 3.4} h={377 / 3.4}>
                                <CardSection>
                                    <Image
                                        blurDataURL={imageLink}
                                        alt=""
                                        placeholder="blur"
                                        quality={100}
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover",
                                            filter: 'blur(16px)'
                                        }}
                                        src={imageLink} />
                                </CardSection>
                            </Card>
                            <Card withBorder radius='lg' w={858 / 3.4} h={377 / 3.4}>
                                <CardSection>
                                    <Image
                                        blurDataURL={imageLink}
                                        alt=""
                                        placeholder="blur"
                                        quality={100}
                                        fill
                                        sizes="100vw"
                                        style={{
                                            objectFit: "cover",
                                            filter: 'blur(16px)'
                                        }}
                                        src={imageLink} />
                                </CardSection>
                            </Card>

                        </Flex>
                    </ScrollArea>
                </Flex>
                <Title order={2} style={{ marginBottom: 24 }}>
                    {t('popular')}
                </Title>
                <ComicList />
            </Container>
        </AppShellMain>

    );
};
