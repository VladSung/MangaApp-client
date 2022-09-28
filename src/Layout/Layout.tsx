import {Header} from "../components/Header";
import {BottomNavigation, Box, Grid} from "@mui/material";
import {Outlet, useLocation} from "react-router-dom";
import {Navigation} from "src/components/Navigation/Navigation";
import { GoURLBack } from "src/components/Buttons";

const ReaderNavigation = ()=>{
    return (
        <BottomNavigation onChange={()=>{}} showLabels={true} sx={(theme)=>({borderTop: `1px solid ${theme.palette.divider}`, position: 'sticky', bottom: 0})}>
            <GoURLBack/>
        </BottomNavigation>
    )
}
const Layout = ()=>{
    const location = useLocation();

        return(
            <Grid  className="App" sx={(theme)=>({ display:'flex', flexDirection: 'column', minHeight: '100vh'})}>
                <Header/>
                <Box component={'main'} sx={{display: 'flex', flexDirection: 'column', flexGrow:1, minHeight: '100%'}}>
                    <Outlet/>
                </Box>
                {
                    location.pathname?.split('/')[3]?.indexOf('ch') > -1
                    ? <ReaderNavigation/>
                :
                    <Navigation/>}
            </Grid>
        );
}

export default Layout;