'use client';
import {
    ActionIcon,
    Button,
    Group,
    InputError,
    NumberInput,
    Stack,
    Switch,
    TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { FileWithPath } from '@mantine/dropzone';
import { createFormContext, hasLength, UseFormReturnType } from '@mantine/form';
import {
    DndFileList,
    ManyImagesUpload,
    UseManyUploadFormContext,
} from '@src/entities/image-upload';
import { IconTrash } from '@tabler/icons-react';

export type FormInput = {
    images: FileWithPath[] | [];
    volume: number;
    number: number;
    name: string;
    publishDate: Date;
};

const [FormProvider, useFormContext, useForm] = createFormContext<FormInput>();
export type OnSubmitHandler = (
    values: FormInput,
    form: UseFormReturnType<FormInput, (values: FormInput) => FormInput>
) => void;

export const ChapterUploadForm = ({
    comicId,
    lng,
    volume,
    number,
    onSubmitHandler,
    submitLoading,
}: {
    volume?: number;
    number?: number;
    submitLoading: boolean;
    onSubmitHandler: OnSubmitHandler;
    comicId: string;
    lng: string;
}) => {
    const minComicVolume = volume || 1;
    const minComicNumber = number || 1;

    const form = useForm({
        name: 'upload-chapter',
        mode: 'uncontrolled',
        initialValues: {
            images: [],
            volume: minComicVolume,
            number: Math.floor(minComicNumber),
            name: '',
            publishDate: new Date(),
        },
        validate: {
            images: hasLength({ min: 1 }, 'Images cannot be empty. Please drop or select images'),
        },
    });

    const images = form.getValues().images;

    return (
        <FormProvider form={form}>
            <form
                style={{ position: 'relative' }}
                onReset={form.reset}
                onSubmit={form.onSubmit((v) => onSubmitHandler(v, form))}
            >
                <Stack>
                    <Group>
                        <NumberInput
                            {...form.getInputProps('volume')}
                            label="Volume"
                            key={form.key('volume')}
                            min={minComicVolume}
                            max={minComicVolume + 1}
                        />
                        <NumberInput
                            {...form.getInputProps('number')}
                            key={form.key('number')}
                            label="Chapter"
                            disabled
                        />
                    </Group>
                    <TextInput
                        {...form.getInputProps('name')}
                        label="Chapter name"
                        key={form.key('name')}
                        style={{ flexGrow: 1 }}
                    />

                    <ManyImagesUpload
                        width={'100%'}
                        height={300}
                        useFormContext={useFormContext as unknown as UseManyUploadFormContext}
                    />
                    <InputError>{form.errors.images}</InputError>
                    {images && (
                        <DndFileList
                            list={images}
                            setValue={(files: FileWithPath[]) => {
                                form.setFieldValue('images', files);
                            }}
                        />
                    )}
                    <Switch
                        offLabel="OFF"
                        onLabel="ON"
                        labelPosition="left"
                        label="Schedule for later"
                    />
                    <DatePickerInput
                        {...form.getInputProps('publishDate')}
                        disabled={form.getInputProps('publishDate').value !== 'schedule'}
                        valueFormat="DD.MM.YYYY"
                        key={form.key('publishDate')}
                        label="Publish date"
                        placeholder="publish date"
                    />
                    <Group mt="xl">
                        <ActionIcon variant="default" type="reset">
                            <IconTrash size={18} />
                        </ActionIcon>
                        <Button loading={submitLoading} type="submit">
                            Upload
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FormProvider>
    );
};
