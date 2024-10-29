import { graphql } from '@src/shared/api';

export const userProfileInfoQuery = graphql(`
    query UserInfo($id: ID!) {
        user {
            one(id: $id) {
                id
                avatar
                name
                publicId
                description
                background
                membersOf(paginate: { first: null }) {
                    edges {
                        node {
                            id
                            role
                            comics {
                                id
                                cover
                                title
                            }
                            team {
                                id
                                description
                                name
                                avatar
                            }
                        }
                    }
                }
            }
        }
    }
`);
