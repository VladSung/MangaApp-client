'use client';
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
    useCombobox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { createFormContext, hasLength, isNotEmpty } from '@mantine/form';
import { OneImageUpload, UseOneUploadFormContext } from '@src/entities/image-upload';
import { MaturityRatings } from '@src/shared/api';
import { Avatar } from '@src/shared/ui';
import { IconCalendar, IconEraser } from '@tabler/icons-react';

import classes from './styles.module.css';
import { ComicUpdateFormInput, Genres, Team } from './types';

const defaultFormValues = {
    title: '',
    alternativeTitles: '',
    cover: null,
    description: '',
    altTitle: '',
    tags: [],
    genres: [],
    maturityRating: 'EVERYONE',
    teams: '',
    publishDate: undefined,
};

export interface ComicUpdateFormProps {
    selectionValues: {
        readonly loading: boolean;
        readonly tags: Readonly<Genres>;
        readonly genres: Readonly<Genres>;
        readonly maturityRatings: { title: string }[];
        readonly teams: (Team | null | undefined)[];
    };
    selectedValues?: {
        title?: string;
        alternativeTitles?: string | null;
        cover?: string;
        description?: string;
        tags?: (string | undefined)[];
        genres?: (string | undefined)[];
        maturityRating?: keyof typeof MaturityRatings;
        teams?: string;
    };
    onSubmit: (data: ComicUpdateFormInput) => void;
}
// !HARDCODED
const mRatings = ['EVERYONE', 'TEEN', 'MATURE'];

const [FormProvider, useFormContext, useForm] = createFormContext<ComicUpdateFormInput>();

