import dynamic from 'next/dynamic';

const ChapterPage = dynamic(() => import('@src/pages/chapter').then((mod) => mod.ChapterPage), {
    ssr: false,
});

export default ChapterPage;
