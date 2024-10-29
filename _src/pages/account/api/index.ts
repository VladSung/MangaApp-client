import { graphql } from '@src/shared/api';

export const userSettingQuery = graphql(`
    query UserSettingQuery {
        user {
            me {
                name
                avatar
            }
        }
    }
`);
