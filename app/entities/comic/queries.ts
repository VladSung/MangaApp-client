'use server'
import { graphql } from "@/app/shared/api/graphql";
import { getClient } from "@/app/shared/lib/apollo/client";

const getComicQuery = graphql(`
    query getComicPage($id: ID!) {
        comic(id: $id) {
            id
            title
            alternativeTitles
            cover
            description
            status
            genres {
                id
                title
            }
            tags {
                id
                title
            }
            chapters {
                id
                createdAt
                number
                volume
                title
                
            }
            team {
                members {
                    user {
                        id
                        avatar
                        username
                    }
                }
            }
        }
    }
`);

const getComicMetaQuery = graphql(`
    query getComicMeta($id: ID!) {
        comic(id: $id) {
            title
            description
        }
    }
`);


export async function getComic (id:string){
   return await getClient().query({query:getComicQuery, variables:{id}})
}


export  async function getComicMeta (id:string){
    return await getClient().query({query:getComicMetaQuery, variables:{id}})
}