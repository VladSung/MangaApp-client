/** @jsxImportSource @emotion/react */
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import {
    Autocomplete,
    Container,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { MaturityRatings } from '@/_src/shared/api/graphql/graphql';
import { LoadingButton } from '@/_src/shared/ui/LoadingButton';

import { FormInput, Genres } from './types';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ImageUpload } from '../../imageUpload';

interface Props {
    selectionValues: {
        loading: boolean;
        tags?: Genres;
        genres?: Genres;
        maturityRatings: Genres;
    };
    onSubmit: SubmitHandler<FormInput>;
    defaultValues?: {
        title?: string;
        cover?: string;
        description?: string;
        altTitle?: string;
        author?: string;
        artist?: string;
        publisher?: string;
        genres?: Genres;
        maturityRating?: keyof typeof MaturityRatings;
    };
}

export const AddForm = ({ onSubmit, defaultValues, selectionValues }: Props) => {
    const methods = useForm<FormInput>({
        mode: 'onBlur',
        defaultValues: {
            ...defaultValues,
            genres: defaultValues?.genres || [],
        },
        reValidateMode: 'onChange',
    });

    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = methods;

    const resetFields = () => {
        reset();
    };
    // const AlertActions = (<>
    //     <Button variant={'text'} to={`./../${newMangaData?.addManga?.id}/chapters`} component={Link} size={'small'}>Перейти к добавлению глав</Button>
    // </>);

    // {
    //     error
    //         ? <GeneralSnackbar severity={'error'} message={error?.message} />
    //         : newMangaData && <GeneralSnackbar action={AlertActions} severity={'success'} message={'Произведение опубликовано.'} />
    // }

    return (
        <Container sx={{ mt: 2, padding: '32px 24px' }}>
            <FormProvider {...methods}>
                <Grid2 container component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
                    <Grid2
                        sm={'auto'}
                        xs={12}
                        sx={{
                            minHeight: 270,
                            width: 196,
                            p: {
                                width: 180,
                            },
                        }}
                    >
                        <ImageUpload recommendedResolution="720х1080" />
                    </Grid2>

                    <Grid2 sm={'auto'} sx={{ flex: { sm: '1 1 0' } }} xs={12}>
                        <Stack spacing={2}>
                            <TextField
                                size={'small'}
                                required
                                error={!!errors?.title}
                                helperText={errors?.title?.message}
                                {...register('title', { required: 'Это поле обязательно' })}
                                fullWidth
                                label={'Название'}
                            />
                            <TextField
                                size={'small'}
                                {...register('altTitle')}
                                helperText={'используйте символ "/" для разделения названий'}
                                fullWidth
                                label={'Альтернативные названия'}
                            />
                            <TextField
                                rows={6}
                                size={'small'}
                                required
                                error={!!errors?.description}
                                helperText={errors?.description?.message}
                                {...register('description', { required: 'Это поле обязательно' })}
                                fullWidth
                                multiline
                                label={'Описание'}
                            />
                        </Stack>
                    </Grid2>

                    <Grid2 container xs={12}>
                        <Grid2 sm={4} xs={12}>
                            <TextField
                                size={'small'}
                                required
                                sx={{ gridColumn: '1/4' }}
                                error={!!errors?.author}
                                helperText={errors?.author?.message}
                                {...register('author', { required: 'Это поле обязательно' })}
                                fullWidth
                                label={'Автор'}
                            />
                        </Grid2>
                        <Grid2 sm={4} xs={12}>
                            <TextField
                                size={'small'}
                                sx={{ gridColumn: '4/8' }}
                                {...register('artist')}
                                fullWidth
                                label={'Художник'}
                            />
                        </Grid2>
                        <Grid2 sm={4} xs={12}>
                            <TextField
                                size={'small'}
                                sx={{ gridColumn: '8/13' }}
                                {...register('publisher')}
                                fullWidth
                                label={'Издательство'}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 sm={4} xs={12}>
                        <Typography variant={'subtitle1'} sx={{ mb: 1 }}>
                            Жанры *
                            <Typography component="span" variant="caption">
                                (макс: 20)
                            </Typography>
                        </Typography>
                        <Controller
                            control={control}
                            rules={{ required: 'поле обязательно' }}
                            name="genres"
                            render={({ field: { ref, onChange, ...field } }) => (
                                <Autocomplete
                                    value={field.value}
                                    options={selectionValues?.genres || []}
                                    isOptionEqualToValue={(option, value) =>
                                        option.title === value.title
                                    }
                                    multiple
                                    loading={!selectionValues?.loading}
                                    getOptionLabel={(option) => option?.title}
                                    onChange={(_, data) => onChange(data)}
                                    autoHighlight
                                    filterSelectedOptions
                                    renderInput={(parameters) => (
                                        <TextField
                                            {...field}
                                            {...parameters}
                                            placeholder={'Введите жанр'}
                                            error={!!errors?.genres}
                                            helperText={errors?.genres?.message}
                                            fullWidth
                                            inputRef={ref}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid2>
                    <Grid2 sm={4} xs={12}>
                        <Typography variant={'subtitle1'} sx={{ mb: 1 }}>
                            Возрастное ограничение
                        </Typography>
                        <Select
                            {...register('maturityRating')}
                            defaultValue={defaultValues?.maturityRating}
                        >
                            {selectionValues?.maturityRatings.map((item) => (
                                <MenuItem key={item.title} value={item.title}>
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>
                    <Grid2
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}
                    >
                        <IconButton
                            title={'Очистить поля'}
                            size={'small'}
                            onClick={resetFields}
                            edge="start"
                            aria-label="delete"
                        >
                            <Delete />
                        </IconButton>
                        <LoadingButton
                            variant="contained"
                            loading={selectionValues.loading}
                            type="submit"
                            startIcon={<Save />}
                        >
                            Опубликовать
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </FormProvider>
        </Container>
    );
};
