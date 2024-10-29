import { graphql } from '@src/shared/api';

export const dashboardOverviewQuery = graphql(`
    query DashboardOverview {
        user {
            me {
                name
                membersOf(paginate: { first: 5 }) {
                    edges {
                        node {
                            role
                            team {
                                id
                                name
                                avatar
                                comics {
                                    edges {
                                        node {
                                            id
                                            title
                                            cover
                                            status
                                            count
                                            updatedAt
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                notifications(paginate: { first: 5 }) {
                    edges {
                        node {
                            id
                            title
                            description
                            createdAt
                            type
                        }
                    }
                }
            }
        }
    }
`);
