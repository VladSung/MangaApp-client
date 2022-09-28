import { Close } from "@mui/icons-material";
import { Alert, AlertProps, IconButton, Snackbar } from "@mui/material"
import { useEffect, useState } from "react";

interface Props extends AlertProps {
    message: string
}

const GeneralSnackbar  = ({message, action, ...props}:Props)=> {
    
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    }
    useEffect(()=>{
        if(message) setOpen(true)
    }, [message])

    const actions = (<>
        {action}
    <IconButton onClick={handleClose} size={'small'}><Close/></IconButton>
    </>)

    return (
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} action={actions} {...props}>{message}</Alert>
                </Snackbar>
    )
}

export default GeneralSnackbar;