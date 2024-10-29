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
  /**
   * Статус закладки.
   * Может быть одним из предопределенных значений:
   * - IN_PLANS (В планах)
   * - READ
   * - READING (Читаю)
   * - DROPPED (Брошено)
   * Или любым пользовательским строковым значением.
   *
   *     use `enum PredefinedBookmarkTitle` for default titles
   */
  BookmarkTitle: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** String */
  URL: { input: string; output: string; }
};

export type AddComicInput = {
  /**
   * header
   * * Changed Maximum max length: `1000`
   *
   */
  alternativeTitles?: InputMaybe<Scalars['String']['input']>;
  cover: Scalars['String']['input'];
  /**
   * header
   * * Changed Maximum max length: `3000`
   *
   */
  description?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum number of items: `1`
   * * Changed Maximum number of items: `5`
   *
   */
  genres: Array<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  maturityRating: MaturityRatings;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ComicStatuses>;
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

export type AddReadHistoryInput = {
  chapterId: Scalars['ID']['input'];
  comicId: Scalars['ID']['input'];
};

export type AddTeamInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
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
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type AggregatedRating = {
  rating: Scalars['Float']['output'];
  totalCount: Scalars['Int']['output'];
};

export type AuthInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Must match format: `email`
   *
   */
  email?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum length: `3`
   * * Changed Maximum max length: `20`
   *
   */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Bookmark = {
  comics?: Maybe<Array<Comic>>;
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['BookmarkTitle']['output'];
  user?: Maybe<User>;
};

export type BookmarkConnection = {
  edges?: Maybe<Array<BookmarkEdge>>;
  pageInfo: ConnectionInfo;
};

export type BookmarkEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Bookmark;
};

export type BookmarkInput = {
  comicId: Scalars['ID']['input'];
  customTitle?: InputMaybe<Scalars['String']['input']>;
  predefinedTitle?: InputMaybe<PredefinedBookmarkTitle>;
};

export type BookmarkMutations = {
  add: BookmarkPayload;
  delete: BookmarkPayload;
  update: BookmarkPayload;
};


export type BookmarkMutationsAddArgs = {
  input: BookmarkInput;
};


export type BookmarkMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type BookmarkMutationsUpdateArgs = {
  id: Scalars['ID']['input'];
  input: BookmarkInput;
};

export type BookmarkPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Bookmark>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Chapter = {
  comic?: Maybe<Comic>;
  comicId: Scalars['ID']['output'];
  comments?: Maybe<CommentConnection>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ChapterImage>>;
  language: Scalars['String']['output'];
  lockedUntil?: Maybe<Scalars['DateTime']['output']>;
  number: Scalars['Float']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  publishDate: Scalars['DateTime']['output'];
  publishStatus: PublishStatuses;
  title?: Maybe<Scalars['String']['output']>;
  translationId?: Maybe<Scalars['ID']['output']>;
  unlockedForUser?: Maybe<Array<Maybe<User>>>;
  updatedAt: Scalars['DateTime']['output'];
  usersReadHistory?: Maybe<ReadHistory>;
  viewed?: Maybe<Scalars['Boolean']['output']>;
  volume: Scalars['Int']['output'];
};

export type ChapterConnection = {
  edges?: Maybe<Array<ChapterEdge>>;
  pageInfo: ConnectionInfo;
};

export type ChapterEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Chapter;
};

export type ChapterImage = {
  /**
   * header
   * * Changed Must match RegEx pattern: `^[0-9]+:[0-9]+$`
   *
   */
  aspectRatio?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['URL']['output']>;
};

export type ChapterImageInput = {
  aspectRatio: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type ChapterInput = {
  comicId?: InputMaybe<Scalars['ID']['input']>;
  number?: InputMaybe<Scalars['ID']['input']>;
  volume?: InputMaybe<Scalars['ID']['input']>;
};

export type ChapterMutations = {
  add: ChapterPayload;
  delete: ChapterPayload;
  update: ChapterPayload;
};


export type ChapterMutationsAddArgs = {
  input: AddChapterInput;
};


export type ChapterMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type ChapterMutationsUpdateArgs = {
  input: UpdateChapterInput;
};

export type ChapterPaginateCursorInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  number?: InputMaybe<Scalars['Float']['input']>;
  volume?: InputMaybe<Scalars['Int']['input']>;
};

export type ChapterPaginateInput = {
  after?: InputMaybe<ChapterPaginateCursorInput>;
  before?: InputMaybe<ChapterPaginateCursorInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type ChapterPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Chapter>;
};

export type ChapterQueries = {
  all: ChapterConnection;
  one?: Maybe<Chapter>;
};


export type ChapterQueriesAllArgs = {
  comicId: Scalars['ID']['input'];
  paginate: ChapterPaginateInput;
  sort?: InputMaybe<OrderBy>;
};


export type ChapterQueriesOneArgs = {
  input: ChapterInput;
};

export type Comic = {
  alternativeTitles?: Maybe<Scalars['String']['output']>;
  bookmarks?: Maybe<BookmarkConnection>;
  chapters?: Maybe<ChapterConnection>;
  comments?: Maybe<CommentConnection>;
  count?: Maybe<Scalars['Int']['output']>;
  cover: Scalars['URL']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  lastReadChapter?: Maybe<Chapter>;
  maturityRating: MaturityRatings;
  rating?: Maybe<AggregatedRating>;
  status: ComicStatuses;
  subscriptions?: Maybe<UserSubscriptionConnection>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  team?: Maybe<Team>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploader?: Maybe<TeamMember>;
  usersReadHistory?: Maybe<ReadHistoryConnection>;
};


export type ComicBookmarksArgs = {
  paginate: PaginateInput;
};


export type ComicChaptersArgs = {
  paginate: ChapterPaginateInput;
  sort?: InputMaybe<OrderBy>;
};


export type ComicCommentsArgs = {
  paginate: PaginateInput;
};


export type ComicUsersReadHistoryArgs = {
  paginate: PaginateInput;
  sort?: InputMaybe<OrderBy>;
};

