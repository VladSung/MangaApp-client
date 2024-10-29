import { graphql } from '@src/shared/api';

export const userTeamsQuery = graphql(`
    query MyTeams {
        user {
            me {
                membersOf(paginate: { first: null }) {
                    edges {
                        node {
                            team {
                                id
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

export const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        team {
            create(input: $input) {
                record {
                    id
                    name
                    avatar
                }
                issue {
                    message
                }
            }
        }
    }
`);

export const teamInfoQuery = graphql(`
    query TeamInfo($id: ID!) {
        team {
            one(id: $id) {
                id
                avatar
                publicId
                name
                description
                socialLinks
                members(paginate: { first: null }) {
                    pageInfo {
                        totalCount
                    }
                    edges {
                        node {
                            id
                            role
                            user {
                                publicId
                                email
                                name
                                avatar
                            }
                        }
                    }
                }
                comics {
                    pageInfo {
                        totalCount
                    }
                    edges {
                        node {
                            id
                            title
                            alternativeTitles
                            cover
                            updatedAt
                        }
                    }
                }
            }
        }
    }
`);
