import { getClient } from '@/_src/shared/lib/apollo/client';
import { graphql } from '@/_src/shared/api/graphql';
import { AddTeamInput, Exact } from '@/_src/shared/api/graphql/graphql';

const addTeamMutation = graphql(`
    mutation AddTeam($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
        }
    }
`);

export const add = async (
    variables: Exact<{
        input: AddTeamInput;
    }>
) => {
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
    } catch (e) {
        console.log('error: ', e);
    }
};
