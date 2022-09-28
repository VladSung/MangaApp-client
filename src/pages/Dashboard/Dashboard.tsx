import { useQuery } from "@apollo/client";
import { Container, Button, Typography, List, ListItem, ListItemAvatar, IconButton, ListItemText, Avatar } from "@mui/material"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GeneralSnackbar } from "src/components/GeneralSnackbar";
import { Loader } from "src/components/Loader";
import { AuthContext } from "src/utils/contexts/AuthContext";
import { PlaylistAdd, Edit, Delete } from '@mui/icons-material';
import { GET_USER_MANGAS } from "src/graphql/queries/manga";
import { Manga } from "src/graphql/types";
import MangaDeleteDialog from "src/components/Dialogs/MangaDeleteDialog";


const Dashboard = ()=>{

    const auth = useContext(AuthContext).data?.auth;

    const {data, loading, error} = useQuery(GET_USER_MANGAS, { variables: {publisherId: auth?.id}});

    const [currentManga, setCurrentManga] = useState<Manga  | null>(null);

    const handleOpen = (manga: Manga)=>{
        setCurrentManga(manga)
    }

    const handleClose = ()=>{
        setCurrentManga(null)
    }

    const Mangas = data?.mangas?.map((manga: Manga)=>{

        const publishDate = new Date(Date.parse(manga?.publishedAt || '')).toLocaleString();

        return(
                <ListItem key={manga?.id}>
                <ListItemAvatar>
                    <Avatar variant={'rounded'} src={manga?.poster}/>
                </ListItemAvatar>
                <ListItemText primary={manga?.title} secondary={publishDate} />
                <IconButton size={'small'} component={Link} to={`./${manga?.id}/chapters`} sx={{mr: 2}}><PlaylistAdd /></IconButton>
                <IconButton size={'small'} sx={{mr: 2}} component={Link} to={`./${manga?.id}`}><Edit /></IconButton>
                <IconButton size={'small'} onClick={()=>handleOpen(manga)} color='error' sx={{mr: 2}}><Delete /></IconButton>
                </ListItem>
        )
    })

    return (
        <Container>
            
            <MangaDeleteDialog manga={currentManga} handleClose={handleClose}/>
            {error && <GeneralSnackbar severity={'error'} message={error?.message}/>}
            <Button component={Link} to={'./create'} size={'small'} sx={{mt:3, mb:3}} variant={'contained'} fullWidth>Опубликовать новинку</Button>
            <Typography sx={{mb:1}} component={'h2'} variant={'h5'} >Ваши произведения</Typography>
                {loading 
                    ? <Loader/>
                    : <List>
                        {Mangas}
                    </List>
                }
                
        </Container>
    )
}

export default Dashboard;