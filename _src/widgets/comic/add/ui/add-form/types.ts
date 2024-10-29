import { FileWithPath } from '@mantine/dropzone';
import { MaturityRatings } from '@src/shared/api';

export type Team = {
    id: string;
    name: string;
    avatar?: string | null;
};

export type ExactTeam = {
    id: string;
    name: string;
    avatar: string;
};
export type Teams = (Team | null | undefined)[];
export type Genre = { id: number; title: string };
export type Genres = Array<Genre>;

export interface ComicAddFormInput {
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
