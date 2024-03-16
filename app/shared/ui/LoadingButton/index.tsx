import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface Props extends ButtonProps {
    loading: boolean;
}

export const LoadingButton = ({ loading, children, startIcon, ...properties }: Props) => {
    return (
        <Button
            {...properties}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : startIcon}
        >
            {children}
        </Button>
    );
};

