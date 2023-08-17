import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {
    data: { title: string; subtitle: string; lastChange?: string; cover: string };
    children?: React.ReactNode;
    href?: string;
};

export const ListItem = ({
    children,
    href,
    data: { lastChange, title, subtitle, cover },
}: Props) => {
    return (
        <Card
            sx={{
                '@layer entity': {
                    'display': 'flex',
                    'width': 'max-content',
                    'gap': 3,
                    'padding': 2,
                    '@container (width < 900px)': {
                        ' .MuiStack-root.statistics': {
                            display: 'none',
                        },
                    },
                },
            }}
        >
            <Stack spacing={2} direction="row">
                <Avatar sx={{ height: 106, aspectRatio: '180/270', width: 70.7 }} variant="rounded">
                    <Image height={106} width={70.7} src={cover} alt="" />
                </Avatar>
                <Box sx={{ maxWidth: 200 }}>
                    <Typography variant="caption" sx={{ textOverflow: 'ellipsis' }}>
                        {subtitle}
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{ mb: 1, textOverflow: 'ellipsis' }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2">{lastChange}</Typography>
                </Box>
            </Stack>
            {children}
        </Card>
    );
};
