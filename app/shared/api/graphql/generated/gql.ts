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
    "\n    query getChapterImages($volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number) {\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n": types.GetChapterImagesDocument,
    "\n    query CommentsByComic($comicId:ID!){\n        commentsByComic(comicId:$comicId){\n            count\n            comments{\n                createdAt\n                content\n                id\n                _count{\n                    replies\n                }\n                author{\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n": types.CommentsByComicDocument,
    "\n    query ComicName($id:ID!){\n        comic(id:$id){\n            title\n        }\n    }\n": types.ComicNameDocument,
    "\n    query getComicAndLastChapterData($id: ID!){\n        comic(id:$id){\n            title\n            chapters{\n            id\n            volume\n            number\n            }\n        }\n}   \n": types.GetComicAndLastChapterDataDocument,
    "\nmutation addChapter($input: addChapterInput!){\n  addChapter(input:$input){\n    id\n    volume\n    number\n  }\n}\n": types.AddChapterDocument,
    "\n    query ChaptersByComicId($id:ID!){\n        chapters(comicId:$id){\n            title\n            volume\n            number\n            id\n            publishDate\n            price\n        }    \n    }\n": types.ChaptersByComicIdDocument,
    "\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n": types.MyTeamInfoDocument,
    "\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            chapters {\n                id\n                createdAt\n                number\n                volume\n                title\n                \n            }\n            team {\n                members {\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n": types.GetComicPageDocument,
    "\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n        }\n    }\n": types.GetComicMetaDocument,
    "\n    query getCommentReplies($commentId: ID!){\n        repliesOnCommentByCommentId(commentId:$commentId){\n            content\n            createdAt\n            id\n            author{\n            username\n            avatar\n        }\n            _count{\n            replies\n        }\n        }\n    }\n": types.GetCommentRepliesDocument,
    "\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n": types.GetAuthDocument,
    "\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n": types.AddTeamDocument,
    "\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n": types.AddComicDocument,
    "\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        teams {\n            id\n            avatar\n            name\n        }\n    }\n": types.ComicSelectionsDocument,
    "\n    query getComics{\n        comics(paginate:{take:50}){\n            cover\n            title\n            id\n        }\n    }\n    ": types.GetComicsDocument,
    "\n    mutation UpdateComic($id: ID!, $input: UpdateComicInput!) {\n        updateComic(id: $id, input: $input) {\n            __typename\n        }\n    }\n": types.UpdateComicDocument,
    "\n    query getUserComic($id: ID!) {\n        comic(id: $id) {\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            team {\n                id\n                avatar\n                name\n            }\n            title\n            alternativeTitles\n            cover\n            description\n            language\n            status\n            maturityRating\n        }\n    }\n": types.GetUserComicDocument,
    "\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n": types.GetUserComicsDocument,
    "\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n": types.MyTeamsDocument,
    "\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n": types.AddTeamMutationDocument,
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
export function graphql(source: "\n    query getChapterImages($volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number) {\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n"): (typeof documents)["\n    query getChapterImages($volume: ID, $number: ID) {\n        chapter(volume: $volume, number: $number) {\n            images{\n                path\n                aspectRatio\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CommentsByComic($comicId:ID!){\n        commentsByComic(comicId:$comicId){\n            count\n            comments{\n                createdAt\n                content\n                id\n                _count{\n                    replies\n                }\n                author{\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query CommentsByComic($comicId:ID!){\n        commentsByComic(comicId:$comicId){\n            count\n            comments{\n                createdAt\n                content\n                id\n                _count{\n                    replies\n                }\n                author{\n                    id\n                    avatar\n                    username\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ComicName($id:ID!){\n        comic(id:$id){\n            title\n        }\n    }\n"): (typeof documents)["\n    query ComicName($id:ID!){\n        comic(id:$id){\n            title\n        }\n    }\n"];
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
export function graphql(source: "\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n"): (typeof documents)["\n    query MyTeamInfo($id:ID!) {\n        team(id:$id) {\n            id\n            name\n            avatar\n            members{\n                role\n                user{\n                    username\n                    avatar\n                    email\n                }\n            }\n            comics{\n                id\n                title\n                alternativeTitles\n                cover\n                updatedAt\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            chapters {\n                id\n                createdAt\n                number\n                volume\n                title\n                \n            }\n            team {\n                members {\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query getComicPage($id: ID!) {\n        comic(id: $id) {\n            id\n            title\n            alternativeTitles\n            cover\n            description\n            status\n            genres {\n                id\n                title\n            }\n            tags {\n                id\n                title\n            }\n            chapters {\n                id\n                createdAt\n                number\n                volume\n                title\n                \n            }\n            team {\n                members {\n                    user {\n                        id\n                        avatar\n                        username\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n        }\n    }\n"): (typeof documents)["\n    query getComicMeta($id: ID!) {\n        comic(id: $id) {\n            title\n            description\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCommentReplies($commentId: ID!){\n        repliesOnCommentByCommentId(commentId:$commentId){\n            content\n            createdAt\n            id\n            author{\n            username\n            avatar\n        }\n            _count{\n            replies\n        }\n        }\n    }\n"): (typeof documents)["\n    query getCommentReplies($commentId: ID!){\n        repliesOnCommentByCommentId(commentId:$commentId){\n            content\n            createdAt\n            id\n            author{\n            username\n            avatar\n        }\n            _count{\n            replies\n        }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n"): (typeof documents)["\n    mutation getAuth($input: AuthInput) {\n        auth(input: $input) {\n            id\n            avatar\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    mutation AddTeam($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation AddComic($input: AddComicInput!) {\n        addComic(input: $input) {\n            __typename\n            ... on Comic {\n                id\n                title\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        teams {\n            id\n            avatar\n            name\n        }\n    }\n"): (typeof documents)["\n    query ComicSelections {\n        genres {\n            id\n            title\n        }\n        tags {\n            id\n            title\n        }\n        teams {\n            id\n            avatar\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getComics{\n        comics(paginate:{take:50}){\n            cover\n            title\n            id\n        }\n    }\n    "): (typeof documents)["\n    query getComics{\n        comics(paginate:{take:50}){\n            cover\n            title\n            id\n        }\n    }\n    "];
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
export function graphql(source: "\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query getUserComics {\n        me {\n            id\n            member {\n                id\n                team {\n                    id\n                    name\n                    comics {\n                        id\n                        cover\n                        title\n                        alternativeTitles\n                        updatedAt\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query MyTeams {\n        me {\n            member {\n                team {\n                    id\n                    name\n                    avatar\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n"): (typeof documents)["\n    mutation AddTeamMutation($input: AddTeamInput!) {\n        createTeam(input: $input) {\n            id\n            name\n            avatar\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;