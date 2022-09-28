import {useLocation} from "react-router-dom";
import {ImageList, Box, ImageListItem, Skeleton, Typography} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "src/components/Loader";
import useWindowDimensions from "src/utils/hooks/useWindowDimensions";

const GET_MANGA_BY_ID = gql`
query getManga($id: GraphQLObjectId!){
    manga(id: $id){
        title
        chapters{
            title
            parts
        }
    }
}
`

export const Reader = ()=>{
    const location = useLocation().pathname?.split('/');
    const mangaId = location[2] || '';
    const chapterId = location[4] || 0;

    const {data, loading} = useQuery(GET_MANGA_BY_ID, {variables:{id: mangaId}})

    const Chapter = ()=>{
        if(loading) (
            <ImageListItem>
                <Skeleton height='80vh' variant='rectangular'>
                </Skeleton>
            </ImageListItem>
        )

        // есть ли глава

        if(!data?.manga?.chapters?.[+chapterId -1 ]?.parts) (
            <ImageListItem>
                <Box height='80vh' sx={{bgcolor: '#ff10100d'}}>
                    <Typography>Ошибка загрузки</Typography>
                </Box>
            </ImageListItem>
            
        )

        return data.manga.chapters[+chapterId -1 ]?.parts?.map((item:string)=>{
            return(
                    <ImageListItem key={item}>
                        <img src={item} alt=""/>
                    </ImageListItem>
            )
        })
        
    }

    return (
        <>
            <Typography>Глава {chapterId}. {data?.manga?.chapters?.[+chapterId -1]?.title}</Typography>
            <ImageList aria-disabled sx={{display: 'block'}}>
            <ImageListItem>
                    <img src={'item'} alt=""/>
            </ImageListItem>
                {loading ? <Loader/> : <Chapter/>}
            </ImageList>
        </>
    )
}