import { graphql } from '@/app/shared/api/graphql';

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
