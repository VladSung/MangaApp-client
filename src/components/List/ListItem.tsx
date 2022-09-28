import { ListItem } from "@mui/material"
import style from './ListItem.module.scss'

const MyListItem = (props:any)=>{
    
    return(
        <ListItem
        className={style.listItem}
        {...props}
        >
        </ListItem>
    )
}

export default MyListItem;