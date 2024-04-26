import { ActionIcon, Flex, Group, Paper, rem, Text } from "@mantine/core";
import { IconCoins, IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

type ItemProps = {
    comicId: string | number;
    chapter: {
        id: string | number;
        title?: string | null;
        volume: number;
        number: number;
        price?: number | null;
        createdAt: string;
    }
}

export const ListItem = ({ chapter, comicId }: ItemProps) => {

    return (
        <Paper w='100%' wrap='nowrap' component={Group} p='sm' withBorder variant='default' justify='space-between'>
            <Text lineClamp={1} maw='16ch' truncate='end'>{chapter.volume}-{chapter.number} {chapter.title}</Text>
            <Text size='xs'>{chapter.createdAt}</Text>
            <Flex justify='space-between' style={{ flexGrow: 1 }}>
                <Flex align='center' justify='flex-start' gap='xs' wrap='nowrap'>
                    {chapter.price
                        ? <>
                            <Text size='sm'>{chapter.price}</Text>
                            <IconCoins size={16} stroke={rem(2)} />
                        </>
                        : <Text size='sm'>free</Text>}
                </Flex>
                <Group gap='sm' wrap='nowrap' justify='flex-end'>
                    <ActionIcon href={`/dashboard/comic/${comicId}/${chapter.id}`} component={Link} variant='default'><IconEdit size={16} stroke={rem(2)} /></ActionIcon>
                    <ActionIcon variant='default'><IconTrash size={16} stroke={rem(2)} /></ActionIcon>
                </Group>
            </Flex>
        </Paper>
    )
}
