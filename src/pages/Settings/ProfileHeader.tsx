/** @jsxImportSource @emotion/react */
import {Avatar, Box, Button, Paper, Skeleton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useQuery, gql } from "@apollo/client";
import {UserFragment} from 'src/graphql/queries/user'
import {css} from '@emotion/react'

const cssProfileHeader = css`
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: center;
`
    
const cssAvatar= css`
    width: 40px;
    height: 40px;
`
    
const cssUsername= css`
    font-weight: 700;
    font-size: 20px;
`

const cssProfileLink = css`
    margin-left: auto;
    font-size: 12px;
    display: flex;
    align-items: center;

    a {
        color: var(--primary-color);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
    }

    svg {
        font-size: 12px;
    }
`
    
const cssText = css`
    font-weight: 700;
    display: inline-flex;
    align-items: center;

    svg {
        padding-right: 4px;
    }
`

const AUTH = gql`
    ${UserFragment}
    query auth{
        auth{
            ...UserFragment
            wallet{
                money
                tokens
            }
        }
    }
`

export const ProfileHeader = ()=>{

    const {loading, data} = useQuery(AUTH);

    return(
        <Paper elevation={0} sx={theme=>({background: theme.extPalette.background.primary})}>
            <Box css={cssProfileHeader}>

                {loading
                    ? <Skeleton variant='circular' css={cssAvatar}/>
                    : <Avatar css={cssAvatar} src={data?.auth?.photoURL } alt={data?.auth?.username}/>
                }
                
                <Typography css={cssUsername}>{data?.auth?.username}</Typography>

                <Typography css={cssProfileLink} >

                    <Link
                        to={`/profile`}>
                        Перейти в профиль <ArrowForwardIosIcon/>
                    </Link>
                </Typography>

            </Box>
            <Box css={cssProfileHeader}>
                <Typography css={cssText}>
                    <AccountBalanceWalletOutlinedIcon />
                    {data?.auth?.wallet.money}
                </Typography>
                <Typography css={cssText}>
                    <ConfirmationNumberOutlinedIcon />
                    {data?.auth?.wallet.tokens}
                </Typography>
                <Button size={'small'} variant={'outlined'}>Пополнить</Button>
            </Box>
        </Paper>
    )
}
