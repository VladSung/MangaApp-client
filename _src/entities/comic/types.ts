import { ComicStatuses } from '@src/shared/api/graphql';

export type Comic = {
    __typename?: 'Comic';
    id: string;
    title: string;
    alternativeTitles?: string | null;
    cover: string;
    description?: string | null;
    status: ComicStatuses;
    lastReadedChapter?: {
        __typename?: 'Chapter';
        id: string;
        volume: number;
        number: number;
    } | null;
    genres?: Array<{ __typename?: 'Genre'; id: number; title: string }> | null;
    tags?: Array<{ __typename?: 'Tag'; id: number; title: string }> | null;
    team?: {
        __typename?: 'Team';
        members?: Array<{
            __typename?: 'TeamMember';
            user?: {
                __typename?: 'User';
                id: string;
                avatar?: string | null;
                name: string;
            } | null;
        }> | null;
    } | null;
};
