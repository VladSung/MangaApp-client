export type MangaCardListQuery = {
    loading: boolean;
    data?: {
        mangas: {
            cover: string;
            title: string;
            id: string;
        }[];
    };
    children?: React.ReactNode;
};
