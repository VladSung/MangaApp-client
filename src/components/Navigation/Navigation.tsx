import {
    BottomNavigation, BottomNavigationAction
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import navigationConfig from "src/configs/navigation.config";

export const Navigation = ()=>{

    const Navigate = useNavigate();
    const location = useLocation();
    const onHandleChange = (e:any, value:string)=>{
        Navigate(value);
    }

    const NavigationListItems = navigationConfig.map((navItem)=>
            <BottomNavigationAction key={navItem.path}
                                    value={navItem.path}
                                    sx={(theme)=>(location.pathname === navItem.path ? {color: theme.palette.primary.main}: {})}
                                    label={navItem.title}
                                    icon={location.pathname === navItem.path ? <navItem.ActiveIcon/> : <navItem.Icon/>}/>
    );

    return(
        <BottomNavigation onChange={onHandleChange} showLabels={true} sx={(theme)=>({borderTop: `1px solid ${theme.palette.divider}`, position: 'sticky', bottom: 0})}>
            {NavigationListItems}
        </BottomNavigation>
    );
}