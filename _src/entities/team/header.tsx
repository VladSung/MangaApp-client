'use client'
import { Flex, Box, Title } from "@mantine/core"
import { Team } from "@src/shared/api/graphql";
import { Avatar } from "@src/shared/ui/Avatar"

type Props = {
    team?: Partial<Pick<Team, 'avatar' | 'name'>> | null;
    children?: React.ReactNode
    rightSlot?: React.ReactNode
}

export const Header = ({ children, rightSlot, team }: Props) => {

    return (
        <Flex component='header' mb='lg' justify='space-between' align='center'>
            <Flex gap='md' align='center'>
                <Avatar size='2lg' src={team?.avatar} alt={team?.name} />
                <Box>
                    <Title order={1} size='h2' mb='sm'>
                        {team?.name}
                    </Title>
                    {children}
                </Box>
            </Flex>
            {rightSlot}
        </Flex>
    )
}
