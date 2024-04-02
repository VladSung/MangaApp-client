import { ComicCard } from '@/app/entities/comic';

type Props = {
    comics: {
        cover: string;
        title: string;
        id: string;
    }[]
};

export const List = ({ comics }: Props) => {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 16, rowGap: 24 }}>
            {comics.map((m) =>
            (
                <ComicCard key={m.id} data={m} />
            )
            )}
        </div>
    );
};
