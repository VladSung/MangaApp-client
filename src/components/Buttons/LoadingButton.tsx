import { Button, ButtonProps, CircularProgress } from "@mui/material"

interface Props extends ButtonProps {
    loading: boolean
}

const LoadingButton = ({loading, children, startIcon, ...props}:Props)=>{

    return(
        <Button
            {...props}
            disabled={loading}
            startIcon={ loading ? <CircularProgress size={24} /> : startIcon}
            >
            {children}
        </Button>
    )
}

export default LoadingButton