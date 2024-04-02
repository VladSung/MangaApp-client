import { AddTeamInput, Exact,graphql  } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';
import { teamsQuery } from '@/app/widgets/creator-dashboard/sidebar/queries';

const addTeamMutation = graphql(`
    mutation AddTeam($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
        }
    }
`);

export const add = async (
    variables: {
        input: AddTeamInput;
    }
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
            update:(cache, {data: addTeam})=>{
                cache.updateQuery({query: teamsQuery}, (data)=>{
                    if(data?.me?.member) {
                        return ({
                        me:{
                            member:[
                            ...data?.me?.member,
                                {
                                team: addTeam?.createTeam
                                }]
                            }
                        })
                    } else {
                        return ({
                            me:{
                            member:[
                                {
                                team: addTeam?.createTeam
                            }]
                        }
                        })
                    }
                })
            }
        });
    } catch (error) {
        console.log('error:', error);
    }
};