export type ComicConnection = {
  edges?: Maybe<Array<ComicEdge>>;
  pageInfo: ConnectionInfo;
};

export type ComicEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Comic;
};

export type ComicFilterInput = {
  chaptersCount?: InputMaybe<Scalars['Int']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  maturityRating?: InputMaybe<MaturityRatings>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ComicStatuses>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};

export type ComicMutations = {
  add: ComicPayload;
  delete: ComicPayload;
  rate: RatingPayload;
  update: ComicPayload;
};


export type ComicMutationsAddArgs = {
  input: AddComicInput;
};


export type ComicMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type ComicMutationsRateArgs = {
  input: RateInput;
};


export type ComicMutationsUpdateArgs = {
  id: Scalars['ID']['input'];
  input: UpdateComicInput;
};

export type ComicPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Comic>;
};

export type ComicQueries = {
  all: ComicConnection;
  one?: Maybe<Comic>;
  popular: ComicConnection;
};


export type ComicQueriesAllArgs = {
  filter?: InputMaybe<ComicFilterInput>;
  paginate: PaginateInput;
};


export type ComicQueriesOneArgs = {
  id: Scalars['ID']['input'];
};


export type ComicQueriesPopularArgs = {
  filter?: InputMaybe<ComicFilterInput>;
  paginate: PaginateInput;
};

export enum ComicStatuses {
  Completed = 'COMPLETED',
  Continues = 'CONTINUES',
  Frozen = 'FROZEN'
}

export type Comment = {
  author?: Maybe<User>;
  authorId: Scalars['String']['output'];
  chapter?: Maybe<Chapter>;
  chapterId?: Maybe<Scalars['String']['output']>;
  comic?: Maybe<Comic>;
  comicId?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPinned: Scalars['Boolean']['output'];
  isReply: Scalars['Boolean']['output'];
  mentionedUser?: Maybe<User>;
  mentionedUserPublicId?: Maybe<Scalars['String']['output']>;
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<CommentReaction>;
  replies?: Maybe<Array<Comment>>;
  repliesCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentConnection = {
  edges?: Maybe<Array<CommentEdge>>;
  pageInfo: ConnectionInfo;
};

export type CommentEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Comment;
};

export type CommentInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  comicId: Scalars['ID']['input'];
  /**
   * header
   * * Changed Minimum length: `2`
   * * Changed Maximum max length: `5000`
   *
   */
  content: Scalars['String']['input'];
  mentionedUserId?: InputMaybe<Scalars['ID']['input']>;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
};

export type CommentMutations = {
  create: CommentPayload;
  delete: CommentPayload;
  pin: CommentPayload;
  unpin: CommentPayload;
  update: CommentPayload;
  updateReaction: CommentPayload;
};


export type CommentMutationsCreateArgs = {
  input: CommentInput;
};


export type CommentMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type CommentMutationsPinArgs = {
  id: Scalars['ID']['input'];
};


export type CommentMutationsUnpinArgs = {
  id: Scalars['ID']['input'];
};


export type CommentMutationsUpdateArgs = {
  input: CommentUpdateInput;
};


export type CommentMutationsUpdateReactionArgs = {
  input: UpdateCommentReactionInput;
};

export type CommentPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Comment>;
};

export type CommentPinInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  comicId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};

export type CommentQueries = {
  allByChapter: CommentConnection;
  allByComic: CommentConnection;
  allByUser: CommentConnection;
  one?: Maybe<Comment>;
};


export type CommentQueriesAllByChapterArgs = {
  chapterId: Scalars['ID']['input'];
  paginate?: InputMaybe<PaginateInput>;
  sort: CommentSort;
};


export type CommentQueriesAllByComicArgs = {
  comicId: Scalars['ID']['input'];
  paginate?: InputMaybe<PaginateInput>;
  sort: CommentSort;
};


export type CommentQueriesAllByUserArgs = {
  paginate?: InputMaybe<PaginateInput>;
  sort: CommentSort;
  userId: Scalars['ID']['input'];
};


export type CommentQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type CommentReaction = {
  dislike: Scalars['Int']['output'];
  like: Scalars['Int']['output'];
  userReactType?: Maybe<ReactionType>;
};

export type CommentReply = {
  author?: Maybe<User>;
  authorId: Scalars['String']['output'];
  chapter?: Maybe<Chapter>;
  chapterId?: Maybe<Scalars['String']['output']>;
  comic?: Maybe<Comic>;
  comicId?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPinned: Scalars['Boolean']['output'];
  isReply: Scalars['Boolean']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  mentionedUser?: Maybe<User>;
  mentionedUserPublicId?: Maybe<Scalars['String']['output']>;
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentReplyConnection = {
  edges?: Maybe<Array<CommentReplyEdge>>;
  pageInfo: ConnectionInfo;
};

export type CommentReplyEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Comment;
};

export type CommentReplyInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  comicId: Scalars['ID']['input'];
  /**
   * header
   * * Changed Minimum length: `2`
   * * Changed Maximum max length: `5000`
   *
   */
  content: Scalars['String']['input'];
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
};

export type CommentReplyMutations = {
  create: CommentReplyPayload;
  delete: CommentReplyPayload;
  update: CommentReplyPayload;
};


export type CommentReplyMutationsCreateArgs = {
  input: CommentReplyInput;
};


export type CommentReplyMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type CommentReplyMutationsUpdateArgs = {
  id: Scalars['ID']['input'];
  input: CommentReplyInput;
};

export type CommentReplyPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<CommentReply>;
};

export type CommentReplyQueries = {
  allByCommentId: CommentReplyConnection;
};


export type CommentReplyQueriesAllByCommentIdArgs = {
  commentId: Scalars['ID']['input'];
  paginate?: InputMaybe<PaginateInput>;
  sort: CommentSort;
};

export enum CommentSort {
  New = 'NEW',
  Popular = 'POPULAR'
}

