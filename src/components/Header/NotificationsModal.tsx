import {Badge} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useState} from "react";

type Notification = {
    id: string
    title: string
    message: string,
    date: Date
}

type Props = {
    notifications: [Notification] | null
}

export const NotificationsModal = ({notifications}:Props) =>{

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const notificationsCount = 0;

    // const notificationsList = notificationsCount !==1 && notifications.map((n)=><MenuItem key={n.id} onClick={handleClose}>
    //     <p>{n.title}</p>
    //     <p>{n.message}</p>
    //     <span>{n.date.toLocaleDateString()}</span>
    // </MenuItem>);

    return(
        <>
        <IconButton
            size="large"
            aria-label="notifications of current user"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <Badge badgeContent={notificationsCount} max={99} color="primary">
                <NotificationsOutlinedIcon />
            </Badge>
        </IconButton>
    <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        {/* {notificationsList} */}
    </Menu>
</>
    )
}