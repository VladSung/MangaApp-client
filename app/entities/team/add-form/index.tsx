import { Box, Button, Modal, TextInput, Title } from '@mantine/core';
import { UseFormReturnType, createFormContext } from '@mantine/form';
import { FileWithPath } from '@mantine/dropzone';

export interface FormInput {
    name: string;
    tagline: string;
    cover?: FileWithPath;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};
type Props = {
    initialImage?: string,
    height?: number
    width?: number
    resolution?: string
    useFormContext: () => UseFormReturnType<FormInput, (values: FormInput) => FormInput>
}

type AddProps = {
    open: boolean;
    handleClose: () => void;
    onSubmit: (values: FormInput) => void,
    ImageUpload: ({ initialImage, useFormContext }: Props) => JSX.Element;
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
        >
            <FormProvider form={form}>
                <Title
                    id="modal-modal-title"
                    order={5}
                    variant="h2"
                    style={{ textAlign: 'center' }}
                    mb='md'
                >
                    Создать новую команду!
                </Title>

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
                        <ImageUpload height={200} width={200} resolution='(256 x 256 px)' useFormContext={useFormContext} />
                    </Box>
                    <TextInput
                        size={'small'}
                        withAsterisk
                        {...form.getInputProps('name', { require: true })}
                        label={'Название'}
                    />
                    <TextInput
                        size={'small'}
                        {...form.getInputProps('tagline', { require: true })}
                        label={'Cлоган команды'}
                        style={{ mb: 2 }}
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