export type CommentUpdateInput = {
  /**
   * header
   * * Changed Minimum length: `2`
   * * Changed Maximum max length: `5000`
   *
   */
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type CommonIssue = IssueInterface & {
  message?: Maybe<Scalars['String']['output']>;
};

export type ConnectionInfo = {
  endCursor?: Maybe<Scalars['ID']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['ID']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CreateTeamPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Team>;
};

export type CurrentUser = UserBase & {
  age?: Maybe<Scalars['DateTime']['output']>;
  avatar?: Maybe<Scalars['URL']['output']>;
  background?: Maybe<Scalars['URL']['output']>;
  bookmarks?: Maybe<BookmarkConnection>;
  commentReactions?: Maybe<Array<CommentReaction>>;
  comments?: Maybe<CommentConnection>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membersOf?: Maybe<TeamMemberConnection>;
  name: Scalars['String']['output'];
  notifications?: Maybe<NotificationConnection>;
  permissions?: Maybe<Array<Permission>>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  publicId: Scalars['String']['output'];
  readHistory?: Maybe<ReadHistoryConnection>;
  socialLinks?: Maybe<Array<Scalars['URL']['output']>>;
  subscribedComics?: Maybe<ComicConnection>;
  subscriptions?: Maybe<UserSubscriptionConnection>;
  updatedAt: Scalars['DateTime']['output'];
  userRatings?: Maybe<Array<Rating>>;
};


export type CurrentUserBookmarksArgs = {
  paginate: PaginateInput;
};


export type CurrentUserCommentsArgs = {
  paginate: PaginateInput;
};


export type CurrentUserMembersOfArgs = {
  paginate: PaginateInput;
};


export type CurrentUserNotificationsArgs = {
  paginate: PaginateInput;
};


export type CurrentUserReadHistoryArgs = {
  paginate: PaginateInput;
};


export type CurrentUserSubscribedComicsArgs = {
  paginate: PaginateInput;
};


export type CurrentUserSubscriptionsArgs = {
  paginate: PaginateInput;
};

export type GenerateTeamInviteLinkPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Scalars['String']['output']>;
};

export type Genre = {
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GenreFilterInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GenreMutations = {
  add: GenrePayload;
  update: GenrePayload;
};


export type GenreMutationsAddArgs = {
  genre: Scalars['String']['input'];
};


export type GenreMutationsUpdateArgs = {
  input: UpdateGenreInput;
};

export type GenrePayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Genre>;
};

export type GenreQueries = {
  all: Array<Genre>;
  one?: Maybe<Genre>;
};


export type GenreQueriesAllArgs = {
  filter?: InputMaybe<GenreFilterInput>;
};


export type GenreQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type IssueInterface = {
  message?: Maybe<Scalars['String']['output']>;
};

export enum MaturityRatings {
  Everyone = 'EVERYONE',
  Mature = 'MATURE',
  Teen = 'TEEN'
}

export type Mutation = {
  bookmark?: Maybe<BookmarkMutations>;
  chapter: ChapterMutations;
  comic: ComicMutations;
  comment: CommentMutations;
  commentReply: CommentReplyMutations;
  genre: GenreMutations;
  notification: NotificationMutations;
  readHistory: ReadHistoryMutations;
  tag: TagMutations;
  team: TeamMutations;
  teamMember: TeamMemberMutations;
  user: UserMutations;
  userSubscription: UserSubscriptionMutations;
};

export type Notification = {
  createdAt: Scalars['DateTime']['output'];
  /**
   * header
   * * Changed Maximum max length: `300`
   *
   */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  img: Scalars['URL']['output'];
  link: Scalars['URL']['output'];
  read: Scalars['Boolean']['output'];
  recipient?: Maybe<User>;
  /**
   * header
   * * Changed Maximum max length: `100`
   *
   */
  title: Scalars['String']['output'];
  type: NotificationTypes;
};

export type NotificationConnection = {
  edges?: Maybe<Array<NotificationEdge>>;
  pageInfo: ConnectionInfo;
};

export type NotificationEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Notification;
};

export type NotificationInput = {
  description: Scalars['String']['input'];
  img: Scalars['String']['input'];
  link: Scalars['String']['input'];
  recipientId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type: NotificationTypes;
};

export type NotificationMutations = {
  add: NotificationPayload;
  delete: NotificationPayload;
};


export type NotificationMutationsAddArgs = {
  input: NotificationInput;
};


export type NotificationMutationsDeleteArgs = {
  id: Array<Scalars['ID']['input']>;
};

export type NotificationPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Notification>;
};

export type NotificationQueries = {
  all: NotificationConnection;
};


export type NotificationQueriesAllArgs = {
  input: PaginateInput;
};

export enum NotificationTypes {
  Message = 'MESSAGE',
  NewContent = 'NEW_CONTENT',
  Recommendation = 'RECOMMENDATION',
  Reminder = 'REMINDER',
  System = 'SYSTEM',
  UserActivity = 'USER_ACTIVITY'
}

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

/**
 * "before" has higher priority.
 * This means that if "before" and "after" are given at the same time, then "after" will be ignored
 */
export type PaginateInput = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Permission = {
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum PredefinedBookmarkTitle {
  Dropped = 'DROPPED',
  InPlans = 'IN_PLANS',
  Postponed = 'POSTPONED',
  Read = 'READ',
  Reading = 'READING'
}

export enum PublishStatuses {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Query = {
  bookmark?: Maybe<Bookmark>;
  bookmarks: BookmarkConnection;
  chapter: ChapterQueries;
  comic: ComicQueries;
  comment: CommentQueries;
  commentReply: CommentReplyQueries;
  genre: GenreQueries;
  notification: NotificationQueries;
  readHistory: ReadHistoryQueries;
  tag: TagQueries;
  team: TeamQueries;
  teamMember: TeamMemberQueries;
  user: UserQueries;
  userSubscription: UserSubscriptionQueries;
};


export type QueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookmarksArgs = {
  paginate: PaginateInput;
};

export type RateInput = {
  id: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
};

export type Rating = {
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

export type RatingPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<AggregatedRating>;
};

export enum ReactionType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ReadHistory = {
  chapter?: Maybe<Chapter>;
  comic?: Maybe<Comic>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type ReadHistoryConnection = {
  edges?: Maybe<Array<ReadHistoryEdge>>;
  pageInfo: ConnectionInfo;
};

export type ReadHistoryEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: ReadHistory;
};

export type ReadHistoryMutations = {
  add: ReadHistoryPayload;
  delete: ReadHistoryPayload;
};


export type ReadHistoryMutationsAddArgs = {
  input: AddReadHistoryInput;
};


export type ReadHistoryMutationsDeleteArgs = {
  id: Array<Scalars['ID']['input']>;
};

export type ReadHistoryPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<ReadHistory>;
};

export type ReadHistoryQueries = {
  all: ReadHistoryConnection;
  one?: Maybe<ReadHistory>;
};


export type ReadHistoryQueriesOneArgs = {
  comicId: Scalars['ID']['input'];
};

export type SendInviteToEmailPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  NotificationAdded?: Maybe<Notification>;
};

