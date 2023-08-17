import { MaturityRatings } from '@/_src/shared/api/graphql/graphql';

export interface FormInput {
    title: string;
    description: string;
    altTitle: string;
    image: File;
    author: string;
    artist: string;
    publisher: string;
    genres: Genres;
    maturityRating: keyof typeof MaturityRatings;
}
export type Genre = { title: string };
export type Genres = Array<Genre>;
