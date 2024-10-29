import { AppShellMain } from '@mantine/core';
import { Suspense } from 'react';

import { PageProps } from '@src/shared/api';
import { ChapterPageInner } from './ChapterPageInner';

type Props = PageProps<{ id: string; chapter: string; volume: string }>;
export const ChapterPage = async ({ params }: Props) => {
    const { lng, id, chapter, volume } = await params;
    return (
        <AppShellMain>
            <Suspense>
                <ChapterPageInner lng={lng} id={id} chapter={chapter} volume={volume} />
            </Suspense>
        </AppShellMain>
    );
};
