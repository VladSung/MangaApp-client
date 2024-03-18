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

export type AddComicInput = {
  /**
   * header
   * * Changed Maximum max length: `1000`
   *
   */
  alternativeTitles: InputMaybe<Array<Scalars['String']['input']>>;
  cover: Scalars['String']['input'];
  /**
   * header
   * * Changed Maximum max length: `3000`
   *
   */
  description: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum number of items: `1`
   * * Changed Maximum number of items: `5`
   *
   */
  genres: Array<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  maturityRating: MaturityRatings;
  status: InputMaybe<ComicStatuses>;
  /**
   * header
   * * Changed Maximum number of items: `15`
   *
   */
  tags: Array<Scalars['String']['input']>;
  teamId: Scalars['ID']['input'];
  /**
   * header
   * * Changed Minimum length: `5`
   * * Changed Maximum max length: `270`
   *
   */
  title: Scalars['String']['input'];
};

export type AddTeamInput = {
  avatar: Scalars['String']['input'];
  /**
   * header
   * * Changed Maximum max length: `100`
   *
   */
  name: Scalars['String']['input'];
  /**
   * header
   * * Changed Maximum max length: `300`
   *
   */
  tagline: InputMaybe<Scalars['String']['input']>;
};

export type AggregatedRating = {
  __typename?: 'AggregatedRating';
  _avg: Scalars['Float']['output'];
  _count: Scalars['Int']['output'];
};

export type AuthInput = {
  avatar: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Must match format: `email`
   *
   */
  email: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum length: `3`
   * * Changed Maximum max length: `20`
   *
   */
  username: InputMaybe<Scalars['String']['input']>;
};

export type AuthZDirectiveCompositeRulesInput = {
  and: InputMaybe<Array<InputMaybe<AuthZRules>>>;
  not: InputMaybe<AuthZRules>;
  or: InputMaybe<Array<InputMaybe<AuthZRules>>>;
};

export type AuthZDirectiveDeepCompositeRulesInput = {
  and: InputMaybe<Array<InputMaybe<AuthZDirectiveDeepCompositeRulesInput>>>;
  id: InputMaybe<AuthZRules>;
  not: InputMaybe<AuthZDirectiveDeepCompositeRulesInput>;
  or: InputMaybe<Array<InputMaybe<AuthZDirectiveDeepCompositeRulesInput>>>;
};

export enum AuthZRules {
  CanAddGenre = 'CanAddGenre',
  CanAddTag = 'CanAddTag',
  CanAddTeamMember = 'CanAddTeamMember',
  CanCreateTeam = 'CanCreateTeam',
  CanDeleteChapter = 'CanDeleteChapter',
  CanDeleteComic = 'CanDeleteComic',
  CanDeleteGenre = 'CanDeleteGenre',
  CanDeleteTag = 'CanDeleteTag',
  CanDeleteTeam = 'CanDeleteTeam',
  CanDeleteTeamMember = 'CanDeleteTeamMember',
  CanDeleteUser = 'CanDeleteUser',
  CanPublishChapter = 'CanPublishChapter',
  CanPublishComic = 'CanPublishComic',
  CanPushNotification = 'CanPushNotification',
  CanReadChapter = 'CanReadChapter',
  CanReadComic = 'CanReadComic',
  CanReadUser = 'CanReadUser',
  CanUpdateChapter = 'CanUpdateChapter',
  CanUpdateComic = 'CanUpdateComic',
  CanUpdateGenre = 'CanUpdateGenre',
  CanUpdateTag = 'CanUpdateTag',
  CanUpdateTeamMember = 'CanUpdateTeamMember',
  CanUpdateUser = 'CanUpdateUser',
  IsAuthenticated = 'IsAuthenticated'
}

export type Chapter = {
  __typename?: 'Chapter';
  comic: Maybe<Comic>;
  comicId: Scalars['ID']['output'];
  comments: Maybe<Array<Comment>>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  images: Maybe<Array<ChapterImage>>;
  isPaid: Maybe<Scalars['Boolean']['output']>;
  language: Scalars['String']['output'];
  lockedUntil: Maybe<Scalars['Date']['output']>;
  number: Scalars['Float']['output'];
  price: Maybe<Scalars['Int']['output']>;
  publishDate: Scalars['Date']['output'];
  publishStatus: PublishStatuses;
  title: Maybe<Scalars['String']['output']>;
  translationId: Maybe<Scalars['ID']['output']>;
  unlockedForUser: Maybe<Array<User>>;
  updatedAt: Scalars['Date']['output'];
  usersReadHistory: Maybe<Array<ReadingHistory>>;
  volume: Scalars['Int']['output'];
};