export type Tag = {
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type TagFilterInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TagMutations = {
  add: TagPayload;
  update: TagPayload;
};


export type TagMutationsAddArgs = {
  tag: Scalars['String']['input'];
};


export type TagMutationsUpdateArgs = {
  input: UpdateTagInput;
};

export type TagPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Tag>;
};

export type TagQueries = {
  all: Array<Tag>;
  one?: Maybe<Tag>;
};


export type TagQueriesAllArgs = {
  filter?: InputMaybe<TagFilterInput>;
};


export type TagQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type Team = {
  avatar?: Maybe<Scalars['URL']['output']>;
  comics?: Maybe<ComicConnection>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<TeamMemberConnection>;
  name: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
  socialLinks?: Maybe<Array<Scalars['URL']['output']>>;
  subscribed?: Maybe<UserSubscriptionConnection>;
};


export type TeamMembersArgs = {
  paginate: PaginateInput;
};

export type TeamConnection = {
  edges?: Maybe<Array<TeamEdge>>;
  pageInfo: ConnectionInfo;
};

export type TeamEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Team;
};

export type TeamMember = {
  comics?: Maybe<Array<Comic>>;
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type TeamMemberConnection = {
  edges?: Maybe<Array<TeamMemberEdge>>;
  pageInfo: ConnectionInfo;
};

export type TeamMemberEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: TeamMember;
};

export type TeamMemberMutations = {
  add: TeamMemberPayload;
  delete: TeamMemberPayload;
};


export type TeamMemberMutationsAddArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type TeamMemberMutationsDeleteArgs = {
  memberId: Scalars['ID']['input'];
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type TeamMemberPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<TeamMember>;
};

export type TeamMemberQueries = {
  all: TeamMemberConnection;
  one?: Maybe<TeamMember>;
};


export type TeamMemberQueriesAllArgs = {
  paginate: PaginateInput;
  teamId: Scalars['ID']['input'];
};


export type TeamMemberQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type TeamMutations = {
  create: CreateTeamPayload;
  delete: UpdateTeamPayload;
  generateTeamInviteLink: GenerateTeamInviteLinkPayload;
  inviteMemberToTeam: TeamMemberPayload;
  sendInviteToEmail: SendInviteToEmailPayload;
  update: UpdateTeamPayload;
};


export type TeamMutationsCreateArgs = {
  input: AddTeamInput;
};


