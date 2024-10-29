import { graphql } from '@src/shared/api';

export const comicInfoQuery = graphql(`
    query ComicInfo($id: ID!) {
        comic {
            one(id: $id) {
                id
                title
                alternativeTitles
                cover
                maturityRating
                description
                status
                usersReadHistory(paginate: { first: 0 }) {
                    pageInfo {
                        totalCount
                    }
                }
                createdAt
                rating {
                    rating
                    totalCount
                }
                bookmarks(paginate: { first: 0 }) {
                    pageInfo {
                        totalCount
                    }
                }
                lastReadChapter {
                    id
                    volume
                    number
                }
                chapters(paginate: { first: 1 }) {
                    pageInfo {
                        totalCount
                    }
                }
                genres {
                    id
                    title
                }
                tags {
                    id
                    title
                }
                team {
                    id
                    name
                    avatar
                }
            }
        }
    }
`);

export const comicMetaQuery = graphql(`
    #graphql
    query ComicMeta($id: ID!) {
        comic {
            one(id: $id) {
                id
                title
                description
                cover
            }
        }
    }
`);

export const comicFormSelectionsQuery = graphql(`
    #graphql
    query ComicFormSelections {
        genre {
            all {
                id
                title
            }
        }
        tag {
            all {
                id
                title
            }
        }
        user {
            me {
                membersOf(paginate: { first: null }) {
                    edges {
                        node {
                            team {
                                id
                                avatar
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`);
