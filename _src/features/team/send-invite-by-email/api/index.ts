import { graphql } from '@src/shared/api';

export const sendInviteToEmailMutation = graphql(`
    mutation SendInviteEmail($teamId: ID!, $email: String!) {
        team {
            sendInviteToEmail(teamId: $teamId, email: $email, role: "Viewer") {
                record
            }
        }
    }
`);
