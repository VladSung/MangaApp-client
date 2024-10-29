import { graphql } from '@src/shared/api';

export const rateComicMutation = graphql(`
    mutation RateComic($input: RateInput!) {
        comic {
            rate(input: $input) {
                record {
                    totalCount
                    rating
                }
                issue {
                    message
                }
            }
        }
    }
`);

export const comicRateFragment = graphql(`
    fragment comicFragment on Comic {
        id
        rating {
            rating
            totalCount
        }
    }
`);
