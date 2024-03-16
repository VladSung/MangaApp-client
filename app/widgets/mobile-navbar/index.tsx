'use client'
import { BottomNavigation, BottomNavigationAction, Paper, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';

export const MobileNavbar = () => {

    return (
        <Paper sx={(theme) => ({
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }, position: 'fixed', bottom: 0, left: 0, right: 0, overflow: 'hidden', borderRadius: '24px 24px 0 0'
        })} elevation={1}>
            <BottomNavigation showLabels value='home' sx={{ paddingTop: 1 }}>
                <BottomNavigationAction sx={{ gap: .5 }} value='home' label={<Typography variant='caption'>Главная</Typography>} icon={<HomeRoundedIcon fontSize='small' />} />
                <BottomNavigationAction sx={{ gap: .5 }} value='catalog' label={<Typography variant='caption'>Поиск</Typography>} icon={<SearchRoundedIcon fontSize='small' />} />
                <BottomNavigationAction sx={{ gap: .5 }} value='library' label={<Typography variant='caption'>Библиотека</Typography>} icon={<BookmarksRoundedIcon fontSize='small' />} />
                <BottomNavigationAction sx={{ gap: .5 }} value='more' label={<Typography variant='caption'>Больше</Typography>} icon={<MoreVertIcon fontSize='small' />} />
            </BottomNavigation>
        </Paper>
    )
}