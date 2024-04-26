/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            lastReadedChapter {\n                id\n                volume\n                number\n            }\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                members {\n                    id\n                    role\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n": types.GetComicPageDocument,
    "\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n            cover\n        }\n    }\n": types.GetComicMetaDocument,
    "\n    mutation setReadingHistory($comicId:ID!, $chapterId:ID!){\n        addReadingHistory(comicId:$comicId, chapterId:$chapterId){\n            id\n            chapter{\n                id\n            }\n        }\n    }\n": types.SetReadingHistoryDocument,
    "\n                            fragment _ on Chapter {\n                            usersReadHistory {\n                                id\n                            }\n                            }\n                        ": types._FragmentDoc,
    "\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n": types.AddTeamDocument,
    "\n    query UserSettingQuery {\n        me{\n            username\n            avatar\n            subscriptions{\n                __typename\n            }\n        }\n    }\n": types.UserSettingQueryDocument,
    "\n    query getChapterImages($comicId:ID, $volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number, comicId:$comicId) {\n            id\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n": types.GetChapterImagesDocument,
    "\n    query getComicAndLastChapterData($id: ID!){\n        comic(id:$id){\n            title\n            chapters{\n            id\n            volume\n            number\n            }\n        }\n}   \n": types.GetComicAndLastChapterDataDocument,
    "\nmutation addChapter($input: addChapterInput!){\n  addChapter(input:$input){\n    id\n    volume\n    number\n  }\n}\n": types.AddChapterDocument,
    "\n    query ChaptersByComicId($id:ID!){\n        chapters(comicId:$id){\n            title\n            volume\n            number\n            id\n            publishDate\n            price\n        }    \n    }\n": types.ChaptersByComicIdDocument,
    "\n    query getComicPageData($id: ID!) {\n        comic(id:$id){\n            title\n            cover\n        }\n    }\n": types.GetComicPageDataDocument,
    "\nmutation deleteComic($id:ID!){\n    deleteComic(id:$id){\n        id\n        title\n    }\n}\n": types.DeleteComicDocument,
    "\n    mutation generateInviteLink($teamId:ID!){\n    generateTeamInviteLink(teamId:$teamId, role: \"Viewer\")\n    }\n": types.GenerateInviteLinkDocument,
    "\n    mutation SendIviteEmail($teamId:ID!, $email:String!){\n        sendInviteToEmail(teamId:$teamId, email:$email, role:\"Viewer\")\n    }\n": types.SendIviteEmailDocument,
    "\n    mutation DeleteUserTeam($teamId:ID!){\n        deleteTeam(id:$teamId){\n            id\n        }\n    }\n": types.DeleteUserTeamDocument,
    "\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            tagline\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n": types.MyTeamInfoDocument,
    "\n    query ProfileQuery {\n        me{\n            username\n            avatar\n            description\n            background\n        }\n    }\n": types.ProfileQueryDocument,
    "\n    query TeamInfo($id:ID!) {\n        team(id:$id){\n            id\n            avatar\n            name\n            tagline\n            members{\n                id\n                role\n                    user{\n                        id\n                        username\n                        avatar\n                    }\n            }\n            comics{\n                id\n                cover\n                title\n            }\n        } \n}\n": types.TeamInfoDocument,
    "\n    query ComicName($id: ID!) {\n        comic(id: $id) {\n            title\n        }\n    }\n": types.ComicNameDocument,
    "\n    query getChapters($comicId: ID!, $order: OrderBy, $paginate: PaginateInput) {\n        chapters(comicId: $comicId, orderBy: $order, paginate: $paginate) {\n            id\n            createdAt\n            number\n            volume\n            title\n            usersReadHistory {\n                id\n            }\n        }\n    }\n": types.GetChaptersDocument,
    "\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n": types.AddComicDocument,
    "\n    query getComics {\n        comics(paginate: { take: 50 }) {\n            cover\n            title\n            id\n        }\n    }\n": types.GetComicsDocument,
    "\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        me {\n            member {\n                team {\n                    id\n                    avatar\n                    name\n                }\n            }\n        }\n    }\n": types.ComicSelectionsDocument,
    "\n    query GetPopularComics($paginate: PaginateInput!) {\n        popularComics(paginate: $paginate) {\n            title\n            cover\n            id\n        }\n    }\n": types.GetPopularComicsDocument,
    "\n    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {\n        updateComic(id: $id, input: $input) {\n            __typename\n        }\n    }\n": types.UpdateComicDocument,
    "\n    query getUserComic($id: ID!) {\n        comic(id: $id) {\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                avatar\n                name\n            }\n            title\n            alternativeTitles\n            cover\n            description\n            language\n            status\n            maturityRating\n        }\n    }\n": types.GetUserComicDocument,
    "\n    mutation AddCommentToComic($input:CommentInput!){\n      addComment(input:$input){\n          content\n            createdAt\n            id\n            author {\n                id\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n      }\n  }\n": types.AddCommentToComicDocument,
    "\n                            fragment _Comment on Comment {\n                            _count {\n                                replies\n                            }\n                        }": types._CommentFragmentDoc,
    "\n    query getCommentReplies($commentId: ID!) {\n        repliesOnCommentByCommentId(commentId: $commentId) {\n            content\n            createdAt\n            id\n            author {\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n        }\n    }\n": types.GetCommentRepliesDocument,
    "\n    query CommentsByComic($comicId: ID!) {\n        commentsByComic(comicId: $comicId) {\n            count\n            comments {\n                createdAt\n                content\n                id\n                _count {\n                    replies\n                }\n                author {\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n": types.CommentsByComicDocument,
    "\n    mutation DeleteComment($commentId:ID!){\n        deleteComment(id:$commentId){\n            id\n        }\n    }\n": types.DeleteCommentDocument,
    "\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n": types.GetUserComicsDocument,
    "\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n": types.MyTeamsDocument,
    "\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n": types.AddTeamMutationDocument,
    "\n                            fragment _Team on Team {\n                                id\n                                avatar\n                                name\n                            }\n                        ": types._TeamFragmentDoc,
    "\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n": types.GetAuthDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            lastReadedChapter {\n                id\n                volume\n                number\n            }\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                members {\n                    id\n                    role\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            lastReadedChapter {\n                id\n                volume\n                number\n            }\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                members {\n                    id\n                    role\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n            cover\n        }\n    }\n"): (typeof documents)["\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n            cover\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation setReadingHistory($comicId:ID!, $chapterId:ID!){\n        addReadingHistory(comicId:$comicId, chapterId:$chapterId){\n            id\n            chapter{\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation setReadingHistory($comicId:ID!, $chapterId:ID!){\n        addReadingHistory(comicId:$comicId, chapterId:$chapterId){\n            id\n            chapter{\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                            fragment _ on Chapter {\n                            usersReadHistory {\n                                id\n                            }\n                            }\n                        "): (typeof documents)["\n                            fragment _ on Chapter {\n                            usersReadHistory {\n                                id\n                            }\n                            }\n                        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserSettingQuery {\n        me{\n            username\n            avatar\n            subscriptions{\n                __typename\n            }\n        }\n    }\n"): (typeof documents)["\n    query UserSettingQuery {\n        me{\n            username\n            avatar\n            subscriptions{\n                __typename\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getChapterImages($comicId:ID, $volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number, comicId:$comicId) {\n            id\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n"): (typeof documents)["\n    query getChapterImages($comicId:ID, $volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number, comicId:$comicId) {\n            id\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicAndLastChapterData($id: ID!){\n        comic(id:$id){\n            title\n            chapters{\n            id\n            volume\n            number\n            }\n        }\n}   \n"): (typeof documents)["\n    query getComicAndLastChapterData($id: ID!){\n        comic(id:$id){\n            title\n            chapters{\n            id\n            volume\n            number\n            }\n        }\n}   \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation addChapter($input: addChapterInput!){\n  addChapter(input:$input){\n    id\n    volume\n    number\n  }\n}\n"): (typeof documents)["\nmutation addChapter($input: addChapterInput!){\n  addChapter(input:$input){\n    id\n    volume\n    number\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ChaptersByComicId($id:ID!){\n        chapters(comicId:$id){\n            title\n            volume\n            number\n            id\n            publishDate\n            price\n        }    \n    }\n"): (typeof documents)["\n    query ChaptersByComicId($id:ID!){\n        chapters(comicId:$id){\n            title\n            volume\n            number\n            id\n            publishDate\n            price\n        }    \n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicPageData($id: ID!) {\n        comic(id:$id){\n            title\n            cover\n        }\n    }\n"): (typeof documents)["\n    query getComicPageData($id: ID!) {\n        comic(id:$id){\n            title\n            cover\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteComic($id:ID!){\n    deleteComic(id:$id){\n        id\n        title\n    }\n}\n"): (typeof documents)["\nmutation deleteComic($id:ID!){\n    deleteComic(id:$id){\n        id\n        title\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation generateInviteLink($teamId:ID!){\n    generateTeamInviteLink(teamId:$teamId, role: \"Viewer\")\n    }\n"): (typeof documents)["\n    mutation generateInviteLink($teamId:ID!){\n    generateTeamInviteLink(teamId:$teamId, role: \"Viewer\")\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SendIviteEmail($teamId:ID!, $email:String!){\n        sendInviteToEmail(teamId:$teamId, email:$email, role:\"Viewer\")\n    }\n"): (typeof documents)["\n    mutation SendIviteEmail($teamId:ID!, $email:String!){\n        sendInviteToEmail(teamId:$teamId, email:$email, role:\"Viewer\")\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteUserTeam($teamId:ID!){\n        deleteTeam(id:$teamId){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteUserTeam($teamId:ID!){\n        deleteTeam(id:$teamId){\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            tagline\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            tagline\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProfileQuery {\n        me{\n            username\n            avatar\n            description\n            background\n        }\n    }\n"): (typeof documents)["\n    query ProfileQuery {\n        me{\n            username\n            avatar\n            description\n            background\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query TeamInfo($id:ID!) {\n        team(id:$id){\n            id\n            avatar\n            name\n            tagline\n            members{\n                id\n                role\n                    user{\n                        id\n                        username\n                        avatar\n                    }\n            }\n            comics{\n                id\n                cover\n                title\n            }\n        } \n}\n"): (typeof documents)["\n    query TeamInfo($id:ID!) {\n        team(id:$id){\n            id\n            avatar\n            name\n            tagline\n            members{\n                id\n                role\n                    user{\n                        id\n                        username\n                        avatar\n                    }\n            }\n            comics{\n                id\n                cover\n                title\n            }\n        } \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ComicName($id: ID!) {\n        comic(id: $id) {\n            title\n        }\n    }\n"): (typeof documents)["\n    query ComicName($id: ID!) {\n        comic(id: $id) {\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getChapters($comicId: ID!, $order: OrderBy, $paginate: PaginateInput) {\n        chapters(comicId: $comicId, orderBy: $order, paginate: $paginate) {\n            id\n            createdAt\n            number\n            volume\n            title\n            usersReadHistory {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query getChapters($comicId: ID!, $order: OrderBy, $paginate: PaginateInput) {\n        chapters(comicId: $comicId, orderBy: $order, paginate: $paginate) {\n            id\n            createdAt\n            number\n            volume\n            title\n            usersReadHistory {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComics {\n        comics(paginate: { take: 50 }) {\n            cover\n            title\n            id\n        }\n    }\n"): (typeof documents)["\n    query getComics {\n        comics(paginate: { take: 50 }) {\n            cover\n            title\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        me {\n            member {\n                team {\n                    id\n                    avatar\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        me {\n            member {\n                team {\n                    id\n                    avatar\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPopularComics($paginate: PaginateInput!) {\n        popularComics(paginate: $paginate) {\n            title\n            cover\n            id\n        }\n    }\n"): (typeof documents)["\n    query GetPopularComics($paginate: PaginateInput!) {\n        popularComics(paginate: $paginate) {\n            title\n            cover\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {\n        updateComic(id: $id, input: $input) {\n            __typename\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {\n        updateComic(id: $id, input: $input) {\n            __typename\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserComic($id: ID!) {\n        comic(id: $id) {\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                avatar\n                name\n            }\n            title\n            alternativeTitles\n            cover\n            description\n            language\n            status\n            maturityRating\n        }\n    }\n"): (typeof documents)["\n    query getUserComic($id: ID!) {\n        comic(id: $id) {\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                avatar\n                name\n            }\n            title\n            alternativeTitles\n            cover\n            description\n            language\n            status\n            maturityRating\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddCommentToComic($input:CommentInput!){\n      addComment(input:$input){\n          content\n            createdAt\n            id\n            author {\n                id\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n      }\n  }\n"): (typeof documents)["\n    mutation AddCommentToComic($input:CommentInput!){\n      addComment(input:$input){\n          content\n            createdAt\n            id\n            author {\n                id\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n      }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                            fragment _Comment on Comment {\n                            _count {\n                                replies\n                            }\n                        }"): (typeof documents)["\n                            fragment _Comment on Comment {\n                            _count {\n                                replies\n                            }\n                        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCommentReplies($commentId: ID!) {\n        repliesOnCommentByCommentId(commentId: $commentId) {\n            content\n            createdAt\n            id\n            author {\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n        }\n    }\n"): (typeof documents)["\n    query getCommentReplies($commentId: ID!) {\n        repliesOnCommentByCommentId(commentId: $commentId) {\n            content\n            createdAt\n            id\n            author {\n                username\n                avatar\n            }\n            _count {\n                replies\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CommentsByComic($comicId: ID!) {\n        commentsByComic(comicId: $comicId) {\n            count\n            comments {\n                createdAt\n                content\n                id\n                _count {\n                    replies\n                }\n                author {\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query CommentsByComic($comicId: ID!) {\n        commentsByComic(comicId: $comicId) {\n            count\n            comments {\n                createdAt\n                content\n                id\n                _count {\n                    replies\n                }\n                author {\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteComment($commentId:ID!){\n        deleteComment(id:$commentId){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteComment($commentId:ID!){\n        deleteComment(id:$commentId){\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n"): (typeof documents)["\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                            fragment _Team on Team {\n                                id\n                                avatar\n                                name\n                            }\n                        "): (typeof documents)["\n                            fragment _Team on Team {\n                                id\n                                avatar\n                                name\n                            }\n                        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n"): (typeof documents)["\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;