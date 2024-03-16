import { AddTeamInput, Exact,graphql  } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';

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
    } catch (error) {
        console.log('error:', error);
    }
};
