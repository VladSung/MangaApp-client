import { Card as MantineCard, Stack, Avatar, Group, Text } from "@mantine/core"
import { Team, Comic } from "@src/shared/api/graphql"
import { PropsWithChildren } from "react"

export const Card = ({ team, children }: PropsWithChildren & { team?: null | Pick<Team, 'id' | 'avatar' | 'name' | 'description'> & { comics?: Pick<Comic, 'id' | 'title' | 'cover'>[] | null } }) => {
    return (
        <MantineCard shadow="sm" p="lg" radius="md" withBorder>
            <Stack mb='lg' gap='xs' align='center'>
                <Avatar size={60} src={team?.avatar} />
                <Text fw={500}>
                    {team?.name}
                </Text>
                {team?.description && <Text ta='center' size="xs" c="dimmed">
                    {team?.description}
                </Text>}
            </Stack>
            <Group justify='center'>
                {children}
            </Group>
        </MantineCard>
    )
}