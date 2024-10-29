import { graphql } from '@src/shared/api';

export const meProfileInfoQuery = graphql(`
    query MeProfileInfo {
        user {
            me {
                name
                publicId
                avatar
                description
                background
                socialLinks
                membersOf(paginate: { first: null }) {
                    edges {
                        node {
                            role
                            id
                            team {
                                id
                                name
                                avatar
                                description
                                comics {
                                    edges {
                                        node {
                                            id
                                            title
                                            cover
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
