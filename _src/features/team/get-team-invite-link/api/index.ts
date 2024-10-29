import { graphql } from '@src/shared/api';

export const getInviteLinkMutation = graphql(`
    mutation generateInviteLink($teamId: ID!) {
        team {
            generateTeamInviteLink(teamId: $teamId, role: "Viewer") {
                record
                issue {
                    message
                }
            }
        }
    }
`);
