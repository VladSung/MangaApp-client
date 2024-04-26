import { graphql } from '@src/shared/api/graphql';

export const teamsQuery = graphql(`
    query MyTeams {
        me {
            member {
                team {
                    id
                    name
                    avatar
                }
            }
        }
    }
`);
