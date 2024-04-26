export type ComicCardListQuery = {
    loading: boolean;
    useGridItem?: boolean;
    data?: {
        comics: {
            cover: string;
            title: string;
            id: string;
        }[];
    };
    children?: React.ReactNode;
};
