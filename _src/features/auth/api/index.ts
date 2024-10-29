import { graphql } from '@src/shared/api';

export const userAvatarQuery = graphql(`
    #graphql
    query UserAvatar {
        user {
            me {
                publicId
                avatar
            }
        }
    }
`);
