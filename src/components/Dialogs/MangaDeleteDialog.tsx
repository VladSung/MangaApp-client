import Button from '@mui/material/Button';
import {Box, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GeneralSnackbar } from '../GeneralSnackbar';
import { useMutation } from '@apollo/client';
import { DELETE_MANGA } from 'src/graphql/mutations/manga';
import { Manga} from 'src/graphql/types'

type Props = {manga: Manga | null, handleClose:any}

type FormInput = { title: string}

const MangaDeleteDialog = ({manga, handleClose}:Props) => {

  const [deleteManga, {error}] = useMutation(DELETE_MANGA)
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormInput>({mode: 'all'});

    const handleCloseDialog = ()=>{
      reset();
      handleClose();
    }
    const onSubmit: SubmitHandler<FormInput> = data =>{
        if(!!manga && data.title === manga.title){
            deleteManga({variables:{id: manga.id},
              update(cache){
                cache.modify({
                  fields:{
                    mangas(extMangasRefs, {readField}){
                      return extMangasRefs.filter((mangaRef:any)=>manga.id !== readField('id', mangaRef))
                    }
                  }
                })
              }
            })
            handleCloseDialog()
        }
    };

  return (
    <div>
      {error && <GeneralSnackbar severity={'error'} message={error?.message} />}
      <Dialog open={!!manga} onClose={handleClose}>
        <DialogTitle>Вы уверены?</DialogTitle>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
                Это действие нельзя отменить. Это навсегда удалит <Typography component={'span'} sx={{fontWeight: 700}}>{manga?.title}</Typography>, а также относящиеся к ней комментарии и главы.  
                <br/>
                <br/>
                Введите ( <Typography component={'span'} sx={{fontWeight: 700}}>{manga?.title}</Typography> ) для подтверждения.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            size='small'
            fullWidth
            variant="outlined"
            defaultValue=''
            {...register("title", {validate: value=> value === manga?.title})
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button
            disabled={!!errors?.title}
            color='error' 
            variant='contained'
            type='submit'
          >Удалить мангу</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default MangaDeleteDialog