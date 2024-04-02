'use server'
import { comicQuery } from '@/app/shared/api/queries';
import { getClient } from "@/app/shared/lib/apollo/client";

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

export async function generateMetadata({ params: { id } }: Props) {
    const c = await getClient().query({ query: comicQuery, variables: { id } });

    return {
        title: c?.data?.comic?.title,
    };
}
