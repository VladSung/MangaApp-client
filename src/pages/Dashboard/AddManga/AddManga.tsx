/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { Button, Typography, Autocomplete, Container, Stack, TextField, Select, MenuItem, IconButton, Unstable_Grid2 as Grid2 } from "@mui/material"
import { Delete, Save } from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import { css } from '@emotion/react'
import FileUpload from 'src/components/FileUpload/FileUpload';
import { GeneralSnackbar } from 'src/components/GeneralSnackbar';
import { CREATE_MANGA } from 'src/graphql/mutations/manga';
import { AuthContext } from 'src/utils/contexts/AuthContext';
import { GET_USER_MANGAS, GET_GENRES } from 'src/graphql/queries/manga';
import {LoadingButton, GoURLBack} from 'src/components/Buttons'

const ageRestrictions = [
    { title: 'Нет', id: '1' },
    { title: '12+', id: '2' },
    { title: '16+', id: '3' },
    { title: '18+', id: '4' },
];

const cssCardWrapper = css`
    min-height: 270px;
    width: 196px;
    p{
        width: 180px;
    }
`

const cssCard = css`
    width: 180px;
    height: 270px;
    margin-bottom: 8px;
`

interface FormInput {
    title: string
    description: string
    altTitle: string
    author: string
    artist: string
    publisher: string
    genres: Genres
    ageRestrictions: string
}
type Genre = { title: string, id: string }
type Genres = Array<Genre>


const AddManga = () => {

    const { data: genresData } = useQuery<{ genres: Genres }>(GET_GENRES)
    const auth = useContext(AuthContext).data?.auth;

    const [addManga, { data: newMangaData, loading, error }] = useMutation(CREATE_MANGA, {
        refetchQueries: [
            { query: GET_USER_MANGAS, variables: { publisherId: auth?.id } },
            'getUserMangas'
        ],
        context: {
            headers: {
                'apollo-require-preflight': true,
            },
        },
    });

    const { register, reset, control, handleSubmit, formState: { errors } } = useForm<FormInput>({ mode: 'onBlur', reValidateMode: 'onChange' });

    const [droppedFile, setDroppedFile] = useState<File | null>(null);

    const resetFields = () => {
        reset();
        setDroppedFile(null);
    };


    const onSubmit: SubmitHandler<FormInput> = (data) => {
        console.log(data)
        addManga({
            variables: {
                input: {
                    altTitle: data.altTitle,
                    title: data.title,
                    poster: droppedFile,
                    genres: data.genres,
                    description: data.description,
                    author: data.author,
                    ageRestrictions: data.ageRestrictions,
                }
            }
        })
    }


    const AlertActions = (<>
        <Button variant={'text'} to={`./../${newMangaData?.addManga?.id}/chapters`} component={Link} size={'small'}>Перейти к добавлению глав</Button>
    </>);

    return (
        <Container sx={{ mt: 2 }} >
            {
                error
                    ? <GeneralSnackbar severity={'error'} message={error?.message} />
                    : newMangaData && <GeneralSnackbar action={AlertActions} severity={'success'} message={'Произведение опубликовано.'} />
            }
            <Grid2 container component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
                <Grid2 xs={12}>
                    <GoURLBack>Панель управления</GoURLBack>
                </Grid2>
                <Grid2 sm={'auto'} xs={12} css={cssCardWrapper}>
                    <FileUpload css={cssCard} droppedFile={droppedFile} setDroppedFile={setDroppedFile} />
                    <Typography component='p' variant={'caption'}>Рекомендуемое разрешение 720х1080</Typography>
                </Grid2>


                <Grid2 sm={'auto'} sx={{ flex: { sm: '1 1 0' } }} xs={12}>
                    <Stack spacing={2}>
                        <TextField size={'small'} required error={!!errors?.title} helperText={errors?.title?.message} {...register('title', { required: 'Это поле обязательно' })} fullWidth label={'Название'} />
                        <TextField size={'small'} {...register('altTitle')} helperText={'используйте символ "/" для разделения названий'} fullWidth label={'Альтернативные названия'} />
                        <TextField rows={6} size={'small'} required error={!!errors?.description} helperText={errors?.description?.message} {...register('description', { required: 'Это поле обязательно' })} fullWidth multiline label={'Описание'} />
                    </Stack>
                </Grid2>

                <Grid2 container xs={12}>
                    <Grid2 sm={4} xs={12}>
                        <TextField size={'small'} required sx={{ gridColumn: '1/4' }} defaultValue={auth?.username} error={!!errors?.author} helperText={errors?.author?.message} {...register('author', { required: 'Это поле обязательно' })} fullWidth label={'Автор'} />
                    </Grid2>
                    <Grid2 sm={4} xs={12}>
                        <TextField size={'small'} defaultValue={auth?.username} sx={{ gridColumn: '4/8' }} {...register('artist')} fullWidth label={'Художник'} />
                    </Grid2>
                    <Grid2 sm={4} xs={12}>
                        <TextField size={'small'} sx={{ gridColumn: '8/13' }} {...register('publisher')} fullWidth label={'Издательство'} />
                    </Grid2>
                </Grid2>
                <Grid2 sm={4} xs={12} >

                    <Typography variant={'subtitle1'} sx={{ mb: 1 }}>Жанры * <Typography component='span' variant='caption'>(макс: 20)</Typography></Typography>
                    <Controller
                        control={control}
                        rules={{ required: 'поле обязательно' }}
                        name="genres"
                        render={({ field: { ref, onChange, ...field } }) => (
                            <Autocomplete
                                multiple
                                loading={!genresData?.genres}
                                options={genresData?.genres || []}
                                getOptionLabel={(option) => option?.title}
                                onChange={(_, data) => onChange(data)}
                                autoHighlight
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
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
                    <Typography variant={'subtitle1'} sx={{ mb: 1 }}>Возрастное ограничение</Typography>
                    <Select
                        {...register('ageRestrictions')}
                        defaultValue={'Нет'}
                    >
                        {ageRestrictions.map(item => <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)}
                    </Select>

                </Grid2>
                <Grid2 xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
                    <IconButton title={'Очистить поля'} size={'small'} onClick={resetFields} edge="start" aria-label="delete">
                        <Delete />
                    </IconButton>
                    <LoadingButton variant='contained' loading={loading} type='submit' startIcon={<Save/>}>Сохранить</LoadingButton>
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default AddManga
