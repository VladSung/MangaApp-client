import { Button, ButtonProps } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { NavigateBefore } from '@mui/icons-material';

const GoURLBack = ({children}:ButtonProps)=>{
    const navigate = useNavigate();
    return (
        <Button onClick={()=>navigate(-1)} size='small' variant='text'><NavigateBefore/>{children || 'Назад'}</Button>
    )
}

export default GoURLBack