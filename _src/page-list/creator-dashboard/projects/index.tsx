'use client';
import { Box, IconButton, Container, Stack, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Link from 'next/link';
import { MangaListItem } from '@/_src/entities/manga';

export const Projects = () => {
    return (
        <Container sx={{ pt: 3, containerType: 'inline-size' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h2">
                    Список проектов
                </Typography>
                <IconButton
                    color="secondary"
                    size="medium"
                    href="/creator-dashboard/projects/add"
                    LinkComponent={Link}
                >
                    <AddCircleRoundedIcon fontSize="medium" />
                </IconButton>
            </Box>
            <Stack spacing={2}>
                <MangaListItem
                    data={{
                        title: 'RedAlope Приложение для чтения комиксов',
                        subtitle: 'RedAlope app for read comics',
                        lastChange: '4 days ago',
                        cover: '/assets/cover.png',
                    }}
                />
                <MangaListItem
                    data={{
                        title: 'RedAlope Приложение для чтения комиксов',
                        subtitle: 'RedAlope app for read comics',
                        lastChange: '4 days ago',
                        cover: '/assets/cover.png',
                    }}
                />
            </Stack>
        </Container>
    );
};
