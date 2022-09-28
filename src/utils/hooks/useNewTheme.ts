import { createContext, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {theme as initialTheme} from "src/configs/theme";
import { useLocalStorage } from "./useLocalStorage";

interface PropsThemeType {
    mode: string,
    primary?: string,
    secondary?: string

}
export type newThemeType = PropsThemeType;

type ThemeContextType = (theme: newThemeType | any)=>void;
const ThemeContext = createContext<ThemeContextType>((theme)=>{});

const useNewTheme = () => {
    const [localTheme, setLocalTheme] = useLocalStorage('theme');

    const [theme, setTheme] = useState(createTheme(initialTheme, localTheme));

    const setNewTheme = (palette: newThemeType)=>{
        setLocalTheme(createTheme(initialTheme, palette));
        setTheme(createTheme(initialTheme, palette));
    };

    return [theme, setNewTheme, localTheme] as const;
};

export {useNewTheme, ThemeContext};