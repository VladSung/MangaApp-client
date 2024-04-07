import { Flex, InputLabel, NumberInput, Paper, TextInput, Title, Select, MultiSelect, Button } from "@mantine/core"

type Props = {
    onSubmitHandler: () => void
}

export const Filter = ({ onSubmitHandler }: Props) => {
    return (
        <Paper maw={320} withBorder radius='md' p='lg'>
            <Flex justify='space-between'>
                <Title order={4} mb='lg'>Filters</Title>
                <Button size="compact-sm" variant="subtle">Очистить</Button>
            </Flex>
            <TextInput mb='md' placeholder="Фильтровать по названию" />
            <Select mb='md' label="Статус" data={['Завершено', 'Пауза', 'Продолжается', 'Анонс']} />
            <Select mb='md' label="Возрастной рейтинг" data={['EVERYONE', 'TEEN', 'MATURE']} />
            <InputLabel mb='sm'>Год выпуска</InputLabel>
            <Flex gap='sm' mb='md'>
                <NumberInput min={0} placeholder="От" />
                <NumberInput min={0} placeholder="До" />
            </Flex>

            <InputLabel mb='sm'>Оценка</InputLabel>
            <Flex gap='sm' mb='md'>
                <NumberInput min={0} max={10} placeholder="От" />
                <NumberInput min={0} max={10} placeholder="До" />
            </Flex>
            <MultiSelect
                mb='md'
                label='Genres'
                placeholder="Жанры"
                required
                data={['Алхимия', 'бал бла']}
                maxValues={7}
                w='100%'
                searchable
            />
            <MultiSelect
                mb='md'
                label='Tags'
                required
                data={['Алхимия', 'бал бла']}
                maxValues={15}
                w='100%'
                searchable
            />
        </Paper>
    )
}