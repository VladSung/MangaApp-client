import { Box, SxProps, Theme, Typography } from '@mui/material';

type Properties = {
    errorCode: string;
    message: string;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
};

export const Error = ({ errorCode, sx, message, children }: Properties) => {
    return (
        <Box
            sx={{
                ...sx,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ mb: 3 }} variant="h2">
                {errorCode}
            </Typography>
            <Typography
                sx={{ textAlign: 'center', mb: children ? 6 : 0, maxWidth: 360 }}
                variant="subtitle1"
                component={'p'}
            >
                {message}
            </Typography>
            {children}
        </Box>
    );
};
