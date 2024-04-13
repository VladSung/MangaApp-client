import { Box, Button, Modal, Textarea, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { createFormContext, UseFormReturnType } from '@mantine/form';

import { ImageUpload } from '../../image-upload';

export interface FormInput {
    name: string;
    tagline: string;
    cover?: FileWithPath;
}

type UseFormContext = () => UseFormReturnType<{ cover: FileWithPath }, (values: { cover: FileWithPath }) => { cover: FileWithPath }>
type AddProps = {
    open: boolean;
    handleClose: () => void;
    onSubmit: (values: FormInput) => void,
    ImageUpload: typeof ImageUpload;
};


const [FormProvider, useFormContext, useForm] =
    createFormContext<FormInput>();

export const Add = ({ open, onSubmit, ImageUpload, handleClose }: AddProps) => {
    const form = useForm({
        name: 'add-team-form', initialValues: {
            name: '',
            tagline: '',
        }
    })

    return (
        <Modal
            opened={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-content"
            title="Создать новую команду"
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
                        <ImageUpload height={200} width={200} resolution='(256 x 256 px)' useFormContext={useFormContext as unknown as UseFormContext} />
                    </Box>
                    <TextInput
                        withAsterisk
                        {...form.getInputProps('name', { require: true })}
                        label={'Название'}
                    />
                    <Textarea
                        {...form.getInputProps('tagline', { require: true })}
                        label={'Cлоган команды'}
                        autosize
                        minRows={1}
                        mb={16}
                    />
                    <Box>
                        <Button variant="contained" type="submit">
                            Добавить
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </Modal>
    );
};
