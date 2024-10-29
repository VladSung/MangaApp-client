'use client';
import { PageProps } from '@src/shared/api';
import { ChaptersList } from '@src/widgets/chapter';

type Props = PageProps & {
    params: {
        comicId: string;
    };
};
export const ChaptersTab = ({ params: { lng, comicId } }: Props) => (
    <ChaptersList withBorder={false} lng={lng} comic={{ id: comicId }} isDashboard />
);
