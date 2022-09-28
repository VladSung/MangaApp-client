import { useQuery, useMutation } from "@apollo/client";
import { Button, Container, TextField, Typography, Unstable_Grid2 as Grid2 } from "@mui/material"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "src/components/Loader";
import ManyFilesUpload from "src/components/ManyFilesUpload/ManyFilesUpload";
import { GET_MANGA_BY_ID } from 'src/graphql/queries/manga'
import { ADD_MANGA_CHAPTER } from 'src/graphql/mutations/manga'
import { SubmitHandler, useForm } from "react-hook-form";
import { GeneralSnackbar } from "src/components/GeneralSnackbar";
import { LoadingButton, GoURLBack } from "src/components/Buttons";
import { Save} from '@mui/icons-material'

type FormInput = {
    title: string
}

const AddChapter = () => {

    const location = useLocation().pathname.split('/');
    const mangaId = location[location.length - 2];

    const { data: mangaData, error } = useQuery(GET_MANGA_BY_ID, { variables: { id: mangaId } })
    const [addChapter, { data, loading, error: addChapterError }] = useMutation(ADD_MANGA_CHAPTER, {
        context: {
            headers: {
                'apollo-require-preflight': true,
            },
        },
    })

    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormInput>({ mode: 'onBlur', reValidateMode: 'onChange' });

    const resetFields = () => {
        reset();
        setDroppedFiles(null);
    };


    const onSubmit: SubmitHandler<FormInput> = (data) => {
        addChapter({
            variables: {
                input: {
                    id: mangaId,
                    chapter: {
                        title: data.title,
                        parts: droppedFiles
                    }
                }
            }
        })
    }

    console.log(data)

    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null)

    console.log(data?.addMangaChapters?.chapters?.length)
    const AlertActions = (<>
        <Button variant={'text'} to={`/manga/${data?.addMangaChapters?.id}/ch/${data?.addMangaChapters?.chapters?.length}`} component={Link} size={'small'}>Перейти к главе</Button>
    </>);

    return (
        <Container sx={{ mt: 2 }}>
            {
                (error|| addChapterError)
                    ? <GeneralSnackbar severity={'error'} message={error?.message || addChapterError?.message || ''} />
                    : data && <GeneralSnackbar action={AlertActions} severity={'success'} message={'Глава успешно добавлена.'} />
            }
            {loading
                ? <Loader />
                : <>
                    <Grid2 container spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
                        <Grid2 xs={12}>
                            <GoURLBack/>
                            <Typography>{mangaData?.manga?.title}</Typography>
                        </Grid2>
                        <Grid2 xs={'auto'} spacing={2}>
                            <TextField size='small'
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                                sx={{ width: 72 }}
                                type='number'
                                disabled
                                value={mangaData?.manga?.chCount + 1 || 1}
                                label={'Глава'} />
                        </Grid2>
                        <Grid2 xs={'auto'}>
                            <TextField size='small' {...register('title')} label={'Название главы'} />
                        </Grid2>
                        <ManyFilesUpload droppedFiles={droppedFiles} setDroppedFiles={setDroppedFiles} />
                        <Button type='reset' onClick={resetFields} >Сброс</Button>                        
                        <LoadingButton variant='contained' loading={loading} type='submit' startIcon={<Save/>}>Сохранить</LoadingButton>
                    </Grid2>
                </>
            }
        </Container>
    )
}

export default AddChapter;