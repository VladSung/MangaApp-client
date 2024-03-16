// import { graphql } from "#shared/api"
import { gql } from '@apollo/client';

export const comicListQuery = gql(`
    query getComics{
        comics(paginate:{take:50}){
            cover
            title
            id
        }
    }
    `);
