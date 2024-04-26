'use client'
import { AppShellMain, Container } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import NextImage from 'next/image';
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

function imageSize(url: string) {
    const img = document.createElement("img");

    const promise = new Promise<{ width: number, height: number }>((resolve, reject) => {
        img.addEventListener('load', () => {
            // Natural size is the actual image size regardless of rendering.
            // The 'normal' `width`/`height` are for the **rendered** size.
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Resolve promise with the width and height
            resolve({ width, height });
        });

        // Reject promise on error
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
}

const ChapterDraftPage = () => {
    const images = useSearchParams().get('images')?.split(',')

    const [imgs, handlers] = useListState<{ width: number, height: number }>()

    useEffect(() => {
        const get = async () => {
            if (images) {
                const im = images?.map(i => (imageSize(i)))
                handlers.setState(await Promise.all<{ width: number, height: number }>(im))
            }
        }

        get()
    }, [images])

    const im = images?.map((image: string, index) => {
        const width = Number(imgs[index]?.width) || 0;
        const height = Number(imgs[index]?.height) || 0;

        return <div key={index} style={{ position: 'relative', width: '100%', aspectRatio: `${width} / ${height}`, }}>
            <NextImage unoptimized quality={90} loading='lazy' fill src={image} alt='' />
        </div>
    })

    return <AppShellMain>
        <Container>
            {im}
        </Container>
    </AppShellMain>
};

export default ChapterDraftPage
