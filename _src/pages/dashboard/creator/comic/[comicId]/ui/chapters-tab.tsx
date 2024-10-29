'use client';
import { PageProps } from '@src/shared/api';
import { ChaptersList } from '@src/widgets/chapter';

type Props = {
    comicId: string;
    lng: string;
};

export const ChaptersTab = ({ lng, comicId }: Props) => (
    <ChaptersList withBorder={false} lng={lng} comic={{ id: comicId }} isDashboard />
);
