// import { graphql } from "#shared/api"
import { gql } from '@apollo/client';

export const mangaListQuery = gql(`query getMangas{
        mangas{
            cover
            title
            id
        }
    }`);
