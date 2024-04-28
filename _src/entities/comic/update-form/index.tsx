'use client'
import {
    ActionIcon,
    Button,
    Checkbox,
    Combobox,
    Flex,
    Group,
    Input,
    InputBase,
    MultiSelect,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
    Tooltip,
    useCombobox
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { FileWithPath } from '@mantine/dropzone';
import { createFormContext, UseFormReturnType } from '@mantine/form';
import { IconCalendar, IconEraser } from '@tabler/icons-react';

import { MaturityRatings } from '@src/shared/api/graphql';

import { ImageUpload } from '../../image-upload';
import { AddComicFormInput } from '..';
import classes from './styles.module.css';
import { Genres, Teams } from './types';
import { Avatar } from '@src/shared/ui/Avatar';

const defaultFormValues = {
    title: '',
    alternativeTitles: '',
    cover: {},
    description: '',
    altTitle: '',
    tags: [],
    genres: [],
    maturityRating: 'EVERYONE',
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
        alternativeTitles?: string | null;
        cover?: string;
        description?: string;
        tags?: string[];
        genres?: string[];
        maturityRating?: keyof typeof MaturityRatings;
        teams?: string;
    };
    onSubmit: (data: AddComicFormInput) => void
}
const mRatings = ['EVERYONE', 'TEEN', 'MATURE'];

type UseFormContext = () => UseFormReturnType<{ cover: FileWithPath }, (values: { cover: FileWithPath }) => { cover: FileWithPath }>

const [FormProvider, useFormContext, useForm] =
    createFormContext<AddComicFormInput>();

export const UpdateForm = ({ selectedValues, onSubmit, selectionValues }: AddFormProps) => {

    const form = useForm({
        name: 'update-comic-form',
        initialValues: Object.assign(defaultFormValues, selectedValues) as unknown as AddComicFormInput,
    });

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = selectionValues.teams.map((team) => {
        return (
            <Flex gap={8} w='auto' align='center' component={Combobox.Option} active={form.getInputProps('teams')?.value === team.id} value={team.id!} key={team.id}>
                <Avatar size='md' src={team.avatar} />
                <Text>{team.name}</Text>
            </Flex>
        )
    });

    return (
        <FormProvider form={form}>
            <form onReset={form.reset} onSubmit={form.onSubmit(onSubmit)}>
                <Flex gap='md' mb='md' py='lg' px='md' h='100%' className={classes.formInner}>
                    <ImageUpload initialImage={selectedValues?.cover} useFormContext={useFormContext as unknown as UseFormContext} />
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
                <Flex w='100%' gap={16} mb={16} justify='space-between' className={classes.formInner}>
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
                <Flex w='100%' gap={16} mb={16} className={classes.formInner}>
                    <Combobox
                        store={combobox} onOptionSubmit={(val) => {
                            form.setFieldValue('teams', val);
                            combobox.closeDropdown();
                        }}>
                        <Combobox.Target>
                            <InputBase
                                miw={200}
                                // styles={{ input: { minHeight: 40 } }}
                                label='Team'
                                component="button"
                                type="button"
                                pointer
                                leftSection={<Flex justify='center' align='center'><Avatar size='sm' src={selectionValues.teams.find((team => (team?.id === form.getInputProps('teams')?.value)))?.avatar || ''} /></Flex>}

                                rightSection={<Combobox.Chevron />}
                                rightSectionPointerEvents="none"
                                onFocus={() => combobox.openDropdown()}
                                onClick={() => combobox.toggleDropdown()}
                            >
                                {selectionValues.teams.find((team => (team?.id === form.getInputProps('teams')?.value)))?.name || <Input.Placeholder>Pick value</Input.Placeholder>}
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
                <Flex gap={16} mb={16} className={classes.formInner}>
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
                <Flex align='center' style={{ zIndex: 5 }} justify='center' pos='sticky' p='md' bottom={56}>
                    <Paper component={Group} radius='xl' withBorder align='center' justify='center' gap='xl' px='xl' py='md' w='max-content'>
                        <ActionIcon color='red' variant='default' size='lg' type='reset'><IconEraser /></ActionIcon>
                        <Tooltip position='top' offset={16} label="If the checkbox is checked, the comic will be visible to everyone and will appear in search." refProp='rootRef'>
                            <Checkbox type='checkbox' {...form.getInputProps('public')} label='Public access' />
                        </Tooltip>
                        <Button type='submit'>Save</Button>
                    </Paper>
                </Flex>
            </form>
        </FormProvider>
    );
};
