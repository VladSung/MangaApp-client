// import {NotificationsModal} from "./NotificationsModal";
import {useContext} from 'react'
import { Avatar, AppBar, Toolbar, Box,  Button } from '@mui/material';
import {Link} from "react-router-dom";
import { AuthContext } from "src/utils/contexts/AuthContext";

export default function Header() {
    const {data, loading} = useContext(AuthContext);

    return (
            <AppBar position="static" color={'default'}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'  }} variant={"dense"}>
                <Link to={'/'}>APP</Link>
                    <Box sx={{display: 'flex', gap:2, alignItems: 'center'}}>
                    {!loading && data?.auth ? (
                            <>
                            {/* <NotificationsModal notifications={notifications}/> */}
                                <Link to={'/settings'}>
                                    <Avatar src={data?.auth.photoURL} alt={data?.auth.username} />
                                </Link>
                            </>
                            )
                    : <Button variant={'outlined'} to={'/login'} component={Link}>Войти</Button>
                    }
                    </Box>
                </Toolbar>
            </AppBar>
    );
}