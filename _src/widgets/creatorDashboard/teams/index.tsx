/** @jsxImportSource @emotion/react */
'use client';
import { useQuery } from '@apollo/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Avatar, Box, IconButton, List, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { Sidebar } from '@/_src/entities/sidebar';
import { graphql } from '@/_src/shared/api/graphql';
import { TeamsQuery } from '@/_src/shared/api/graphql/graphql';
import { ListItemWithAvatar } from '@/_src/shared/ui/ListItemWithAvatar';

import { Add as AddTeam } from './add';
import { getCldImageUrl } from 'next-cloudinary';

const teamsQuery = graphql(`
    query Teams {
        teams {
            id
            name
            avatar
        }
    }
`);

type TeamListProps = {
    teams: TeamsQuery['teams'];
};

const TeamList = ({ teams }: TeamListProps) => {
    if (!teams) {
        return <div>Еще нет созданных команд</div>;
    }

    const list = teams.map((team) => {
        if (!team?.avatar || !team?.id || !team?.name) {
            return;
        }

        return (
            <ListItemWithAvatar
                sx={{
                    '&.active': {
                        background: (theme) =>
                            `rgb(${theme.vars.palette.primary.mainChannel} / .2)`,
                    },
                }}
                key={team.id}
                href={team.id}
                title={team.name}
                avatar={
                    <Avatar
                        sx={{ height: 40, width: 40 }}
                        src={getCldImageUrl({
                            src: team?.avatar || '',
                            width: 40,
                            height: 40,
                            gravity: 'face',
                            transformations: ['media_lib_thumb'],
                            crop: 'thumb',
                        })}
                        variant={'rounded'}
                    />
                }
            >
                <Typography
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {team.name}
                </Typography>
            </ListItemWithAvatar>
        );
    });

    return <List>{list}</List>;
};

export const TeamsSidebar = () => {
    const { data, loading } = useQuery(teamsQuery);

    const [openTeamForm, setOpenTeamForm] = useState<boolean>(false);

    const handleCloseTeamForm = () => {
        setOpenTeamForm(false);
    };

    const handleOpenTeamForm = () => {
        setOpenTeamForm(true);
    };

    const Header = (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
            }}
        >
            <Typography variant="h6" component="div">
                Команды
            </Typography>
            <IconButton onClick={handleOpenTeamForm}>
                <AddRoundedIcon />
            </IconButton>
        </Box>
    );

    return (
        <>
            <Sidebar open={true} Header={Header} sx={{ width: 200 }}>
                {loading ? (
                    <>
                        <Stack direction="row" padding={[1, 2]}>
                            <Skeleton
                                component="div"
                                sx={{ minWidth: 40, mr: 2 }}
                                variant="rounded"
                                height={40}
                                width={40}
                            />
                            <Skeleton width={'100%'} variant="text" />
                        </Stack>
                        <Stack direction="row" padding={[1, 2]}>
                            <Skeleton
                                component="div"
                                sx={{ minWidth: 40, mr: 2 }}
                                variant="rounded"
                                height={40}
                                width={40}
                            />
                            <Skeleton width={'100%'} variant="text" />
                        </Stack>
                        <Stack direction="row" padding={[1, 2]}>
                            <Skeleton
                                component="div"
                                sx={{ minWidth: 40, mr: 2 }}
                                variant="rounded"
                                height={40}
                                width={40}
                            />
                            <Skeleton width={'100%'} variant="text" />
                        </Stack>
                    </>
                ) : (
                    <TeamList teams={data?.teams} />
                )}
            </Sidebar>
            <AddTeam open={openTeamForm} handleClose={handleCloseTeamForm} />
        </>
    );
};
