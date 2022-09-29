import { css, ListItem } from "@mui/material"

const cssListItem = css`
    border-radius: 8px;
    border: 1px solid rgba(69, 69, 69, 0.496);
    background: rgba(86, 205, 238, 0.03);
    margin: 8px 0;
    gap: 4px;

    button {
        font-size: 12px;

        svg {
            width: 20px;
            height: 20px;
        }
    }
`

const MyListItem = (props:any)=>{
    
    return(
        <ListItem
        css={cssListItem}
        {...props}
        >
        </ListItem>
    )
}

export default MyListItem;