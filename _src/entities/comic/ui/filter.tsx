import { Button, Flex, InputLabel, Loader, MultiSelect, NumberInput, Paper, Select, Slider, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { ComicStatuses, MaturityRatings } from "@src/shared/api/graphql"
import { createContext, memo, useContext } from "react"

export type FilterInputs = {
    searchText?: string
    status?: ComicStatuses | null
    maturityRating?: MaturityRatings | null
    year: {
        min: number | null
        max: number | null
    }
    rating: {
        min: number | null
        max: number | null
    }
    genres: string[]
    tags: string[]
}

const initialValues = {
    searchText: '',
    status: null,
    maturityRating: null,
    year: {
        min: null,
        max: null
    },
    rating: {
        min: null,
        max: null
    },
    genres: [],
    tags: [],

}

type Props = {
    genres: string[];
    tags: string[];
    loading: boolean;
}

export const FilterContext = createContext<{ filter: FilterInputs, setFilter: (data: FilterInputs) => void }>({
    filter: initialValues,
    setFilter: () => { }
})

export const Filter = ({ genres, loading, tags }: Props) => {
    const { setFilter } = useContext(FilterContext)
    const form = useForm<FilterInputs>({
        mode: 'uncontrolled',
        onValuesChange: setFilter,
        initialValues
    })


    return (
        <form onReset={() => form.resetDirty()}>
            <Paper maw={320} miw={320} withBorder radius='md' p='lg'>
                <Flex justify='space-between'>
                    <Title order={4} mb='lg'>Filters</Title>
                    <Button onClick={() => { form.reset(); form.setValues(initialValues) }} size="compact-sm" variant="subtle">Сбросить фильтры</Button>
                </Flex>
                <TextInput key={form.key('searchText')} {...form.getInputProps('searchText')} mb='md' placeholder="Filter by title" />

                <Select key={form.key('status')} clearable mb='md' placeholder="All" {...form.getInputProps('status')} label="Status" data={Object.values(ComicStatuses)} />
                <Select key={form.key('maturityRating')} clearable mb='md' placeholder="All" {...form.getInputProps('maturityRating')} label="Maturity rating" data={Object.values(MaturityRatings)} />
                <InputLabel mb='sm'>Publish year</InputLabel>
                <Flex gap='sm' mb='md'>
                    <NumberInput key={form.key('year.min')}  {...form.getInputProps('year.min')} min={0} max={new Date().getFullYear()}
                        placeholder="From" />
                    <NumberInput key={form.key('year.max')}  {...form.getInputProps('year.max')} min={0} max={new Date().getFullYear()}
                        placeholder="To" />
                </Flex>

                <InputLabel mb='sm'>Rating</InputLabel>
                <Flex gap='sm' mb='md'>
                    <NumberInput key={form.key('rating.max')} {...form.getInputProps('rating.max')} min={0} max={10}
                        placeholder="From" />
                    <NumberInput key={form.key('rating.min')} {...form.getInputProps('rating.min')} min={0} max={10}
                        placeholder="To" />
                </Flex>
                <MultiSelect
                    mb='md'
                    label='Genres'
                    placeholder="Select genres"
                    data={genres}
                    rightSection={loading && <Loader size='xs' />}
                    key={form.key('genres')}
                    {...form.getInputProps('genres')}
                    maxValues={7}
                    w='100%'
                    searchable
                />
                <MultiSelect
                    mb='md'
                    label='Tags'
                    placeholder="Select tags"
                    data={tags}
                    rightSection={loading && <Loader size='xs' />}
                    key={form.key('tags')}
                    {...form.getInputProps('tags')}
                    maxValues={15}
                    w='100%'
                    searchable
                />
            </Paper>
        </form>
    )
}
