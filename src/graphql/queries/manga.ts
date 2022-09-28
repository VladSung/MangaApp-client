import { gql } from "@apollo/client";

export const MangaFragment = gql`
    fragment MangaFragment on Manga {
        id
        poster
        title
    }
`

export const GET_USER_MANGAS = gql`
    ${MangaFragment}
    query getUserMangas($publisherId: GraphQLObjectId!){
        mangas(publisherId: $publisherId){
            publishedAt
            ...MangaFragment
        }
    }
`

export const GET_MANGAS = gql`
    ${MangaFragment}
    query getMangas{
        mangas{
            publishedAt
            ...MangaFragment
        }
    }
`

export const GET_GENRES = gql`
    query getGenres{
        genres{
            title
            id
        }
    }
`

export const GET_MANGA_BY_ID = gql`
query getManga($id: GraphQLObjectId!){
    manga(id: $id){
        poster
        description
        altTitle
        id
        title
        chCount
        chapters{
            order
            title
            
        }
    }
}
`