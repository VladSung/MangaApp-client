import { FileWithPath } from '@mantine/dropzone';

import { MaturityRatings } from '@/app/shared/api/graphql';

export type Team = {
    id?: string;
    name?: string;
    avatar?: string;
};

export type ExactTeam = {
    id: string;
    name: string;
    avatar: string;
};
export type Teams = Team[];
export type Genre = { id: number; title: string };
export type Genres = Array<Genre>;

export interface FormInput {
    title: string;
    description: string;
    alternativeTitles: string;
    cover?: FileWithPath;
    genres: string[];
    tags: string[];
    teams: string;
    maturityRating: keyof typeof MaturityRatings;
    publishDate: Date;
}
