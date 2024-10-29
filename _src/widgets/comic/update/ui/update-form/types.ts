import { FileWithPath } from '@mantine/dropzone';
import { MaturityRatings } from '@src/shared/api';

export type Team = {
    id: string | null;
    name: string | null;
    avatar?: string | null;
};

export type ExactTeam = {
    id: string;
    name: string;
    avatar: string;
};
export type Teams = Team[];
export type Genre = { id: number; title: string };
export type Genres = Array<Genre>;

export interface ComicUpdateFormInput {
    title: string;
    description: string;
    alternativeTitles: string;
    cover: FileWithPath | null;
    genres: string[];
    tags: string[];
    teams: string;
    maturityRating: keyof typeof MaturityRatings;
    publishDate: Date;
}