export type TeamMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type TeamMutationsGenerateTeamInviteLinkArgs = {
  role: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type TeamMutationsInviteMemberToTeamArgs = {
  inviteToken: Scalars['String']['input'];
};


export type TeamMutationsSendInviteToEmailArgs = {
  email: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['ID']['input'];
};


export type TeamMutationsUpdateArgs = {
  id: Scalars['ID']['input'];
  input: AddTeamInput;
};

export type TeamQueries = {
  all: TeamConnection;
  one?: Maybe<Team>;
};


export type TeamQueriesAllArgs = {
  paginate: PaginateInput;
};


export type TeamQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateComicInput = {
  /**
   * header
   * * Changed Maximum max length: `1000`
   *
   */
  alternativeTitles?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Maximum max length: `3000`
   *
   */
  description?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Maximum number of items: `5`
   *
   */
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  maturityRating?: InputMaybe<MaturityRatings>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ComicStatuses>;
  /**
   * header
   * * Changed Maximum number of items: `15`
   *
   */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * header
   * * Changed Maximum max length: `270`
   *
   */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentReactionInput = {
  id: Scalars['ID']['input'];
  reaction: ReactionType;
};

export type UpdateCurrentUserInput = {
  age?: InputMaybe<Scalars['DateTime']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Must match format: `email`
   *
   */
  email?: InputMaybe<Scalars['String']['input']>;
  preferredLanguage?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum length: `3`
   * * Changed Maximum max length: `20`
   *
   */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGenreInput = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateTagInput = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateTeamPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<Team>;
};

export type UpdateUserInput = {
  age?: InputMaybe<Scalars['DateTime']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Must match format: `email`
   *
   */
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  preferredLanguage?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum length: `3`
   * * Changed Maximum max length: `20`
   *
   */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = UserBase & {
  age?: Maybe<Scalars['DateTime']['output']>;
  avatar?: Maybe<Scalars['URL']['output']>;
  background?: Maybe<Scalars['URL']['output']>;
  bookmarks?: Maybe<BookmarkConnection>;
  commentReactions?: Maybe<Array<CommentReaction>>;
  comments?: Maybe<CommentConnection>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membersOf?: Maybe<TeamMemberConnection>;
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Permission>>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  publicId: Scalars['String']['output'];
  readHistory?: Maybe<ReadHistoryConnection>;
  socialLinks?: Maybe<Array<Scalars['URL']['output']>>;
  subscribedComics?: Maybe<ComicConnection>;
  subscriptions?: Maybe<UserSubscriptionConnection>;
  updatedAt: Scalars['DateTime']['output'];
  userRatings?: Maybe<Array<Rating>>;
};


export type UserBookmarksArgs = {
  paginate: PaginateInput;
};


export type UserCommentsArgs = {
  paginate: PaginateInput;
};


export type UserMembersOfArgs = {
  paginate: PaginateInput;
};


export type UserReadHistoryArgs = {
  paginate: PaginateInput;
};


export type UserSubscribedComicsArgs = {
  paginate: PaginateInput;
};


export type UserSubscriptionsArgs = {
  paginate: PaginateInput;
};

export type UserAuthPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<User>;
};

export type UserBase = {
  age?: Maybe<Scalars['DateTime']['output']>;
  avatar?: Maybe<Scalars['URL']['output']>;
  background?: Maybe<Scalars['URL']['output']>;
  bookmarks?: Maybe<BookmarkConnection>;
  commentReactions?: Maybe<Array<CommentReaction>>;
  comments?: Maybe<CommentConnection>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membersOf?: Maybe<TeamMemberConnection>;
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Permission>>;
  preferredLanguage?: Maybe<Scalars['String']['output']>;
  publicId: Scalars['String']['output'];
  readHistory?: Maybe<ReadHistoryConnection>;
  socialLinks?: Maybe<Array<Scalars['URL']['output']>>;
  subscribedComics?: Maybe<ComicConnection>;
  subscriptions?: Maybe<UserSubscriptionConnection>;
  updatedAt: Scalars['DateTime']['output'];
  userRatings?: Maybe<Array<Rating>>;
};


export type UserBaseBookmarksArgs = {
  paginate: PaginateInput;
};


export type UserBaseCommentsArgs = {
  paginate: PaginateInput;
};


export type UserBaseMembersOfArgs = {
  paginate: PaginateInput;
};


export type UserBaseReadHistoryArgs = {
  paginate: PaginateInput;
};


export type UserBaseSubscribedComicsArgs = {
  paginate: PaginateInput;
};


export type UserBaseSubscriptionsArgs = {
  paginate: PaginateInput;
};

export type UserConnection = {
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: ConnectionInfo;
};

export type UserEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: User;
};

export type UserMutations = {
  auth: UserAuthPayload;
  delete: UserUpdatePayload;
  update: UserUpdatePayload;
  updateMe: UserUpdatePayload;
};


export type UserMutationsAuthArgs = {
  input?: InputMaybe<AuthInput>;
};


export type UserMutationsDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type UserMutationsUpdateArgs = {
  input: UpdateUserInput;
};


export type UserMutationsUpdateMeArgs = {
  input: UpdateCurrentUserInput;
};

export type UserQueries = {
  all: UserConnection;
  me?: Maybe<CurrentUser>;
  one?: Maybe<User>;
};


export type UserQueriesAllArgs = {
  paginate: PaginateInput;
};


export type UserQueriesOneArgs = {
  id: Scalars['ID']['input'];
};

export type UserSubscription = {
  comic?: Maybe<Comic>;
  comicId?: Maybe<Scalars['ID']['output']>;
  subscriber?: Maybe<User>;
  subscriberId?: Maybe<Scalars['ID']['output']>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['ID']['output']>;
  teamMember?: Maybe<TeamMember>;
  teamMemberId?: Maybe<Scalars['ID']['output']>;
};

export type UserSubscriptionConnection = {
  edges?: Maybe<Array<UserSubscriptionEdge>>;
  pageInfo: ConnectionInfo;
};

export type UserSubscriptionEdge = {
  cursor?: Maybe<Scalars['ID']['output']>;
  node: Comic;
};

export type UserSubscriptionInput = {
  comicId?: InputMaybe<Scalars['ID']['input']>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
  teamMemberId?: InputMaybe<Scalars['ID']['input']>;
};

export type UserSubscriptionMutations = {
  subscribe: UserSubscriptionPayload;
  unsubscribe: UserSubscriptionPayload;
};


export type UserSubscriptionMutationsSubscribeArgs = {
  input: UserSubscriptionInput;
};


export type UserSubscriptionMutationsUnsubscribeArgs = {
  input: UserSubscriptionInput;
};

export type UserSubscriptionPayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<UserSubscription>;
};

export type UserSubscriptionQueries = {
  all: Array<Maybe<UserSubscription>>;
  one?: Maybe<UserSubscription>;
};


export type UserSubscriptionQueriesAllArgs = {
  input: UserSubscriptionInput;
  paginate: PaginateInput;
};


export type UserSubscriptionQueriesOneArgs = {
  input?: InputMaybe<UserSubscriptionInput>;
};

export type UserUpdatePayload = {
  issue?: Maybe<IssueInterface>;
  record?: Maybe<User>;
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
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  language?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum value: `0`
   *
   */
  number?: InputMaybe<Scalars['Float']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   * header
   * * Changed Maximum max length: `270`
   *
   */
  title?: InputMaybe<Scalars['String']['input']>;
  /**
   * header
   * * Changed Minimum value: `1`
   *
   */
  volume?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateChapterInput = {
  chapterId: Scalars['ID']['input'];
  fields: UpdateChapterDataInput;
};

export type SearchComicsBySearchTextQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchComicsBySearchTextQuery = { comic: { all: { pageInfo: { totalCount?: number | null }, edges?: Array<{ node: { id: string, title: string, alternativeTitles?: string | null, cover: string } }> | null } } };

export type ChaptersByComicIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  sort: OrderBy;
  paginate: ChapterPaginateInput;
}>;


export type ChaptersByComicIdQuery = { chapter: { all: { edges?: Array<{ node: { title?: string | null, volume: number, number: number, id: string, publishDate: any, price?: number | null, usersReadHistory?: { id: string } | null } }> | null, pageInfo: { totalCount?: number | null } } } };

