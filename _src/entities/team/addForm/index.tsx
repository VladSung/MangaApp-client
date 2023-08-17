import { Box, Button, Modal, PopoverPaper, TextField, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export interface FormInput {
    name: string;
    tagline: string;
    image: FileList;
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

type AddProps = {
    open: boolean;
    handleClose: () => void;
    onSubmit: SubmitHandler<FormInput>;
    ImageUpload: React.ElementType;
};

export const Add = ({ open, onSubmit, ImageUpload, handleClose }: AddProps) => {
    const methods = useForm<FormInput>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-content"
        >
            <PopoverPaper sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    sx={{ textAlign: 'center', mb: 2 }}
                >
                    Создать новую команду!
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        id="modal-modal-content"
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        component={'form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 1,
                            }}
                        >
                            <ImageUpload
                                recommendedResolution="160x160"
                                sx={{ width: 160, height: 160 }}
                            />
                        </Box>
                        <TextField
                            size={'small'}
                            required
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                            {...register('name', { required: 'Это поле обязательно' })}
                            fullWidth
                            label={'Название'}
                        />
                        <TextField
                            size={'small'}
                            error={!!errors?.tagline}
                            helperText={errors?.tagline?.message}
                            {...register('tagline')}
                            fullWidth
                            label={'Cлоган команды'}
                            sx={{ mb: 2 }}
                        />
                        <Box>
                            <Button variant="contained" type="submit">
                                Добавить
                            </Button>
                        </Box>
                    </Box>
                </FormProvider>
            </PopoverPaper>
        </Modal>
    );
};