export const UpdateForm = ({ selectedValues, onSubmit, selectionValues }: ComicUpdateFormProps) => {
    const form = useForm({
        name: 'update-comic-form',
        mode: 'uncontrolled',
        initialValues: Object.assign(defaultFormValues, selectedValues, { cover: null }),
        validate: {
            title: hasLength({ min: 5, max: 270 }, 'Title must be between 5 and 270 characters'),
            alternativeTitles: hasLength(
                { max: 1000 },
                'Alternative titles must be less than 1000 characters'
            ),
            description: hasLength({ max: 3000 }, 'Description must be less than 3000 characters'),
            genres: hasLength({ min: 1, max: 5 }, 'Genres must be between 1 and 5'),
            tags: hasLength({ min: 1, max: 15 }, 'Tags must be between 1 and 15'),
            teams: isNotEmpty('Team is required'),
            cover: isNotEmpty('Cover is required'),
        },
    });

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    console.log(Object.assign(defaultFormValues, selectedValues, { cover: null }));

    const options = selectionValues.teams.map((team) => {
        return (
            team && (
                <Flex
                    gap={8}
                    w="auto"
                    align="center"
                    component={Combobox.Option}
                    active={form.getInputProps('teams')?.value === team.id}
                    value={team.id!}
                    key={team.id}
                >
                    <Avatar size="md" src={team.avatar} />
                    <Text>{team.name}</Text>
                </Flex>
            )
        );
    });

    console.log(selectionValues?.teams);
    return (
        <FormProvider form={form}>
            <form onReset={form.reset} onSubmit={form.onSubmit(onSubmit)}>
                <Flex gap="md" mb="md" py="lg" px="md" h="100%" className={classes.formInner}>
                    <OneImageUpload
                        key={form.key('cover')}
                        imageFile={form.getValues().cover}
                        className={classes.formImage}
                        initialImage={selectedValues?.cover}
                        useFormContext={useFormContext as unknown as UseOneUploadFormContext}
                    />
                    <Stack gap={16} flex="1 0 auto">
                        <TextInput
                            required
                            error={form.errors?.title?.toString()}
                            {...form.getInputProps('title', { require: true })}
                            label={'Title'}
                            key={form.key('title')}
                        />
                        <TextInput
                            {...form.getInputProps('alternativeTitles')}
                            description='use the "/" character to separate names'
                            label={'Alternative titles'}
                            key={form.key('alternativeTitles')}
                        />
                        <Textarea
                            autosize
                            minRows={8}
                            maxRows={8}
                            error={form.errors?.description?.toString()}
                            {...form.getInputProps('description')}
                            label={'Description'}
                            key={form.key('description')}
                        />
                    </Stack>
                </Flex>
                <Flex
                    w="100%"
                    gap={16}
                    mb={16}
                    justify="space-between"
                    className={classes.formInner}
                >
                    <MultiSelect
                        classNames={{ input: classes.multiSelect }}
                        label="Genres (max:5)"
                        required
                        data={selectionValues.genres.map((g) => g.title)}
                        maxValues={5}
                        w="100%"
                        searchable
                        {...form.getInputProps('genres')}
                        key={form.key('genres')}
                    />
                    <MultiSelect
                        classNames={{ input: classes.multiSelect }}
                        label="Tags (max:15)"
                        required
                        data={selectionValues.tags.map((g) => g.title)}
                        maxValues={15}
                        w="100%"
                        searchable
                        {...form.getInputProps('tags')}
                        key={form.key('tags')}
                    />
                </Flex>
                <Flex w="100%" gap={16} mb={16} className={classes.formInner}>
                    <Combobox
                        store={combobox}
                        onOptionSubmit={(val) => {
                            form.setFieldValue('teams', val);
                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                key={form.key('teams')}
                                miw={200}
                                label="Team"
                                component="button"
                                type="button"
                                pointer
                                leftSection={
                                    <Flex justify="center" align="center">
                                        <Avatar
                                            size="sm"
                                            src={
                                                selectionValues.teams.find(
                                                    (team) => team?.id === form.getValues().teams
                                                )?.avatar || ''
                                            }
                                        />
                                    </Flex>
                                }
                                rightSection={<Combobox.Chevron />}
                                rightSectionPointerEvents="none"
                                onFocus={() => combobox.openDropdown()}
                                onClick={() => combobox.toggleDropdown()}
                            >
                                {selectionValues.teams.find(
                                    (team) => team?.id === form.getValues().teams
                                )?.name || <Input.Placeholder>Pick value</Input.Placeholder>}
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
                        valueFormat="DD MM YYYY"
                        leftSectionPointerEvents="visible"
                        rightSection={<IconCalendar />}
                        {...form.getInputProps('publishDate')}
                        key={form.key('publishDate')}
                    />
                    <Select
                        label="Maturity rating"
                        {...form.getInputProps('maturityRating')}
                        data={mRatings}
                        key={form.key('maturityRating')}
                    />
                </Flex>
                <Flex gap={16} mb={16} className={classes.formInner}>
                    <RadioGroup defaultValue="enable" name="comments" label="Comments">
                        <Radio value="enable" label="Enable" />
                        <Radio value="disable" label="Disable" />
                    </RadioGroup>
                    <RadioGroup
                        defaultValue="deny"
                        name="unofficial-translates"
                        label="Unofficial translates"
                    >
                        <Radio value="allow" label="Allow" />
                        <Radio value="deny" label="Deny" />
                    </RadioGroup>
                    <RadioGroup
                        defaultValue="deny"
                        name="earn"
                        label="Earn on unofficial translates"
                    >
                        <Radio value="allow" label="Allow" />
                        <Radio value="deny" label="Deny" />
                    </RadioGroup>
                </Flex>
                <Flex className={classes.formActions}>
                    <Paper className={classes.formActionsPaper} component={Group} withBorder>
                        <ActionIcon color="red" variant="default" size="lg" type="reset">
                            <IconEraser />
                        </ActionIcon>
                        <Tooltip
                            position="top"
                            offset={16}
                            label="If the checkbox is checked, the comic will be visible to everyone and will appear in search."
                            refProp="rootRef"
                        >
                            <Checkbox
                                type="checkbox"
                                {...form.getInputProps('public')}
                                label="Public access"
                            />
                        </Tooltip>
                        <Button type="submit">Save</Button>
                    </Paper>
                </Flex>
            </form>
        </FormProvider>
    );
};

export { type ComicUpdateFormInput } from './types';
