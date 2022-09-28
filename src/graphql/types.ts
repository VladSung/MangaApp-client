import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphQLObjectId: any;
  Upload: any;
};

export type AddMangaInput = {
  ageRestrictions?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  genres: Array<GenresInput>;
  poster?: InputMaybe<Scalars['Upload']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type File = {
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type Genres = {
  __typename?: 'Genres';
  id?: Maybe<Scalars['GraphQLObjectId']>;
  title?: Maybe<Scalars['String']>;
};

export type GenresInput = {
  id?: InputMaybe<Scalars['GraphQLObjectId']>;
  title?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Manga = {
  __typename?: 'Manga';
  ageRestrictions?: Maybe<Scalars['String']>;
  chapters?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dir?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Genres>>>;
  id?: Maybe<Scalars['GraphQLObjectId']>;
  poster?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['String']>;
  publisherId?: Maybe<Scalars['GraphQLObjectId']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  translators?: Maybe<Array<Maybe<Scalars['GraphQLObjectId']>>>;
};

export type MangaNames = {
  __typename?: 'MangaNames';
  en?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  ru?: Maybe<Scalars['String']>;
};

export type MangaNamesInput = {
  en?: InputMaybe<Scalars['String']>;
  other?: InputMaybe<Scalars['String']>;
  ru?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addManga?: Maybe<Manga>;
  addMangaChapters?: Maybe<Manga>;
  deleteManga?: Maybe<Scalars['Boolean']>;
  loginUser?: Maybe<User>;
  logout?: Maybe<Scalars['String']>;
  registerUser?: Maybe<User>;
  updateManga?: Maybe<Manga>;
  updateRole?: Maybe<User>;
};


export type MutationAddMangaArgs = {
  input: AddMangaInput;
};


export type MutationAddMangaChaptersArgs = {
  input: AddMangaChaptersInput;
};


export type MutationDeleteMangaArgs = {
  id: Scalars['GraphQLObjectId'];
};


export type MutationLoginUserArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterUserArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateMangaArgs = {
  id: Scalars['GraphQLObjectId'];
  input?: InputMaybe<AddMangaInput>;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<User>;
  getUser?: Maybe<User>;
  manga?: Maybe<Manga>;
  mangaByTitle?: Maybe<Manga>;
  mangas?: Maybe<Array<Maybe<Manga>>>;
};


export type QueryGetUserArgs = {
  id: Scalars['GraphQLObjectId'];
};


export type QueryMangaArgs = {
  id: Scalars['GraphQLObjectId'];
};


export type QueryMangaByTitleArgs = {
  title: Scalars['String'];
};


export type QueryMangasArgs = {
  publisherId?: InputMaybe<Scalars['GraphQLObjectId']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Author = 'AUTHOR',
  Creator = 'CREATOR',
  Staff = 'STAFF',
  User = 'USER'
}

export type UpdateRoleInput = {
  id: Scalars['GraphQLObjectId'];
  remove?: InputMaybe<Scalars['Boolean']>;
  role: Role;
};

export type User = {
  __typename?: 'User';
  blockedGenres?: Maybe<Array<Scalars['Int']>>;
  email: Scalars['String'];
  id: Scalars['GraphQLObjectId'];
  photoURL: Scalars['String'];
  roles?: Maybe<Array<Maybe<Role>>>;
  username: Scalars['String'];
  wallet?: Maybe<UserWallet>;
};

export type UserWallet = {
  __typename?: 'UserWallet';
  money?: Maybe<Scalars['Int']>;
  tokens?: Maybe<Scalars['Int']>;
};

export type AddMangaChaptersInput = {
  chapters?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['GraphQLObjectId'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddMangaInput: AddMangaInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  File: File;
  Genres: ResolverTypeWrapper<Genres>;
  GenresInput: GenresInput;
  GraphQLObjectId: ResolverTypeWrapper<Scalars['GraphQLObjectId']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginInput: LoginInput;
  Manga: ResolverTypeWrapper<Manga>;
  MangaNames: ResolverTypeWrapper<MangaNames>;
  MangaNamesInput: MangaNamesInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateRoleInput: UpdateRoleInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserWallet: ResolverTypeWrapper<UserWallet>;
  addMangaChaptersInput: AddMangaChaptersInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddMangaInput: AddMangaInput;
  Boolean: Scalars['Boolean'];
  File: File;
  Genres: Genres;
  GenresInput: GenresInput;
  GraphQLObjectId: Scalars['GraphQLObjectId'];
  Int: Scalars['Int'];
  LoginInput: LoginInput;
  Manga: Manga;
  MangaNames: MangaNames;
  MangaNamesInput: MangaNamesInput;
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars['String'];
  UpdateRoleInput: UpdateRoleInput;
  Upload: Scalars['Upload'];
  User: User;
  UserWallet: UserWallet;
  addMangaChaptersInput: AddMangaChaptersInput;
};

export type AuthDirectiveArgs = {
  requires: Role;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GenresResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genres'] = ResolversParentTypes['Genres']> = {
  id?: Resolver<Maybe<ResolversTypes['GraphQLObjectId']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GraphQlObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GraphQLObjectId'], any> {
  name: 'GraphQLObjectId';
}

export type MangaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Manga'] = ResolversParentTypes['Manga']> = {
  ageRestrictions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chapters?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['Genres']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['GraphQLObjectId']>, ParentType, ContextType>;
  poster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisherId?: Resolver<Maybe<ResolversTypes['GraphQLObjectId']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translators?: Resolver<Maybe<Array<Maybe<ResolversTypes['GraphQLObjectId']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MangaNamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MangaNames'] = ResolversParentTypes['MangaNames']> = {
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  other?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ru?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addManga?: Resolver<Maybe<ResolversTypes['Manga']>, ParentType, ContextType, RequireFields<MutationAddMangaArgs, 'input'>>;
  addMangaChapters?: Resolver<Maybe<ResolversTypes['Manga']>, ParentType, ContextType, RequireFields<MutationAddMangaChaptersArgs, 'input'>>;
  deleteManga?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMangaArgs, 'id'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'loginInput'>>;
  logout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registerUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'registerInput'>>;
  updateManga?: Resolver<Maybe<ResolversTypes['Manga']>, ParentType, ContextType, RequireFields<MutationUpdateMangaArgs, 'id'>>;
  updateRole?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'updateRoleInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auth?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  manga?: Resolver<Maybe<ResolversTypes['Manga']>, ParentType, ContextType, RequireFields<QueryMangaArgs, 'id'>>;
  mangaByTitle?: Resolver<Maybe<ResolversTypes['Manga']>, ParentType, ContextType, RequireFields<QueryMangaByTitleArgs, 'title'>>;
  mangas?: Resolver<Maybe<Array<Maybe<ResolversTypes['Manga']>>>, ParentType, ContextType, Partial<QueryMangasArgs>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  blockedGenres?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GraphQLObjectId'], ParentType, ContextType>;
  photoURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['UserWallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWallet'] = ResolversParentTypes['UserWallet']> = {
  money?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Genres?: GenresResolvers<ContextType>;
  GraphQLObjectId?: GraphQLScalarType;
  Manga?: MangaResolvers<ContextType>;
  MangaNames?: MangaNamesResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserWallet?: UserWalletResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
