'use client';
import { Box, Button, Modal, Textarea, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { createFormContext, UseFormReturnType } from '@mantine/form';
import { OneImageUpload } from '@src/entities/image-upload';

export interface FormInput {
    name: string;
    description: string;
    cover: FileWithPath | null;
}

type UseFormContext = () => UseFormReturnType<
    { cover: FileWithPath },
    (values: { cover: FileWithPath }) => { cover: FileWithPath }
>;
type AddProps = {
    t: (str: string) => string;
    open: boolean;
    handleClose: () => void;
    onSubmit: (values: FormInput) => void;
    ImageUpload: typeof OneImageUpload;
};

const [FormProvider, useFormContext, useForm] = createFormContext<FormInput>();

export const AddFormModal = ({ open, t, onSubmit, ImageUpload, handleClose }: AddProps) => {
    const form = useForm({
        name: 'add-team-form',
        initialValues: {
            name: '',
            description: '',
            cover: null
        },
    });

    return (
        <Modal
            opened={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-content"
            title={t('actions.create.title')}
        >
            <FormProvider form={form}>
                <Box
                    id="modal-modal-content"
                    style={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    component={'form'}
                    onSubmit={form.onSubmit(onSubmit)}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 1,
                        }}
                    >
                        <ImageUpload
                            imageFile={form.getValues().cover}
                            height={200}
                            width={200}
                            resolution="(256 x 256 px)"
                            useFormContext={useFormContext as unknown as UseFormContext}
                        />
                    </Box>
                    <TextInput
                        withAsterisk
                        {...form.getInputProps('name', { require: true })}
                        label={t('actions.create.inputs.name')}
                    />
                    <Textarea
                        {...form.getInputProps('description', { require: true })}
                        label={t('actions.create.inputs.description')}
                        autosize
                        minRows={1}
                        mb={16}
                    />
                    <Box>
                        <Button variant="contained" type="submit">
                            {t('actions.create.button')}
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </Modal>
    );
};