export type ChapterImage = {
  __typename?: 'ChapterImage';
  /**
   * header
   * * Changed Must match RegEx pattern: `^[0-9]+:[0-9]+$`
   *
   */
  aspectRatio: Maybe<Scalars['String']['output']>;
  path: Maybe<Scalars['String']['output']>;
};

export type ChapterImageInput = {
  aspectRatio: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type Comic = {
  __typename?: 'Comic';
  alternativeTitles: Scalars['String']['output'];
  chapters: Maybe<Array<Chapter>>;
  comments: Maybe<Array<Comment>>;
  count: Maybe<Scalars['Int']['output']>;
  cover: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  description: Maybe<Scalars['String']['output']>;
  genres: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  maturityRating: MaturityRatings;
  rating: Maybe<AggregatedRating>;
  status: ComicStatuses;
  subscriptions: Maybe<Array<UserSubscription>>;
  tags: Maybe<Array<Tag>>;
  team: Maybe<Team>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  uploader: Maybe<TeamMember>;
  usersReadHistory: Maybe<Array<ReadingHistory>>;
};

export enum ComicStatuses {
  Completed = 'COMPLETED',
  Continues = 'CONTINUES',
  Frozen = 'FROZEN'
}

export type ComicWhereInput = {
  chaptersCount: InputMaybe<Scalars['Int']['input']>;
  genres: InputMaybe<Array<Scalars['String']['input']>>;
  language: InputMaybe<Scalars['String']['input']>;
  maturityRating: InputMaybe<MaturityRatings>;
  rating: InputMaybe<Scalars['Float']['input']>;
  searchText: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<ComicStatuses>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  teamId: InputMaybe<Scalars['ID']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  _count: Maybe<Count>;
  author: Maybe<User>;
  authorId: Scalars['String']['output'];
  chapter: Maybe<Chapter>;
  chapterId: Maybe<Scalars['String']['output']>;
  comic: Maybe<Comic>;
  comicId: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  likes: Scalars['Int']['output'];
  parentComment: Maybe<Comment>;
  parentId: Maybe<Scalars['String']['output']>;
  replies: Maybe<Array<Maybe<Comment>>>;
  updatedAt: Scalars['Date']['output'];
};

export type CommentInput = {
  chapterId: InputMaybe<Scalars['ID']['input']>;
  comicId: InputMaybe<Scalars['ID']['input']>;
  /**
   * header
   * * Changed Minimum length: `10`
   * * Changed Maximum max length: `5000`
   *
   */
  content: Scalars['String']['input'];
  parentCommentId: InputMaybe<Scalars['ID']['input']>;
};

export type CommentReaction = {
  __typename?: 'CommentReaction';
  comment: Maybe<Comment>;
  type: Maybe<ReactionType>;
  user: Maybe<User>;
};

export type CommentResolve = {
  __typename?: 'CommentResolve';
  comments: Maybe<Array<Comment>>;
  count: Maybe<Scalars['Int']['output']>;
};

export type Count = {
  __typename?: 'Count';
  replies: Maybe<Scalars['Int']['output']>;
};

export type CursorInput = {
  id: Scalars['ID']['input'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GenreInput = {
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type GenreWhereInput = {
  title: InputMaybe<Scalars['String']['input']>;
};

export enum MaturityRatings {
  Everyone = 'EVERYONE',
  Mature = 'MATURE',
  Teen = 'TEEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  addChapter: Chapter;
  addComic: Comic;
  addComment: Comment;
  addGenre: Genre;
  addNotification: Notification;
  addReadingHistory: ReadingHistory;
  addTag: Tag;
  addTeamMember: TeamMember;
  auth: User;
  createTeam: Team;
  deleteChapter: Scalars['ID']['output'];
  deleteComic: Comic;
  deleteComment: Comment;
  deleteTeam: Team;
  deleteTeamMember: TeamMember;
  subscribe: UserSubscription;
  unsubscribe: UserSubscription;
  updateChapter: Chapter;
  updateComic: Comic;
  updateComment: Comment;
  updateMe: User;
  updateUser: User;
};


export type MutationAddChapterArgs = {
  input: AddChapterInput;
};


export type MutationAddComicArgs = {
  input: AddComicInput;
};


export type MutationAddCommentArgs = {
  input: CommentInput;
};


export type MutationAddGenreArgs = {
  genre: Scalars['String']['input'];
};


export type MutationAddNotificationArgs = {
  input: NotificationInput;
};


export type MutationAddReadingHistoryArgs = {
  comicId: Scalars['ID']['input'];
  lastChapterRead: Scalars['ID']['input'];
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
  input: InputMaybe<AuthInput>;
};


export type MutationCreateTeamArgs = {
  input: AddTeamInput;
};


export type MutationDeleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteComicArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamMemberArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationSubscribeArgs = {
  input: UserSubscriptionInput;
};


export type MutationUnsubscribeArgs = {
  input: UserSubscriptionInput;
};


export type MutationUpdateChapterArgs = {
  input: UpdateChapterInput;
};


export type MutationUpdateComicArgs = {
  id: Scalars['ID']['input'];
  input: UpdateComicInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['ID']['input'];
  input: CommentInput;
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
  createdAt: Scalars['Date']['output'];
  /**
   * header
   * * Changed Maximum max length: `300`
   *
   */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  img: Scalars['String']['output'];
  link: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  recipient: Maybe<User>;
  /**
   * header
   * * Changed Maximum max length: `100`
   *
   */
  title: Scalars['String']['output'];
  type: NotificationTypes;
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

export type PaginateInput = {
  cursor: InputMaybe<CursorInput>;
  skip: InputMaybe<Scalars['Int']['input']>;
  take: InputMaybe<Scalars['Int']['input']>;
};

export type Permission = {
  __typename?: 'Permission';
  description: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum PublishStatuses {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  __typename?: 'Query';
  allReadingHistory: Maybe<Array<Maybe<ReadingHistory>>>;
  chapter: Maybe<Chapter>;
  chapters: Maybe<Array<Chapter>>;
  comic: Maybe<Comic>;
  comics: Maybe<Array<Comic>>;
  commentById: Maybe<Comment>;
  commentsByChapter: Maybe<Array<Comment>>;
  commentsByComic: CommentResolve;
  commentsByUser: Maybe<Array<Comment>>;
  genre: Maybe<Genre>;
  genres: Maybe<Array<Genre>>;
  me: Maybe<User>;
  notifications: Maybe<Array<Notification>>;
  readingHistory: Maybe<ReadingHistory>;
  repliesOnCommentByCommentId: Maybe<Array<Comment>>;
  subscriptions: Maybe<Array<UserSubscription>>;
  tag: Maybe<Tag>;
  tags: Maybe<Array<Tag>>;
  team: Maybe<Team>;
  teamMember: Maybe<TeamMember>;
  teamMembers: Maybe<Array<TeamMember>>;
  teams: Maybe<Array<Maybe<Team>>>;
  user: Maybe<User>;
  users: Maybe<Array<User>>;
};


export type QueryChapterArgs = {
  comicId: InputMaybe<Scalars['ID']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  number: InputMaybe<Scalars['ID']['input']>;
  volume: InputMaybe<Scalars['ID']['input']>;
};


export type QueryChaptersArgs = {
  comicId: Scalars['ID']['input'];
  paginate: InputMaybe<PaginateInput>;
};


export type QueryComicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryComicsArgs = {
  paginate: InputMaybe<PaginateInput>;
  where: InputMaybe<ComicWhereInput>;
};


export type QueryCommentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsByChapterArgs = {
  chapterId: Scalars['ID']['input'];
  paginate: InputMaybe<PaginateInput>;
};


export type QueryCommentsByComicArgs = {
  comicId: Scalars['ID']['input'];
  paginate: InputMaybe<PaginateInput>;
};


export type QueryCommentsByUserArgs = {
  paginate: InputMaybe<PaginateInput>;
  userId: Scalars['ID']['input'];
};


export type QueryGenreArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGenresArgs = {
  paginate: InputMaybe<PaginateInput>;
  where: InputMaybe<GenreWhereInput>;
};


export type QueryReadingHistoryArgs = {
  comicId: Scalars['ID']['input'];
};


export type QueryRepliesOnCommentByCommentIdArgs = {
  commentId: Scalars['ID']['input'];
  paginate: InputMaybe<PaginateInput>;
};


export type QuerySubscriptionsArgs = {
  input: UserSubscriptionInput;
  paginate: InputMaybe<PaginateInput>;
};


export type QueryTagArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTagsArgs = {
  paginate: InputMaybe<PaginateInput>;
  where: InputMaybe<TagWhereInput>;
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
  paginate: InputMaybe<PaginateInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  paginate: InputMaybe<PaginateInput>;
};

export type Rating = {
  __typename?: 'Rating';
  comic: Comic;
  id: Scalars['ID']['output'];
  /**
   * header
   * * Changed Minimum value: `0`
   * * Changed Maximum value: `10`
   *
   */
  rating: Scalars['Float']['output'];
  user: User;
};

export enum ReactionType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ReadingHistory = {
  __typename?: 'ReadingHistory';
  comic: Comic;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  lastChapterRead: Chapter;
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  NotificationAdded: Maybe<Notification>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type TagWhereInput = {
  title: InputMaybe<Scalars['String']['input']>;
};

export type Team = {
  __typename?: 'Team';
  avatar: Maybe<Scalars['String']['output']>;
  comics: Maybe<Array<Comic>>;
  id: Maybe<Scalars['ID']['output']>;
  members: Maybe<Array<TeamMember>>;
  name: Maybe<Scalars['String']['output']>;
  subscribed: Maybe<Array<UserSubscription>>;
  tagline: Maybe<Scalars['String']['output']>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  comics: Maybe<Array<Comic>>;
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  team: Maybe<Team>;
  user: Maybe<User>;
};

export type UpdateComicInput = {
  /**
   * header
   * * Changed Maximum max length: `1000`
   *
   */
  alternativeTitles: InputMaybe<Array<Scalars['String']['input']>>;
  cover: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Maximum max length: `3000`
   *
   */
  description: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Maximum number of items: `5`
   *
   */
  genres: InputMaybe<Array<Scalars['String']['input']>>;
  language: InputMaybe<Scalars['String']['input']>;
  maturityRating: InputMaybe<MaturityRatings>;
  status: InputMaybe<ComicStatuses>;
  /**
   * header
   * * Changed Maximum number of items: `15`
   *
   */
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  teamId: InputMaybe<Scalars['ID']['input']>;
  /**
   * header
   * * Changed Maximum max length: `270`
   *
   */
  title: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatar: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Must match format: `email`
   *
   */
  email: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum length: `3`
   * * Changed Maximum max length: `20`
   *
   */
  username: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  age: Maybe<Scalars['Date']['output']>;
  avatar: Maybe<Scalars['String']['output']>;
  commentReactions: Maybe<Array<CommentReaction>>;
  comments: Maybe<Array<Comment>>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  member: Maybe<Array<TeamMember>>;
  notifications: Maybe<Array<Notification>>;
  permissions: Maybe<Array<Permission>>;
  readingHistory: Maybe<Array<ReadingHistory>>;
  subscribedComics: Maybe<Array<Comic>>;
  subscriptions: Maybe<Array<UserSubscription>>;
  updatedAt: Scalars['Date']['output'];
  userRatings: Maybe<Array<Rating>>;
  username: Scalars['String']['output'];
};


export type UserCommentsArgs = {
  cursor: InputMaybe<Scalars['ID']['input']>;
  skip: InputMaybe<Scalars['Int']['input']>;
  take: InputMaybe<Scalars['Int']['input']>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  comic: Maybe<Comic>;
  comicId: Maybe<Scalars['ID']['output']>;
  subscriber: Maybe<User>;
  subscriberId: Maybe<Scalars['ID']['output']>;
  team: Maybe<Team>;
  teamId: Maybe<Scalars['ID']['output']>;
  teamMember: Maybe<TeamMember>;
  teamMemberId: Maybe<Scalars['ID']['output']>;
};

export type UserSubscriptionInput = {
  comicId: InputMaybe<Scalars['ID']['input']>;
  teamId: InputMaybe<Scalars['ID']['input']>;
  teamMemberId: InputMaybe<Scalars['ID']['input']>;
};

export type AddChapterInput = {
  comicId: Scalars['ID']['input'];
  images: Array<ChapterImageInput>;
  language: Scalars['String']['input'];
  /**
   * header
   * * Changed Minimum value: `0`
   *
   */
  number: Scalars['Float']['input'];
  publishDate: InputMaybe<Scalars['Date']['input']>;
  /**
   * header
   * * Changed Maximum max length: `270`
   *
   */
  title: Scalars['String']['input'];
  /**
   * header
   * * Changed Minimum value: `1`
   *
   */
  volume: Scalars['Int']['input'];
};

export type UpdateChapterDataInput = {
  images: Array<ChapterImageInput>;
  language: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum value: `0`
   *
   */
  number: InputMaybe<Scalars['Float']['input']>;
  publishDate: InputMaybe<Scalars['Date']['input']>;
  /**
   * header
   * * Changed Maximum max length: `270`
   *
   */
  title: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum value: `1`
   *
   */
  volume: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateChapterInput = {
  chapterId: Scalars['ID']['input'];
  fields: UpdateChapterDataInput;
};

export type GetChapterImagesQueryVariables = Exact<{
  volume: InputMaybe<Scalars['ID']['input']>;
  number: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetChapterImagesQuery = { __typename?: 'Query', chapter: { __typename?: 'Chapter', images: Array<{ __typename?: 'ChapterImage', path: string | null, aspectRatio: string | null }> | null } | null };

export type CommentsByComicQueryVariables = Exact<{
  comicId: Scalars['ID']['input'];
}>;


export type CommentsByComicQuery = { __typename?: 'Query', commentsByComic: { __typename?: 'CommentResolve', count: number | null, comments: Array<{ __typename?: 'Comment', createdAt: any, content: string, id: string, _count: { __typename?: 'Count', replies: number | null } | null, author: { __typename?: 'User', id: string, avatar: string | null, username: string } | null }> | null } };

export type ComicNameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ComicNameQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', title: string } | null };

export type GetComicAndLastChapterDataQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetComicAndLastChapterDataQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', title: string, chapters: Array<{ __typename?: 'Chapter', id: string, volume: number, number: number }> | null } | null };

export type AddChapterMutationVariables = Exact<{
  input: AddChapterInput;
}>;


export type AddChapterMutation = { __typename?: 'Mutation', addChapter: { __typename?: 'Chapter', id: string, volume: number, number: number } };

export type ChaptersByComicIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ChaptersByComicIdQuery = { __typename?: 'Query', chapters: Array<{ __typename?: 'Chapter', title: string | null, volume: number, number: number, id: string, publishDate: any, price: number | null }> | null };

export type MyTeamInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MyTeamInfoQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string | null, name: string | null, avatar: string | null, members: Array<{ __typename?: 'TeamMember', role: string, user: { __typename?: 'User', username: string, avatar: string | null, email: string } | null }> | null, comics: Array<{ __typename?: 'Comic', id: string, title: string, alternativeTitles: string, cover: string, updatedAt: any }> | null } | null };

export type GetComicPageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetComicPageQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', id: string, title: string, alternativeTitles: string, cover: string, description: string | null, status: ComicStatuses, genres: Array<{ __typename?: 'Genre', id: number, title: string }> | null, tags: Array<{ __typename?: 'Tag', id: number, title: string }> | null, chapters: Array<{ __typename?: 'Chapter', id: string, createdAt: any, number: number, volume: number, title: string | null }> | null, team: { __typename?: 'Team', members: Array<{ __typename?: 'TeamMember', user: { __typename?: 'User', id: string, avatar: string | null, username: string } | null }> | null } | null } | null };

export type GetComicMetaQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetComicMetaQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', title: string, description: string | null } | null };

export type GetCommentRepliesQueryVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type GetCommentRepliesQuery = { __typename?: 'Query', repliesOnCommentByCommentId: Array<{ __typename?: 'Comment', content: string, createdAt: any, id: string, author: { __typename?: 'User', username: string, avatar: string | null } | null, _count: { __typename?: 'Count', replies: number | null } | null }> | null };

export type GetAuthMutationVariables = Exact<{
  input: InputMaybe<AuthInput>;
}>;


export type GetAuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'User', id: string, avatar: string | null } };

export type AddTeamMutationVariables = Exact<{
  input: AddTeamInput;
}>;


export type AddTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string | null, name: string | null } };

export type AddComicMutationVariables = Exact<{
  input: AddComicInput;
}>;


export type AddComicMutation = { __typename?: 'Mutation', addComic: { __typename: 'Comic', id: string, title: string } };

export type ComicSelectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComicSelectionsQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, title: string }> | null, tags: Array<{ __typename?: 'Tag', id: number, title: string }> | null, teams: Array<{ __typename?: 'Team', id: string | null, avatar: string | null, name: string | null } | null> | null };

export type GetComicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetComicsQuery = { __typename?: 'Query', comics: Array<{ __typename?: 'Comic', cover: string, title: string, id: string }> | null };

export type UpdateComicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateComicInput;
}>;


