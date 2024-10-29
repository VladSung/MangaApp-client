import { graphql } from '@src/shared/api';

export const deleteTeamMutation = graphql(`
    mutation DeleteUserTeam($teamId: ID!) {
        team {
            delete(id: $teamId) {
                record {
                    id
                }
            }
        }
    }
`);
