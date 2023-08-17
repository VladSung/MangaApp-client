'use client';
import { IconButton, IconButtonProps, useColorScheme } from '@mui/material';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';

export const ToggleButton = (props: IconButtonProps) => {
    const { mode, setMode } = useColorScheme();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <IconButton aria-label="toggle theme" size="small" {...props} onClick={toggleMode}>
            <Brightness4RoundedIcon />
        </IconButton>
    );
};