export type UpdateComicMutation = { __typename?: 'Mutation', updateComic: { __typename: 'Comic' } };

export type GetUserComicQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserComicQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', title: string, alternativeTitles: string, cover: string, description: string | null, language: string, status: ComicStatuses, maturityRating: MaturityRatings, genres: Array<{ __typename?: 'Genre', id: number, title: string }> | null, tags: Array<{ __typename?: 'Tag', id: number, title: string }> | null, team: { __typename?: 'Team', id: string | null, avatar: string | null, name: string | null } | null } | null };

export type GetUserComicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserComicsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, member: Array<{ __typename?: 'TeamMember', id: string, team: { __typename?: 'Team', id: string | null, name: string | null, comics: Array<{ __typename?: 'Comic', id: string, cover: string, title: string, alternativeTitles: string, updatedAt: any }> | null } | null }> | null } | null };

export type MyTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTeamsQuery = { __typename?: 'Query', me: { __typename?: 'User', member: Array<{ __typename?: 'TeamMember', team: { __typename?: 'Team', id: string | null, name: string | null, avatar: string | null } | null }> | null } | null };

export type AddTeamMutationMutationVariables = Exact<{
  input: AddTeamInput;
}>;


export type AddTeamMutationMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string | null, name: string | null, avatar: string | null } };


