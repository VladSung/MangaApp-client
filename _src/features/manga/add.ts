'use server';
import { getClient } from '@/_src/shared/lib/apollo/client';
import { graphql } from '../../shared/api/graphql';
import { AddMangaInput, Exact } from '../../shared/api/graphql/graphql';

const addMangaMutation = graphql(`
    mutation AddManga($input: AddMangaInput!) {
        addManga(input: $input) {
            __typename
            ... on Manga {
                id
            }
        }
    }
`);

export const add = async (
    variables: Exact<{
        input: AddMangaInput;
    }>
) => {
    return await getClient().mutate({
        mutation: addMangaMutation,
        variables,
    });
};
