import { Box, CircularProgress } from "@mui/material"

const Loader = (props: any)=>{
    return (
        <Box sx={{display: 'flex', boxSizing: 'border-box', padding: '40px', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress sx={{width: 4, height: 4, }} {...props}/>
        </Box>
    )
}

export default Loader;