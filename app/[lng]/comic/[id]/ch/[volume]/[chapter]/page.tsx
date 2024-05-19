import dynamic from 'next/dynamic';

export default dynamic(() => import('@src/pages/[lng]/comic/[id]/ch/[volume]/[chapter]'), { ssr: false });
