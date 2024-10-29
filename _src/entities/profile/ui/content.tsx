import { SimpleGrid,Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core';

export const ProfileContent = ({
    comics,
    teams,
}: {
    comics?: React.ReactNode;
    teams?: React.ReactNode;
}) => {
    return (
        <Tabs defaultValue="working-comics" mb="xl">
            <TabsList>
                <TabsTab fw={500} value="working-comics">
                    Comics
                </TabsTab>
                <TabsTab fw={500} value="reading-comics">
                    Read
                </TabsTab>
                <TabsTab fw={500} value="user-teams">
                    Teams
                </TabsTab>
            </TabsList>

            <TabsPanel value="working-comics" pt="lg">
                {comics ? (
                    <SimpleGrid cols={{ base: 3, xs: 4, sm: 5, md: 6 }}>{comics}</SimpleGrid>
                ) : (
                    <Text c="dimmed" ta="center">
                        Пользователь не работает ни над одним комиксом
                    </Text>
                )}
            </TabsPanel>

            <TabsPanel value="reading-comics" pt="lg">
                {comics ? (
                    <SimpleGrid cols={{ base: 3, xs: 4, sm: 5, md: 6 }}>{comics}</SimpleGrid>
                ) : (
                    <Text c="dimmed" ta="center">
                        Пользователь не читал ни одного комикса
                    </Text>
                )}
            </TabsPanel>

            <TabsPanel value="user-teams" pt="lg">
                {teams ? (
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }}>{teams}</SimpleGrid>
                ) : (
                    <Text c="dimmed" ta="center">
                        Пользователь не состоит ни в одной команде
                    </Text>
                )}
            </TabsPanel>
        </Tabs>
    );
};