export type ComicInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ComicInfoQuery = { comic: { one?: { id: string, title: string, alternativeTitles?: string | null, cover: string, maturityRating: MaturityRatings, description?: string | null, status: ComicStatuses, createdAt: any, usersReadHistory?: { pageInfo: { totalCount?: number | null } } | null, rating?: { rating: number, totalCount: number } | null, bookmarks?: { pageInfo: { totalCount?: number | null } } | null, lastReadChapter?: { id: string, volume: number, number: number } | null, chapters?: { pageInfo: { totalCount?: number | null } } | null, genres?: Array<{ id: number, title: string } | null> | null, tags?: Array<{ id: number, title: string } | null> | null, team?: { id: string, name: string, avatar?: string | null } | null } | null } };

export type ComicMetaQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ComicMetaQuery = { comic: { one?: { id: string, title: string, description?: string | null, cover: string } | null } };

export type ComicFormSelectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComicFormSelectionsQuery = { genre: { all: Array<{ id: number, title: string }> }, tag: { all: Array<{ id: number, title: string }> }, user: { me?: { membersOf?: { edges?: Array<{ node: { team?: { id: string, avatar?: string | null, name: string } | null } }> | null } | null } | null } };

export type MyTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTeamsQuery = { user: { me?: { membersOf?: { edges?: Array<{ node: { team?: { id: string, name: string, avatar?: string | null } | null } }> | null } | null } | null } };

export type AddTeamMutationMutationVariables = Exact<{
  input: AddTeamInput;
}>;


export type AddTeamMutationMutation = { team: { create: { record?: { id: string, name: string, avatar?: string | null } | null, issue?: { message?: string | null } | null } } };

export type TeamInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TeamInfoQuery = { team: { one?: { id: string, avatar?: string | null, publicId: string, name: string, description?: string | null, socialLinks?: Array<string> | null, members?: { pageInfo: { totalCount?: number | null }, edges?: Array<{ node: { id: string, role: string, user?: { publicId: string, email: string, name: string, avatar?: string | null } | null } }> | null } | null, comics?: { pageInfo: { totalCount?: number | null }, edges?: Array<{ node: { id: string, title: string, alternativeTitles?: string | null, cover: string, updatedAt: any } }> | null } | null } | null } };

export type UserAvatarQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAvatarQuery = { user: { me?: { publicId: string, avatar?: string | null } | null } };

export type AddBookmarkMutationVariables = Exact<{
  input: BookmarkInput;
}>;


export type AddBookmarkMutation = { bookmark?: { add: { record?: { title: any, id: string } | null, issue?: { message?: string | null } | null } } | null };

export type DeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBookmarkMutation = { bookmark?: { delete: { record?: { title: any, id: string } | null, issue?: { message?: string | null } | null } } | null };

export type RateComicMutationVariables = Exact<{
  input: RateInput;
}>;


export type RateComicMutation = { comic: { rate: { record?: { totalCount: number, rating: number } | null, issue?: { message?: string | null } | null } } };

export type ComicFragmentFragment = { id: string, rating?: { rating: number, totalCount: number } | null } & { ' $fragmentName'?: 'ComicFragmentFragment' };

export type AddCommentToComicMutationVariables = Exact<{
  input: CommentInput;
}>;


export type AddCommentToComicMutation = { comment: { create: { issue?: { message?: string | null } | null, record?: { repliesCount: number, isReply: boolean, content: string, createdAt: any, updatedAt: any, isPinned: boolean, id: string, reactions?: { like: number, dislike: number, userReactType?: ReactionType | null } | null, author?: { id: string, publicId: string, name: string, avatar?: string | null } | null } | null } } };

export type CommentsByComicQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paginate: PaginateInput;
  sort: CommentSort;
}>;


export type CommentsByComicQuery = { comment: { allByComic: { pageInfo: { totalCount?: number | null, hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ node: { createdAt: any, content: string, id: string, isReply: boolean, updatedAt: any, isPinned: boolean, repliesCount: number, reactions?: { userReactType?: ReactionType | null, like: number, dislike: number } | null, author?: { id: string, publicId: string, avatar?: string | null, name: string } | null } }> | null } } };

export type CommentRepliesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  sort: CommentSort;
}>;


export type CommentRepliesQuery = { commentReply: { allByCommentId: { pageInfo: { totalCount?: number | null }, edges?: Array<{ node: { createdAt: any, content: string, isReply: boolean, id: string, updatedAt: any, mentionedUserPublicId?: string | null, isPinned: boolean, reactions?: { like: number, dislike: number, userReactType?: ReactionType | null } | null, author?: { id: string, publicId: string, avatar?: string | null, name: string } | null } }> | null } } };

export type CommentsByChapterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  paginate: PaginateInput;
  sort: CommentSort;
}>;


export type CommentsByChapterQuery = { comment: { allByChapter: { pageInfo: { totalCount?: number | null, hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ node: { createdAt: any, content: string, isPinned: boolean, updatedAt: any, isReply: boolean, repliesCount: number, id: string, reactions?: { like: number, dislike: number } | null, author?: { id: string, publicId: string, avatar?: string | null, name: string } | null } }> | null } } };

export type CommentFragmentFragment = { createdAt: any, content: string, isPinned: boolean, isReply: boolean, updatedAt: any, repliesCount: number, id: string, reactions?: { like: number, dislike: number, userReactType?: ReactionType | null } | null, author?: { id: string, publicId: string, avatar?: string | null, name: string } | null } & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type UpdateCommentMutationVariables = Exact<{
  input: CommentUpdateInput;
}>;


