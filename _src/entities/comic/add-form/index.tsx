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
    InputError,
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
import { createFormContext, hasLength, isNotEmpty } from '@mantine/form';
import { IconCalendar, IconEraser } from '@tabler/icons-react';

import { MaturityRatings } from '@src/shared/api/graphql';

import { ImageUpload, ImageUploadUseFormContext } from '../../image-upload';
import { AddComicFormInput } from '..';
import classes from './styles.module.css';
import { Genres, Teams } from './types';
import { Avatar } from '@src/shared/ui/Avatar';


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
    loading: boolean;
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
    onSubmit: (data: AddComicFormInput) => void
}
const mRatings = Object.values(MaturityRatings);

const [FormProvider, useFormContext, useForm] =
    createFormContext<AddComicFormInput>();

export const AddForm = ({ loading, selectedValues, onSubmit, selectionValues }: AddFormProps) => {
    const form = useForm({
        name: 'add-comic-form',
        initialValues: Object.assign(defaultFormValues, selectedValues) as unknown as AddComicFormInput,
        validate: {
            title: hasLength({ min: 5, max: 270 }, 'Title must be between 5 and 270 characters'),
            alternativeTitles: hasLength({ max: 1000 }, 'Alternative titles must be less than 1000 characters'),
            description: hasLength({ max: 3000 }, 'Description must be less than 3000 characters'),
            genres: hasLength({ min: 1, max: 5 }, 'Genres must be between 1 and 5'),
            tags: hasLength({ min: 1, max: 15 }, 'Tags must be between 1 and 15'),
            teams: isNotEmpty('Team is required'),
            cover: isNotEmpty('Cover is required'),
        }
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
            <form style={{ padding: '32px 24px', height: '100%' }} onReset={() => {
                form.reset()
            }} onSubmit={form.onSubmit(onSubmit)}>
                <Flex gap={24} mb={24} className={classes.formInner}>
                    <ImageUpload className={classes.formImage} initialImage={selectedValues?.cover} useFormContext={useFormContext as unknown as ImageUploadUseFormContext} />
                    <Stack gap={16} flex='1 0 auto'>
                        <TextInput
                            withAsterisk
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
                            minRows={7.6}
                            maxRows={7.6}
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
                        withAsterisk
                        data={selectionValues.genres.map(g => (g.title))}
                        maxValues={5}
                        w='100%'
                        searchable
                        {...form.getInputProps('genres')}
                    />
                    <MultiSelect
                        classNames={{ input: classes.multiSelect }}
                        label='Tags (max:15)'
                        withAsterisk
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
                                mb={5}
                                error={form.errors?.teams?.toString()}
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
                <Flex className={classes.formActions}>
                    <Paper className={classes.formActionsPaper} component={Group} withBorder>
                        <ActionIcon color='red' variant='default' size='lg' type='reset'><IconEraser /></ActionIcon>
                        <Tooltip position='top' offset={16} label="If the checkbox is checked, the comic will be visible to everyone and will appear in search." refProp='rootRef'>
                            <Checkbox type='checkbox' {...form.getInputProps('public')} label='Public access' />
                        </Tooltip>
                        <Button loading={loading} type='submit'>Save</Button>
                    </Paper>
                </Flex>
            </form>
        </FormProvider >
    );
};
