/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Date` scalar type represents a date in a numeric or sting format */
  Date: { input: any; output: any; }
};

export type AddMangaInput = {
  alternativeTitles: Scalars['String']['input'];
  cover: Scalars['String']['input'];
  description: Scalars['String']['input'];
  genres: Array<GenreInput>;
  language: Scalars['String']['input'];
  maturityRating: MaturityRatings;
  status?: InputMaybe<MangaStatuses>;
  tags: Array<TagInput>;
  teamId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type AddTeamInput = {
  avatar: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type AggregatedRating = {
  __typename?: 'AggregatedRating';
  _avg?: Maybe<Scalars['Float']['output']>;
  _count?: Maybe<Scalars['Int']['output']>;
};

export type AuthInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Chapter = {
  __typename?: 'Chapter';
  comments?: Maybe<Array<Comment>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  language?: Maybe<Scalars['String']['output']>;
  manga?: Maybe<Manga>;
  number?: Maybe<Scalars['Float']['output']>;
  publishDate?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  usersReadHistory?: Maybe<Array<ReadingHistory>>;
  volume?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']['output']>;
  chapter?: Maybe<Chapter>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  manga?: Maybe<Manga>;
  parentComment?: Maybe<Comment>;
  replies?: Maybe<Array<Maybe<Comment>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CommentInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  mangaId?: InputMaybe<Scalars['ID']['input']>;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
};

export type CommentReaction = {
  __typename?: 'CommentReaction';
  comment?: Maybe<Comment>;
  type?: Maybe<ReactionType>;
  user?: Maybe<User>;
};

export type CursorInput = {
  id: Scalars['ID']['input'];
};

export type Genre = {
  __typename?: 'Genre';
  title: Scalars['String']['output'];
};

export type GenreInput = {
  title: Scalars['String']['input'];
};

export type GenreWhereInput = {
  title: Scalars['String']['input'];
};

export type Manga = {
  __typename?: 'Manga';
  alternativeTitles?: Maybe<Scalars['String']['output']>;
  chapters?: Maybe<Array<Chapter>>;
  comments?: Maybe<Array<Comment>>;
  cover?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Genre>>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  maturityRating?: Maybe<MaturityRatings>;
  publisher?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<AggregatedRating>;
  status?: Maybe<MangaStatuses>;
  subscriptions?: Maybe<Array<UserSubscription>>;
  tags?: Maybe<Array<Tag>>;
  team?: Maybe<Team>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploader?: Maybe<TeamMember>;
  usersReadHistory?: Maybe<Array<ReadingHistory>>;
};

export enum MangaStatuses {
  Completed = 'COMPLETED',
  Continues = 'CONTINUES',
  Frozen = 'FROZEN'
}

export type MangaWhereInput = {
  chaptersCount?: InputMaybe<Scalars['Int']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  maturityRating?: InputMaybe<MaturityRatings>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MangaStatuses>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

export enum MaturityRatings {
  Everyone = 'EVERYONE',
  Mature = 'MATURE',
  Teen = 'TEEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  addChapter: Chapter;
  addGenre: Genre;
  addManga: Manga;
  addNotification: Notification;
  addReadingHistory: ReadingHistory;
  addTag: Tag;
  addTeamMember: TeamMember;
  auth: User;
  createComment: Comment;
  createTeam: Team;
  deleteChapter: Scalars['ID']['output'];
  deleteManga: Manga;
  removeTeam: Team;
  removeTeamMember: TeamMember;
  subscribe: UserSubscription;
  updateChapter: Chapter;
  updateManga: Manga;
  updateMe: User;
  updateUser: User;
};


export type MutationAddChapterArgs = {
  input: AddChapterInput;
};


export type MutationAddGenreArgs = {
  genre: Scalars['String']['input'];
};


export type MutationAddMangaArgs = {
  input: AddMangaInput;
};


export type MutationAddNotificationArgs = {
  input: NotificationInput;
};


export type MutationAddReadingHistoryArgs = {
  lastChapterRead: Scalars['ID']['input'];
  mangaId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddTagArgs = {
  tag: Scalars['String']['input'];
};


export type MutationAddTeamMemberArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationAuthArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateTeamArgs = {
  input: AddTeamInput;
};


export type MutationDeleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMangaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationSubscribeArgs = {
  input: UserSubscriptionInput;
  subscriberId: Scalars['ID']['input'];
};


export type MutationUpdateChapterArgs = {
  input: UpdateChapterInput;
};


export type MutationUpdateMangaArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<AddMangaInput>;
};


export type MutationUpdateMeArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  img?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  read?: Maybe<Scalars['Boolean']['output']>;
  recipient?: Maybe<User>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<NotificationTypes>;
};

export type NotificationInput = {
  description: Scalars['String']['input'];
  img: Scalars['String']['input'];
  link: Scalars['String']['input'];
  recipientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type: NotificationTypes;
};

export enum NotificationTypes {
  Message = 'MESSAGE',
  NewContent = 'NEW_CONTENT',
  Recommendation = 'RECOMMENDATION',
  Reminder = 'REMINDER',
  System = 'SYSTEM',
  UserActivity = 'USER_ACTIVITY'
}

export type Query = {
  __typename?: 'Query';
  allReadingHistory?: Maybe<Array<Maybe<ReadingHistory>>>;
  chapter?: Maybe<Chapter>;
  chapters?: Maybe<Array<Chapter>>;
  commentById?: Maybe<Comment>;
  commentsByChapter?: Maybe<Array<Comment>>;
  commentsByManga?: Maybe<Array<Comment>>;
  commentsByUser?: Maybe<Array<Comment>>;
  genre?: Maybe<Genre>;
  genres?: Maybe<Array<Genre>>;
  manga?: Maybe<Manga>;
  mangas?: Maybe<Array<Manga>>;
  notifications?: Maybe<Array<Notification>>;
  readingHistory?: Maybe<ReadingHistory>;
  repliesOnCommentByCommentId?: Maybe<Array<Comment>>;
  subscriptions?: Maybe<Array<UserSubscription>>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  team?: Maybe<Team>;
  teamMember?: Maybe<TeamMember>;
  teamMembers?: Maybe<Array<TeamMember>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryChapterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChaptersArgs = {
  cursor?: InputMaybe<CursorInput>;
  mangaId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsByChapterArgs = {
  chapterId: Scalars['ID']['input'];
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentsByMangaArgs = {
  cursor?: InputMaybe<CursorInput>;
  mangaId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentsByUserArgs = {
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGenreArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGenresArgs = {
  cursor?: InputMaybe<TagCursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GenreWhereInput>;
};


export type QueryMangaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMangasArgs = {
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MangaWhereInput>;
};


export type QueryReadingHistoryArgs = {
  mangaId: Scalars['ID']['input'];
};


export type QueryRepliesOnCommentByCommentIdArgs = {
  commentId: Scalars['ID']['input'];
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySubscriptionsArgs = {
  input: UserSubscriptionInput;
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagsArgs = {
  cursor?: InputMaybe<TagCursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagWhereInput>;
};


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamMemberArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamMembersArgs = {
  teamId: Scalars['ID']['input'];
};


export type QueryTeamsArgs = {
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<CursorInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Rating = {
  __typename?: 'Rating';
  id?: Maybe<Scalars['ID']['output']>;
  manga?: Maybe<Manga>;
  rating?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
};

export enum ReactionType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ReadingHistory = {
  __typename?: 'ReadingHistory';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastChapterRead?: Maybe<Chapter>;
  manga?: Maybe<Manga>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  NotificationAdded?: Maybe<Notification>;
};

export type Tag = {
  __typename?: 'Tag';
  title: Scalars['String']['output'];
};

export type TagCursorInput = {
  title: Scalars['ID']['input'];
};

export type TagInput = {
  title: Scalars['String']['input'];
};

export type TagWhereInput = {
  title: Scalars['String']['input'];
};

export type Team = {
  __typename?: 'Team';
  avatar?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mangas?: Maybe<Array<Manga>>;
  members?: Maybe<Array<TeamMember>>;
  name?: Maybe<Scalars['String']['output']>;
  subscribed?: Maybe<Array<UserSubscription>>;
  tagline?: Maybe<Scalars['String']['output']>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  mangas?: Maybe<Array<Manga>>;
  role?: Maybe<Scalars['String']['output']>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type UpdateMangaInput = {
  alternativeTitles?: InputMaybe<Array<Scalars['String']['input']>>;
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genres: Array<GenreInput>;
  language?: InputMaybe<Scalars['String']['input']>;
  maturityRating?: InputMaybe<MaturityRatings>;
  status?: InputMaybe<MangaStatuses>;
  tags: Array<TagInput>;
  team: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  uploader: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  commentReactions?: Maybe<Array<CommentReaction>>;
  comments?: Maybe<Array<Comment>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  member?: Maybe<Array<TeamMember>>;
  notifications?: Maybe<Array<Notification>>;
  permissions?: Maybe<Array<Scalars['String']['output']>>;
  readingHistory?: Maybe<Array<ReadingHistory>>;
  subscribedMangas?: Maybe<Array<Manga>>;
  subscriptions?: Maybe<Array<UserSubscription>>;
  team?: Maybe<Array<Team>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userRatings?: Maybe<Array<Rating>>;
  username?: Maybe<Scalars['String']['output']>;
};


export type UserCommentsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  manga?: Maybe<Manga>;
  mangaId?: Maybe<Scalars['ID']['output']>;
  subscriber?: Maybe<User>;
  subscriberId?: Maybe<Scalars['ID']['output']>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']['output']>;
  teamMember?: Maybe<TeamMember>;
  teamMemberId?: Maybe<Scalars['ID']['output']>;
};

export type UserSubscriptionInput = {
  mangaId?: InputMaybe<Scalars['ID']['input']>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
  teamMemberId?: InputMaybe<Scalars['ID']['input']>;
};

export type AddChapterInput = {
  images: Array<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  mangaId: Scalars['ID']['input'];
  number?: InputMaybe<Scalars['Float']['input']>;
  publishDate?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateChapterDataInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Float']['input']>;
  publishDate?: InputMaybe<Scalars['Date']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateChapterInput = {
  chapterId: Scalars['ID']['input'];
  fields: UpdateChapterDataInput;
};

export type GetAuthMutationVariables = Exact<{
  input?: InputMaybe<AuthInput>;
}>;


export type GetAuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'User', avatar?: string | null } };

export type AddTeamMutationVariables = Exact<{
  input: AddTeamInput;
}>;


export type AddTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id?: string | null, name?: string | null } };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, name?: string | null, avatar?: string | null } | null> | null };

export type MangaSelectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MangaSelectionsQuery = { __typename?: 'Query', genres?: Array<{ __typename?: 'Genre', title: string }> | null, tags?: Array<{ __typename?: 'Tag', title: string } | null> | null };


export const GetAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetAuthMutation, GetAuthMutationVariables>;
export const AddTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddTeamMutation, AddTeamMutationVariables>;
export const TeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<TeamsQuery, TeamsQueryVariables>;
export const MangaSelectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MangaSelections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<MangaSelectionsQuery, MangaSelectionsQueryVariables>;