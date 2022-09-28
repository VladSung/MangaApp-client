import { gql } from "@apollo/client";

export const CREATE_MANGA = gql`
mutation addManga($input: AddMangaInput!) {
    addManga(input: $input){
        id
    }
}
`
export const ADD_MANGA_CHAPTER = gql`
    mutation addChapter($input: addMangaChaptersInput!){
        addMangaChapters(input: $input){
            id
            chapters {
                id
            }
        }
    }
`

export const DELETE_MANGA = gql`
mutation deleteManga($id: GraphQLObjectId!){
    deleteManga(id: $id)
}
`