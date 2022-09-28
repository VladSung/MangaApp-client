import {
    Alert,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
    useTheme
} from "@mui/material";
import {ProfileHeader} from "./ProfileHeader";
import {
    AttachMoneyOutlined,
    Notifications,
    PaletteOutlined,
    SecurityOutlined,
    TagOutlined
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import { useContext} from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { AUTH } from 'src/graphql/queries/user'
import { LOGOUT } from 'src/graphql/mutations/user'
import { AuthContext } from "src/utils/contexts/AuthContext";
import { ThemeContext} from "src/utils/hooks/useNewTheme";
import {lightTheme, darkTheme} from 'src/configs/theme'

export const Settings = ()=>{
    const client = useApolloClient();
    const {data} = useContext(AuthContext);

    const theme = useTheme();
    const setTheme = useContext(ThemeContext);

    const handleChangeTheme = () => {
        setTheme(theme.palette.mode === 'dark' ? lightTheme : darkTheme)
      }

    const [logout, {error}]  = useMutation(LOGOUT, {
        refetchQueries: [
            {query: AUTH},
            'auth'
          ],
    });

    const handleClick =()=>{
        logout();
        client.resetStore();
    }

    return (
        <div>
            <ProfileHeader/>
            {error && <Alert severity="error">Выход из аккаунта не удался</Alert>}
            <List aria-label={'Настройки'}>
                <ListItemButton to={'./notifications'} component={Link}>
                    <ListItemIcon>
                        <Notifications/>
                    </ListItemIcon>
                    <ListItemText primary={'Уведомления'}/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AttachMoneyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Подписки'}/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <TagOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Скрыть теги/жанры'}/>
                </ListItemButton>
                <ListItemButton onClick={handleChangeTheme}>
                    <ListItemIcon>
                        <PaletteOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Темная тема'}/>
                    <Switch checked={theme.palette.mode === 'dark'}/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <PaletteOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Своя тема'}/>
                </ListItemButton>
                
                <Divider/>
                <ListItemButton>
                    <ListItemIcon>
                        <SecurityOutlined/>
                    </ListItemIcon>
                    <ListItemText  primary={'Безопасность'}/>
                </ListItemButton>
            </List>
            <ListItem>
            {data?.auth &&
                <Button
                onClick={handleClick}
                sx={{margin: '32px 0'}}
                fullWidth={true}

                variant={'outlined'}>Выйти</Button>
            }
            </ListItem>
        </div>
    );
}