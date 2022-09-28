import { useQuery } from "@apollo/client";
import {Box,Container, Card,  CardMedia, Typography, Button, CardActionArea, CardContent} from "@mui/material"
import { useContext } from "react";
import {Link} from "react-router-dom";
import { GET_MANGAS } from "src/graphql/queries/manga";
import { Manga, Role } from "src/graphql/types";
import { AuthContext } from "src/utils/contexts/AuthContext";

export const Home = () => {

    const {data: authData} = useContext(AuthContext);
    
    const {data, loading} = useQuery(GET_MANGAS)

    const CardList =  data?.mangas?.map((manga: Manga)=>  (
            <Link key={manga.id} style={{textDecoration: 'none'}} to={`manga/${manga.id}`}>
                    <Card sx={{boxShadow:'0', width:'132px', background: 'none'}}>
                    <CardActionArea sx={{marginBottom: 1,}}>
                        <CardMedia
                            sx={{ width:'100%', height:'198px', pointerEvents: 'none', paddingTop:'200px', backgroundColor: '#d3d3d361'}}
                            component="div"
                            image={manga?.poster || ''}
                        />
                    </CardActionArea>
                        <CardContent sx={{padding:0}}>
                        <Typography gutterBottom variant="body1" component="div">
                            {manga?.title}
                        </Typography>
                        </CardContent>
                    </Card>

            </Link>
    ));
    return (
        <Container sx={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', textAlign: 'left',alignItems: 'flex-start'}}>
            {
            (!loading &&  authData?.auth?.roles?.includes(Role.Creator)) 
            && <Button component={Link} to={'/dashboard'} size='small' sx={{mb:3}} variant={'contained'} fullWidth>Перейти в панель управления</Button>
            }
            <Typography marginBottom={2} variant={'h4'} >Популярные</Typography>
            <Box sx={{width: '100%', overflowX: 'auto'}}>
                <Box sx={{display: 'flex', gap: '16px', width: 'max-content', paddingBottom: 2}}>
                    {CardList}
                </Box>
            </Box>
        </Container>
    )
}