import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

type Props = {
    data?: {
        cover?: string;
        title?: string;
        id?: string;
    };
    children?: React.ReactNode;
};

export const Card = ({ data, children }: Props) => {
    return (
        <Link href={`/manga/${data?.id || ''}`}>
            <MuiCard>
                <CardMedia image={data?.cover} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {data?.title}
                    </Typography>
                    {children}
                </CardContent>
            </MuiCard>
        </Link>
    );
};
