import {useContext} from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton, useTheme } from '@mui/material';
import { ThemeContext} from "src/utils/hooks/useNewTheme";

import {lightTheme, darkTheme} from 'src/configs/theme'

export const ThemeModeButton = ()=>{
    const theme = useTheme();

    const setTheme = useContext(ThemeContext);

    const newTheme =  theme.palette.mode === 'dark' ? lightTheme : darkTheme;

    const handleChangeTheme = () => {
      setTheme(newTheme);
    }
    return (
        <IconButton onClick={handleChangeTheme}>
            <Brightness4Icon/>
        </IconButton>
    )
}