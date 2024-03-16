import { createFormContext } from '@mantine/form';
import {
    MultiSelect,
    ActionIcon,
    Flex,
    Select,
    Stack,
    TextInput,
    Textarea,
    Text,
    Button,
    Checkbox,
    Combobox,
    InputBase,
    Input,
    useCombobox,
    Avatar,
    Tooltip,
    Group,
    Radio,
    RadioGroup
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar, IconEraser } from '@tabler/icons-react';

import { MaturityRatings } from '@/app/shared/api/graphql';
import { ImageUpload } from '../../image-upload';
import { Genres, Teams } from './types';
import classes from './styles.module.css';
import { AddComicFormInput } from '..';


const defaultFormValues = {
    title: '',
    alternativeTitles: '',
    cover: [],
    description: '',
    altTitle: '',
    tags: [],
    genres: [],
    maturityRating: 'Everyone',
    teams: '',
    publishDate: undefined
}

export interface AddFormProps {
    selectionValues: {
        loading: boolean;
        tags: Genres;
        genres: Genres;
        maturityRatings: { title: string }[];
        teams: Teams;
    };
    selectedValues?: {
        title?: string;
        alternativeTitles?: string;
        cover?: string;
        description?: string;
        tags?: string[];
        genres?: string[];
        maturityRating?: keyof typeof MaturityRatings;
        teams?: string;
    };
    onSubmit: (data: AddComicFormInput) => {}
}
const mRatings = Object.values(MaturityRatings);

const [FormProvider, useFormContext, useForm] =
    createFormContext<AddComicFormInput>();

export const AddForm = ({ selectedValues, onSubmit, selectionValues }: AddFormProps) => {
    const form = useForm({
        name: 'add-comic-form',
        initialValues: Object.assign(defaultFormValues, selectedValues) as unknown as AddComicFormInput,
    });

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const options = selectionValues.teams.map((team) => {
        return (
            <Flex gap={8} w='auto' align='center' component={Combobox.Option} active={form.getInputProps('teams')?.value === team.id} value={team.id!} key={team.id}>
                <Avatar size='md' src={team.avatar} />
                <Text>{team.name!}</Text>
            </Flex>
        )
    });
    return (
        <FormProvider form={form}>
            <form style={{ padding: '32px 24px', height: '100%' }} onReset={() => { form.reset() }} onSubmit={form.onSubmit(onSubmit)}>
                <Flex gap={24} mb={24}>
                    <ImageUpload initialImage={selectedValues?.cover} useFormContext={useFormContext} />
                    <Stack gap={16} flex='1 0 auto'>
                        <TextInput
                            required
                            error={form.errors?.title?.toString()}
                            {...form.getInputProps('title', { require: true })}
                            label={'Title'}
                        />
                        <TextInput
                            {...form.getInputProps('alternativeTitles')}
                            description='use the "/" character to separate names'
                            label={'Alternative titles'}
                        />
                        <Textarea
                            autosize
                            minRows={8}
                            maxRows={8}
                            error={form.errors?.description?.toString()}
                            {...form.getInputProps('description')}
                            label={'Description'}
                        />
                    </Stack>
                </Flex>
                <Flex w='100%' gap={16} mb={16} justify='space-between'>
                    <MultiSelect
                        classNames={{ input: classes.multiSelect }}
                        label='Genres (max:5)'
                        required
                        data={selectionValues.genres.map(g => (g.title))}
                        maxValues={5}
                        w='100%'
                        searchable
                        {...form.getInputProps('genres')}
                    />
                    <MultiSelect
                        classNames={{ input: classes.multiSelect }}
                        label='Tags (max:15)'
                        required
                        data={selectionValues.tags.map(g => (g.title))}
                        maxValues={15}
                        w='100%'
                        searchable
                        {...form.getInputProps('tags')}
                    />
                </Flex>
                <Flex w='100%' gap={16} mb={16}>
                    <Combobox
                        store={combobox} onOptionSubmit={(val) => {
                            form.setFieldValue('teams', val);
                            combobox.closeDropdown();
                        }}>
                        <Combobox.Target>
                            <InputBase
                                miw={200}
                                label='Team'
                                component="button"
                                type="button"
                                pointer
                                leftSection={<Flex justify='center' align='center'><Avatar size='sm' src={selectionValues.teams.filter((team => (team?.id === form.getInputProps('teams')?.value)))[0]?.avatar || ''} /></Flex>}

                                rightSection={<Combobox.Chevron />}
                                rightSectionPointerEvents="none"
                                onFocus={() => combobox.openDropdown()}
                                onClick={() => combobox.toggleDropdown()}
                            >
                                {selectionValues.teams.filter((team => (team?.id === form.getInputProps('teams')?.value)))[0]?.name || <Input.Placeholder>Pick value</Input.Placeholder>}
                            </InputBase>
                        </Combobox.Target>
                        <Combobox.Dropdown>
                            <Combobox.Options>{options}</Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                    <DateInput
                        label="Start publish date"
                        placeholder="Pick date"
                        pointer
                        minDate={new Date()}
                        valueFormat='DD MM YYYY'
                        leftSectionPointerEvents='visible'
                        rightSection={<IconCalendar />}
                        {...form.getInputProps('publishDate')}
                    />
                    <Select label='Maturity rating' {...form.getInputProps('maturityRating')} data={mRatings} />
                </Flex>
                <Flex gap={16} mb={16}>
                    <RadioGroup defaultValue="enable" name='comments' label='Comments'>
                        <Radio value='enable' label='Enable' />
                        <Radio value='disable' label='Disable' />
                    </RadioGroup>
                    <RadioGroup defaultValue="deny" name='unofficial-translates' label='Unofficial translates'>
                        <Radio value='allow' label='Allow' />
                        <Radio value='deny' label='Deny' />
                    </RadioGroup>
                    <RadioGroup defaultValue="deny" name='earn' label='Earn on unofficial translates'>
                        <Radio value='allow' label='Allow' />
                        <Radio value='deny' label='Deny' />
                    </RadioGroup>
                </Flex>
                <Flex align='center' justify='center' pos='sticky' p='md' bottom={0}>
                    <Group align='center' justify='center' gap='xl' px='xl' py='lg' w='max-content'>
                        <ActionIcon color='red' variant='default' size='lg' type='reset'><IconEraser /></ActionIcon>
                        <Tooltip position='top' offset={16} label="If the checkbox is checked, the comic will be visible to everyone and will appear in search." refProp='rootRef'>
                            <Checkbox type='checkbox' {...form.getInputProps('public')} label='Public access' />
                        </Tooltip>
                        <Button type='submit'>Save</Button>
                    </Group>
                </Flex>
            </form>
        </FormProvider >
    );
};