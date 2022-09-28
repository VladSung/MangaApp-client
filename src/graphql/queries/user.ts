import { gql } from '@apollo/client';

export const UserFragment = gql`
    fragment UserFragment on User {
        id
        username
        photoURL
        roles
    }
`;

export const AUTH = gql`
    ${UserFragment}
    query auth{
        auth{
            ...UserFragment
        }
    }
`;