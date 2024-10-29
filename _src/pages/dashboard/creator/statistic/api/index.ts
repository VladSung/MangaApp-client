import { graphql } from '@src/shared/api';

export const dashboardStatisticsQuery = graphql(`
    query DashboardStatistics {
        user {
            me {
                membersOf(paginate: { after: null }) {
                    edges {
                        node {
                            team {
                                id
                                name
                                comics {
                                    edges {
                                        node {
                                            id
                                            title
                                            rating {
                                                rating
                                                totalCount
                                            }
                                            usersReadHistory(paginate: { first: null }) {
                                                pageInfo {
                                                    totalCount
                                                }
                                            }
                                            comments(paginate: { after: null }) {
                                                pageInfo {
                                                    totalCount
                                                }
                                            }
                                            subscriptions {
                                                pageInfo {
                                                    totalCount
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
        }
    }
`);
