'use server'
import { graphql } from "@/app/shared/api/graphql";
import { getClient } from "@/app/shared/lib/apollo/client";

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

const comicQuery = graphql(`
    query ComicName($id:ID!){
        comic(id:$id){
            title
        }
    }
`)

export async function generateMetadata({ params: { id } }: Props) {
    const c = await getClient().query({ query: comicQuery, variables: { id } })
    return {
        title: c?.data?.comic?.title,
    };
}