export type UpdateCommentMutation = { comment: { update: { record?: { id: string, content: string } | null } } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { comment: { delete: { record?: { id: string } | null, issue?: { message?: string | null } | null } } };

export type PinCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type PinCommentMutation = { comment: { pin: { record?: { id: string } | null, issue?: { message?: string | null } | null } } };

export type UnpinCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type UnpinCommentMutation = { comment: { unpin: { record?: { id: string } | null, issue?: { message?: string | null } | null } } };

export type _Fragment = { usersReadHistory?: { id: string } | null } & { ' $fragmentName'?: '_Fragment' };

export type AddReadHistoryMutationVariables = Exact<{
  input: AddReadHistoryInput;
}>;


export type AddReadHistoryMutation = { readHistory: { add: { record?: { id: string, chapter?: { id: string } | null } | null, issue?: { message?: string | null } | null } } };

export type GenerateInviteLinkMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type GenerateInviteLinkMutation = { team: { generateTeamInviteLink: { record?: string | null, issue?: { message?: string | null } | null } } };

export type SendInviteEmailMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type SendInviteEmailMutation = { team: { sendInviteToEmail: { record?: string | null } } };

export type UserSettingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserSettingQueryQuery = { user: { me?: { name: string, avatar?: string | null } | null } };

export type ChapterImagesQueryVariables = Exact<{
  comicId: Scalars['ID']['input'];
  paginate: ChapterPaginateInput;
}>;


export type ChapterImagesQuery = { chapter: { all: { edges?: Array<{ node: { id: string, title?: string | null, volume: number, number: number, images?: Array<{ path?: string | null, aspectRatio?: string | null }> | null } }> | null, pageInfo: { hasNextPage: boolean, totalCount?: number | null, endCursor?: string | null } } } };

export type LastChapterOfComicQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LastChapterOfComicQuery = { comic: { one?: { title: string, chapters?: { edges?: Array<{ node: { id: string, volume: number, number: number } }> | null, pageInfo: { totalCount?: number | null } } | null } | null } };

export type AddChapterMutationVariables = Exact<{
  input: AddChapterInput;
}>;


export type AddChapterMutation = { chapter: { add: { record?: { id: string, volume: number, number: number } | null, issue?: { message?: string | null } | null } } };

export type ComicBaseInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ComicBaseInfoQuery = { comic: { one?: { id: string, title: string, cover: string, description?: string | null, status: ComicStatuses, maturityRating: MaturityRatings, language: string, createdAt: any, updatedAt: any, count?: number | null, rating?: { totalCount: number, rating: number } | null, genres?: Array<{ title: string } | null> | null, tags?: Array<{ title: string } | null> | null } | null } };

export type DeleteComicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteComicMutation = { comic: { delete: { record?: { id: string, title: string } | null } } };

export type DashboardOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardOverviewQuery = { user: { me?: { name: string, membersOf?: { edges?: Array<{ node: { role: string, team?: { id: string, name: string, avatar?: string | null, comics?: { edges?: Array<{ node: { id: string, title: string, cover: string, status: ComicStatuses, count?: number | null, updatedAt: any } }> | null } | null } | null } }> | null } | null, notifications?: { edges?: Array<{ node: { id: string, title: string, description: string, createdAt: any, type: NotificationTypes } }> | null } | null } | null } };

export type DashboardStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardStatisticsQuery = { user: { me?: { membersOf?: { edges?: Array<{ node: { team?: { id: string, name: string, comics?: { edges?: Array<{ node: { id: string, title: string, rating?: { rating: number, totalCount: number } | null, usersReadHistory?: { pageInfo: { totalCount?: number | null } } | null, comments?: { pageInfo: { totalCount?: number | null } } | null, subscriptions?: { pageInfo: { totalCount?: number | null } } | null } }> | null } | null } | null } }> | null } | null } | null } };

export type DeleteUserTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type DeleteUserTeamMutation = { team: { delete: { record?: { id: string } | null } } };

export type MeBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type MeBookmarksQuery = { user: { me?: { bookmarks?: { edges?: Array<{ node: { id: string, title: any, comics?: Array<{ id: string, title: string, cover: string, lastReadChapter?: { volume: number, id: string, number: number } | null }> | null } }> | null } | null } | null } };

export type MeProfileInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProfileInfoQuery = { user: { me?: { name: string, publicId: string, avatar?: string | null, description?: string | null, background?: string | null, socialLinks?: Array<string> | null, membersOf?: { edges?: Array<{ node: { role: string, id: string, team?: { id: string, name: string, avatar?: string | null, description?: string | null, comics?: { edges?: Array<{ node: { id: string, title: string, cover: string } }> | null } | null } | null } }> | null } | null } | null } };

export type UserInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserInfoQuery = { user: { one?: { id: string, avatar?: string | null, name: string, publicId: string, description?: string | null, background?: string | null, membersOf?: { edges?: Array<{ node: { id: string, role: string, comics?: Array<{ id: string, cover: string, title: string }> | null, team?: { id: string, description?: string | null, name: string, avatar?: string | null } | null } }> | null } | null } | null } };

export type AddComicMutationVariables = Exact<{
  input: AddComicInput;
}>;


export type AddComicMutation = { comic: { add: { issue?: { message?: string | null } | null, record?: { id: string, title: string } | null } } };

export type ComicsWithFiltersQueryVariables = Exact<{
  paginate: PaginateInput;
  filter?: InputMaybe<ComicFilterInput>;
}>;


export type ComicsWithFiltersQuery = { comic: { all: { pageInfo: { endCursor?: string | null, totalCount?: number | null, hasNextPage: boolean }, edges?: Array<{ node: { id: string, cover: string, title: string, alternativeTitles?: string | null, updatedAt: any } }> | null } } };

export type PopularComicsQueryVariables = Exact<{
  paginate: PaginateInput;
}>;


export type PopularComicsQuery = { comic: { popular: { edges?: Array<{ node: { title: string, cover: string, id: string } }> | null } } };

export type UserComicForUpdateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserComicForUpdateQuery = { comic: { one?: { title: string, alternativeTitles?: string | null, cover: string, description?: string | null, language: string, status: ComicStatuses, maturityRating: MaturityRatings, genres?: Array<{ id: number, title: string } | null> | null, tags?: Array<{ id: number, title: string } | null> | null, team?: { id: string, avatar?: string | null, name: string } | null } | null } };

export type UpdateComicMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateComicInput;
}>;


export type UpdateComicMutation = { comic: { update: { record?: { id: string } | null } } };

export type UpdateCommentReactionMutationVariables = Exact<{
  input: UpdateCommentReactionInput;
}>;


export type UpdateCommentReactionMutation = { comment: { updateReaction: { issue?: { message?: string | null } | null, record?: { reactions?: { like: number, dislike: number, userReactType?: ReactionType | null } | null } | null } } };

