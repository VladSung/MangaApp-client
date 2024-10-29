import { graphql } from '@src/shared/api';

export const meBookmarksQuery = graphql(`
    query MeBookmarks {
        user {
            me {
                bookmarks(paginate: { after: null }) {
                    edges {
                        node {
                            id
                            title
                            comics {
                                id
                                title
                                cover
                                lastReadChapter {
                                    volume
                                    id
                                    number
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
