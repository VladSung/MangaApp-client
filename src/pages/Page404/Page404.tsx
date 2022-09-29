import { Box, Typography } from '@mui/material';
import { GoURLBack } from 'src/components/Buttons';

const Page404 = ()=>{
    return (
        <Box>
            <GoURLBack/>
            <Typography>Страница не найдена</Typography>
        </Box>
    )
}

export default Page404;