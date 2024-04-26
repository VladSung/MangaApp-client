import { AddTeamInput, graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';

const addTeamMutation = graphql(`
    mutation AddTeam($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
        }
    }
`);

export const add = async (variables: { input: AddTeamInput }) => {
    const headers = new Headers();
    headers.append('Access-Control-Request-Headers', 'Content-Type');

    try {
        return await getClient().mutate({
            mutation: addTeamMutation,

            errorPolicy: 'all',
            variables,
            context: {
                headers,
            },
        });
    } catch (error) {
        console.log('error:', error);
    }
};
