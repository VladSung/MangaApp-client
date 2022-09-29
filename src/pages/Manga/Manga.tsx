import { useQuery } from "@apollo/client";
import { Unstable_Grid2 as Grid2, Stack, Typography, CardMedia, Container, List, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import GoBack from "src/components/Buttons/GoURLBack";
import { GET_MANGA_BY_ID } from "src/graphql/queries/manga";
import Page404 from "../Page404/Page404";

export const Manga = ()=>{
    const location = useLocation().pathname?.split('/');
    const mangaId = location[2] || '';
    
        const { data, loading} = useQuery(GET_MANGA_BY_ID   , { variables: { id: mangaId } });
        if(!data?.manga) return <Page404/>
        return (
            <Container>
                <Grid2 container spacing={3}>
                    <Grid2 xs={12}>
                        <GoBack/>
                    </Grid2>
                    
                    <Grid2 sm={'auto'} xs={12}>
                        <CardMedia 
                            sx={{ width:'180px', height:'270px',borderRadius:1, pointerEvents: 'none', backgroundColor: '#d3d3d361'}}
                            component="div" image={data.manga?.poster}/>
                    </Grid2>
                    

                    <Grid2 sm={'auto'} sx={{ flex: { sm: '1 1 0' } }} xs={12}>
                        <Stack spacing={2}>
                            <Typography  variant='caption'>{data.manga?.altTitle}</Typography>
                            <Typography variant='subtitle1'>{data.manga?.title}</Typography>
                            <Typography variant='body2' >{data.manga?.description}</Typography>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={12}>
                        <Typography>Главы</Typography>
                        <List>
                            {data.manga?.chapters && data.manga?.chapters?.map((chapter:any)=>(
                                <ListItemButton key={chapter.order} component={Link} to={`./ch/${chapter.order}`}>
                                    <ListItemIcon>
                                    {chapter.order}
                                    </ListItemIcon>
                                    <ListItemText secondary={`${chapter.title}`} />
                                </ListItemButton>))
                            }
                        </List>
                    </Grid2>
                </Grid2>
            </Container>
        )
}