export type DeleteChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteChapterMutation = { chapter: { delete: { record?: { id: string } | null, issue?: { message?: string | null } | null } } };

export type UserComicsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserComicsQuery = { user: { me?: { id: string, membersOf?: { edges?: Array<{ node: { id: string, team?: { id: string, name: string, comics?: { edges?: Array<{ node: { id: string, cover: string, title: string, alternativeTitles?: string | null, updatedAt: any } }> | null } | null } | null } }> | null } | null } | null } };

export type _TeamFragment = { id: string, avatar?: string | null, name: string } & { ' $fragmentName'?: '_TeamFragment' };

export const ComicFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"comicFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ComicFragmentFragment, unknown>;
export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}},{"kind":"Field","name":{"kind":"Name","value":"userReactType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const _FragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"_"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersReadHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<_Fragment, unknown>;
export const _TeamFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"_Team"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Team"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<_TeamFragment, unknown>;
export const SearchComicsBySearchTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchComicsBySearchText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"searchText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchComicsBySearchTextQuery, SearchComicsBySearchTextQueryVariables>;
export const ChaptersByComicIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChaptersByComicId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChapterPaginateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"usersReadHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChaptersByComicIdQuery, ChaptersByComicIdQueryVariables>;
export const ComicInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"maturityRating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"usersReadHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"0"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"0"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastReadChapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ComicInfoQuery, ComicInfoQueryVariables>;
export const ComicMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]}}]} as unknown as DocumentNode<ComicMetaQuery, ComicMetaQueryVariables>;
export const ComicFormSelectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicFormSelections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ComicFormSelectionsQuery, ComicFormSelectionsQueryVariables>;
export const MyTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyTeamsQuery, MyTeamsQueryVariables>;
export const AddTeamMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddTeamMutationMutation, AddTeamMutationMutationVariables>;
export const TeamInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"socialLinks"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamInfoQuery, TeamInfoQueryVariables>;
export const UserAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<UserAvatarQuery, UserAvatarQueryVariables>;
export const AddBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmark"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const DeleteBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmark"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;
export const RateComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RateComicMutation, RateComicMutationVariables>;
export const AddCommentToComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCommentToComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}},{"kind":"Field","name":{"kind":"Name","value":"userReactType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddCommentToComicMutation, AddCommentToComicMutationVariables>;
export const CommentsByComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentsByComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allByComic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReactType"}},{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentsByComicQuery, CommentsByComicQueryVariables>;
export const CommentRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allByCommentId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}},{"kind":"Field","name":{"kind":"Name","value":"userReactType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mentionedUserPublicId"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentRepliesQuery, CommentRepliesQueryVariables>;
export const CommentsByChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentsByChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allByChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isReply"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentsByChapterQuery, CommentsByChapterQueryVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const PinCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PinComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PinCommentMutation, PinCommentMutationVariables>;
export const UnpinCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnpinComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unpin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UnpinCommentMutation, UnpinCommentMutationVariables>;
export const AddReadHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addReadHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddReadHistoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddReadHistoryMutation, AddReadHistoryMutationVariables>;
export const GenerateInviteLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateInviteLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateTeamInviteLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"StringValue","value":"Viewer","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GenerateInviteLinkMutation, GenerateInviteLinkMutationVariables>;
export const SendInviteEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendInviteEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendInviteToEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"StringValue","value":"Viewer","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"}}]}}]}}]}}]} as unknown as DocumentNode<SendInviteEmailMutation, SendInviteEmailMutationVariables>;
export const UserSettingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSettingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<UserSettingQueryQuery, UserSettingQueryQueryVariables>;
export const ChapterImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"chapterImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChapterPaginateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChapterImagesQuery, ChapterImagesQueryVariables>;
export const LastChapterOfComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LastChapterOfComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"before"},"value":{"kind":"NullValue"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LastChapterOfComicQuery, LastChapterOfComicQueryVariables>;
export const AddChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"addChapterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddChapterMutation, AddChapterMutationVariables>;
export const ComicBaseInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicBaseInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"maturityRating"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ComicBaseInfoQuery, ComicBaseInfoQueryVariables>;
export const DeleteComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteComicMutation, DeleteComicMutationVariables>;
export const DashboardOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardOverviewQuery, DashboardOverviewQueryVariables>;
export const DashboardStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usersReadHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardStatisticsQuery, DashboardStatisticsQueryVariables>;
export const DeleteUserTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteUserTeamMutation, DeleteUserTeamMutationVariables>;
export const MeBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"lastReadChapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeBookmarksQuery, MeBookmarksQueryVariables>;
export const MeProfileInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeProfileInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"background"}},{"kind":"Field","name":{"kind":"Name","value":"socialLinks"}},{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeProfileInfoQuery, MeProfileInfoQueryVariables>;
export const UserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"background"}},{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const AddComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddComicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"add"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddComicMutation, AddComicMutationVariables>;
export const ComicsWithFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicsWithFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ComicFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ComicsWithFiltersQuery, ComicsWithFiltersQueryVariables>;
export const PopularComicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PopularComics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popular"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PopularComicsQuery, PopularComicsQueryVariables>;
export const UserComicForUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserComicForUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"maturityRating"}}]}}]}}]}}]} as unknown as DocumentNode<UserComicForUpdateQuery, UserComicForUpdateQueryVariables>;
export const UpdateComicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateComicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateComicMutation, UpdateComicMutationVariables>;
export const UpdateCommentReactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCommentReaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentReactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"}},{"kind":"Field","name":{"kind":"Name","value":"dislike"}},{"kind":"Field","name":{"kind":"Name","value":"userReactType"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCommentReactionMutation, UpdateCommentReactionMutationVariables>;
export const DeleteChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"record"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteChapterMutation, DeleteChapterMutationVariables>;
export const UserComicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userComics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"membersOf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginate"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"NullValue"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeTitles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserComicsQuery, UserComicsQueryVariables>;