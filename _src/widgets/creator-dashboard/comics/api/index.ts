import { graphql } from '@src/shared/api';

export const userComicsQuery = graphql(`
    query userComics {
        user {
            me {
                id
                membersOf(paginate: { first: null }) {
                    edges {
                        node {
                            id
                            team {
                                id
                                name
                                comics {
                                    edges {
                                        node {
                                            id
                                            cover
                                            title
                                            alternativeTitles
                                            updatedAt
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
