import { graphql } from '@/app/shared/api/graphql';

export const comicListQuery = graphql(`
    query getComics {
        comics(paginate: { take: 50 }) {
            cover
            title
            id
        }
    }
`);