export const GetChapterImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChapterImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"volume"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"volume"},"value":{"kind":"Variable","name":{"kind":"Name","value":"volume"}}},{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}}]}}]}}]} as unknown as DocumentNode<GetChapterImagesQuery, GetChapterImagesQueryVariables>;
export const CommentsByComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentsByComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentsByComic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentsByComicQuery, CommentsByComicQueryVariables>;
export const ComicNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ComicNameQuery, ComicNameQueryVariables>;
export const GetComicAndLastChapterDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComicAndLastChapterData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]} as unknown as DocumentNode<GetComicAndLastChapterDataQuery, GetComicAndLastChapterDataQueryVariables>;
export const AddChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"addChapterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]} as unknown as DocumentNode<AddChapterMutation, AddChapterMutationVariables>;
export const ChaptersByComicIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChaptersByComicId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<ChaptersByComicIdQuery, ChaptersByComicIdQueryVariables>;
export const MyTeamInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTeamInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<MyTeamInfoQuery, MyTeamInfoQueryVariables>;
export const GetComicPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComicPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetComicPageQuery, GetComicPageQueryVariables>;
export const GetComicMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComicMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetComicMetaQuery, GetComicMetaQueryVariables>;
export const GetCommentRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCommentReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliesOnCommentByCommentId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replies"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentRepliesQuery, GetCommentRepliesQueryVariables>;
export const GetAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<GetAuthMutation, GetAuthMutationVariables>;
export const AddTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddTeamMutation, AddTeamMutationVariables>;
export const AddComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddComicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<AddComicMutation, AddComicMutationVariables>;
export const ComicSelectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicSelections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ComicSelectionsQuery, ComicSelectionsQueryVariables>;
export const GetComicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getComics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"50"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetComicsQuery, GetComicsQueryVariables>;
export const UpdateComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<UpdateComicMutation, UpdateComicMutationVariables>;
export const GetUserComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"maturityRating"}}]}}]}}]} as unknown as DocumentNode<GetUserComicQuery, GetUserComicQueryVariables>;
export const GetUserComicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserComics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserComicsQuery, GetUserComicsQueryVariables>;
export const MyTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyTeamsQuery, MyTeamsQueryVariables>;
export const AddTeamMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<AddTeamMutationMutation, AddTeamMutationMutationVariables>;