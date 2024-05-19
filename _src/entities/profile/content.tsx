import { Tabs, Text, TabsList, TabsTab, TabsPanel, SimpleGrid, Divider, Button } from "@mantine/core"
import { IconPencil, IconBook, IconUsers } from "@tabler/icons-react"
import Link from "next/link"
import { ComicCard } from "../comic"
import { TeamCard } from "../team"
import { Comic, Team } from "@src/shared/api/graphql"

export const Content = ({ comics, teams }: { comics?: (Pick<Comic, 'cover' | 'title' | 'id'> | undefined | null)[], teams?: (Pick<Team, 'id' | 'avatar' | 'name'> | undefined | null)[] }) => {
    return (
        <Tabs defaultValue="working-comics" mb='xl'>
            <TabsList>
                <TabsTab value="working-comics" leftSection={<IconPencil size={16} />}>
                    Работает над комиксами
                </TabsTab>
                <TabsTab value="reading-comics" leftSection={<IconBook size={16} />}>
                    Читает комиксы
                </TabsTab>
                <TabsTab value="user-teams" leftSection={<IconUsers size={16} />}>
                    Команды
                </TabsTab>
            </TabsList>

            <TabsPanel value="working-comics" pt="lg">
                {comics?.length ? (
                    <SimpleGrid cols={{ base: 3, xs: 4, sm: 5, md: 6 }}>
                        {comics.map((comic) => (
                            <ComicCard key={comic?.id} data={comic} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text c="dimmed" ta="center">
                        Пользователь не работает ни над одним комиксом
                    </Text>
                )}
            </TabsPanel>

            <TabsPanel value="reading-comics" pt="lg">
                {/* {readingComicsData && readingComicsData.userReadingComics.length > 0 ? ( */}
                <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} >
                    {/* {readingComicsData.userReadingComics.map((comic) => (
                                <Card key={comic.id} shadow="sm" p="lg">
                                    <CardSection>
                                        <Image src={comic.coverImage} alt={comic.title} height={160} />
                                    </CardSection>
                                    <Text fw={500} mt="md">
                                        {comic.title}
                                    </Text>
                                </Card>
                            // ))} */}
                </SimpleGrid>
                {/* ) : ( */}
                <Text c="dimmed" ta="center">
                    Пользователь не читал ни одного комикса
                </Text>
                {/* )} */}

            </TabsPanel>

            <TabsPanel value="user-teams" pt="lg">
                {teams?.length ? (
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }}>
                        {teams.map((team) => (
                            <TeamCard key={team?.id} team={team}>
                                <Button component={Link} href={`/team/${team?.id}`} variant='outline' size='xs'>Перейти на страницу</Button>
                            </TeamCard>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Text c="dimmed" ta="center">
                        Пользователь не состоит ни в одной команде
                    </Text>
                )}
            </TabsPanel>
        </Tabs>
    )
}