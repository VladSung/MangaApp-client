'use client'
import { useSearchParams } from "next/navigation"
import NextImage from 'next/image';
import { AppShellMain, Container } from "@mantine/core";
import { useEffect } from "react";
import { useListState } from "@mantine/hooks";

function imageSize(url: string) {
    const img = document.createElement("img");

    const promise = new Promise<any>((resolve, reject) => {
        img.onload = () => {
            // Natural size is the actual image size regardless of rendering.
            // The 'normal' `width`/`height` are for the **rendered** size.
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Resolve promise with the width and height
            resolve({ width, height });
        };

        // Reject promise on error
        img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
}

const ChapterDraft = () => {
    const images = useSearchParams().get('images')?.split(',')

    const [imgs, handlers] = useListState<{ width: string, height: string }>()

    useEffect(() => {
        const get = async () => {
            handlers.setState(await Promise.all<any>(images?.map(i => (imageSize(i)))))
        }
        get()
    }, [imgs])

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

export default ChapterDraft