'use client'
import { Flex, Box, Title } from "@mantine/core"

import { Avatar } from "@src/shared/ui/Avatar"

type Props = {
    data?: { name: string; avatar?: string | null };
    children?: React.ReactNode
    rightSlot?: React.ReactNode
}

export const Header = ({ children, rightSlot, data }: Props) => {

    return (
        <Flex component='header' mb='lg' justify='space-between' align='center'>
            <Flex gap='md' align='center'>
                <Avatar size='xl' src={data?.avatar} alt={data?.name} />
                <Box>
                    <Title order={1} size='h2' mb={children ? 'xs' : undefined}>
                        {data?.name}
                    </Title>
                    {children}
                </Box>
            </Flex>
            {rightSlot}
        </Flex>
    )
}
