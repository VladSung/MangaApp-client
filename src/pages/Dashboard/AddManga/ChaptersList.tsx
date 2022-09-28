import { Delete, Edit } from "@mui/icons-material";
import { Box, ListItemIcon, List, ListItem, Typography,IconButton, ListItemButton, ListItemText } from "@mui/material";
import MyListItem from "src/components/List/ListItem";

const ChaptersList = (props: any)=>{

    return(
        <Box  {...props}>
            <Typography variant={'h5'}>Список глав</Typography>
            <List>
                <MyListItem>
                    <ListItemText primary='Глава 1'/>
                    <ListItemText secondary='22.01.2022'/>
                    <IconButton size={'small'} aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton size={'small'} edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                </MyListItem>
                <MyListItem>
                    <ListItemText primary='Глава 2' />
                    <ListItemText secondary='22.01.2022'/>
                    <IconButton size={'small'} aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton size={'small'} edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                </MyListItem>
            </List>
        </Box>
    )
}

export default ChaptersList;