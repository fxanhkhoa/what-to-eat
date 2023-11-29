/* eslint-disable */
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
  Time: { input: any; output: any; }
};

export type CreateDishInput = {
  content: Array<InputMaybe<MultiLanguageInput_D>>;
  cookingTime?: InputMaybe<Scalars['Float']['input']>;
  difficultLevel?: InputMaybe<Scalars['String']['input']>;
  ingredientCategories: Array<InputMaybe<Scalars['String']['input']>>;
  ingredients: Array<InputMaybe<IngredientsInDishInput>>;
  mealCategories: Array<InputMaybe<Scalars['String']['input']>>;
  preparationTime?: InputMaybe<Scalars['Float']['input']>;
  relatedDishes: Array<InputMaybe<Scalars['String']['input']>>;
  shortDescription: Array<InputMaybe<MultiLanguageInput_D>>;
  slug: Scalars['String']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Array<InputMaybe<MultiLanguageInput_D>>;
  videos: Array<InputMaybe<Scalars['String']['input']>>;
};

export type CreateIngredientInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbohydrate?: InputMaybe<Scalars['Int']['input']>;
  cholesterol?: InputMaybe<Scalars['Int']['input']>;
  fat?: InputMaybe<Scalars['Int']['input']>;
  ingredientCategory: Array<InputMaybe<Scalars['String']['input']>>;
  measure?: InputMaybe<Scalars['String']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  sodium?: InputMaybe<Scalars['Int']['input']>;
  title: Array<InputMaybe<MultiLanguageInput>>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateRolePermissionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permission?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Time']['input']>;
  email: Scalars['String']['input'];
  facebookID?: InputMaybe<Scalars['String']['input']>;
  githubID?: InputMaybe<Scalars['String']['input']>;
  googleID?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Dish = {
  __typename?: 'Dish';
  _id: Scalars['ID']['output'];
  content: Array<Maybe<MultiLanguage_D>>;
  cookingTime?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  difficultLevel?: Maybe<Scalars['String']['output']>;
  ingredientCategories: Array<Maybe<Scalars['String']['output']>>;
  ingredients: Array<Maybe<IngredientsInDish>>;
  mealCategories: Array<Maybe<Scalars['String']['output']>>;
  preparationTime?: Maybe<Scalars['Float']['output']>;
  relatedDishes: Array<Maybe<Scalars['String']['output']>>;
  shortDescription: Array<Maybe<MultiLanguage_D>>;
  slug: Scalars['String']['output'];
  tags: Array<Maybe<Scalars['String']['output']>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Array<Maybe<MultiLanguage_D>>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  videos: Array<Maybe<Scalars['String']['output']>>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  _id: Scalars['ID']['output'];
  calories?: Maybe<Scalars['Int']['output']>;
  carbohydrate?: Maybe<Scalars['Int']['output']>;
  cholesterol?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  fat?: Maybe<Scalars['Int']['output']>;
  ingredientCategory: Array<Maybe<Scalars['String']['output']>>;
  measure?: Maybe<Scalars['String']['output']>;
  protein?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  sodium?: Maybe<Scalars['Int']['output']>;
  title: Array<Maybe<MultiLanguage>>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type IngredientsInDish = {
  __typename?: 'IngredientsInDish';
  note?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type IngredientsInDishInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};

export type LoginInput = {
  token: Scalars['String']['input'];
};

export type MultiLanguage = {
  __typename?: 'MultiLanguage';
  data?: Maybe<Scalars['String']['output']>;
  lang: Scalars['String']['output'];
};

export type MultiLanguageInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  lang: Scalars['String']['input'];
};

export type MultiLanguageInput_D = {
  data?: InputMaybe<Scalars['String']['input']>;
  lang: Scalars['String']['input'];
};

export type MultiLanguage_D = {
  __typename?: 'MultiLanguage_D';
  data?: Maybe<Scalars['String']['output']>;
  lang: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDish: Dish;
  createIngredient: Ingredient;
  createRolePermission: RolePermission;
  createUser: User;
  loginWithGoogle?: Maybe<TokenResult>;
  removeDish: Dish;
  removeIngredient: Ingredient;
  removeRolePermission?: Maybe<RolePermission>;
  removeUser?: Maybe<User>;
  retrieveToken?: Maybe<TokenResult>;
  updateDish: Dish;
  updateIngredient: Ingredient;
  updateRolePermission: RolePermission;
  updateRoleUser: User;
  updateUser: User;
};


export type MutationCreateDishArgs = {
  createDishInput: CreateDishInput;
};


export type MutationCreateIngredientArgs = {
  createIngredientInput: CreateIngredientInput;
};


export type MutationCreateRolePermissionArgs = {
  createRoleInput: CreateRolePermissionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginWithGoogleArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveDishArgs = {
  slug: Scalars['String']['input'];
};


export type MutationRemoveIngredientArgs = {
  slug: Scalars['String']['input'];
};


export type MutationRemoveRolePermissionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRetrieveTokenArgs = {
  retrieveTokenInput: RetrieveTokenInput;
};


export type MutationUpdateDishArgs = {
  updateDishInput: UpdateDishInput;
};


export type MutationUpdateIngredientArgs = {
  updateIngredientInput: UpdateIngredientInput;
};


export type MutationUpdateRolePermissionArgs = {
  updateRoleInput: UpdateRolePermissionInput;
};


export type MutationUpdateRoleUserArgs = {
  updateRoleUserInput: UpdateRoleUserInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  allPermissions: Array<Maybe<Scalars['String']['output']>>;
  dish?: Maybe<Dish>;
  dishes: Array<Maybe<Dish>>;
  ingredient?: Maybe<Ingredient>;
  ingredients: Array<Maybe<Ingredient>>;
  rolePermission?: Maybe<RolePermission>;
  rolePermissionByName?: Maybe<RolePermission>;
  rolePermissions: Array<Maybe<RolePermission>>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryAllPermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDishArgs = {
  slug: Scalars['String']['input'];
};


export type QueryDishesArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIngredientArgs = {
  slug: Scalars['String']['input'];
};


export type QueryIngredientsArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRolePermissionArgs = {
  id: Scalars['String']['input'];
};


export type QueryRolePermissionByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryRolePermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type RetrieveTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export enum Role {
  CreateDish = 'CREATE_DISH',
  CreateIngredient = 'CREATE_INGREDIENT',
  CreateRole = 'CREATE_ROLE',
  CreateUser = 'CREATE_USER',
  DeleteDish = 'DELETE_DISH',
  DeleteIngredient = 'DELETE_INGREDIENT',
  DeleteRole = 'DELETE_ROLE',
  DeleteUser = 'DELETE_USER',
  FindDish = 'FIND_DISH',
  FindDishes = 'FIND_DISHES',
  FindIngredient = 'FIND_INGREDIENT',
  FindIngredients = 'FIND_INGREDIENTS',
  FindRole = 'FIND_ROLE',
  FindRoles = 'FIND_ROLES',
  FindUser = 'FIND_USER',
  FindUsers = 'FIND_USERS',
  UpdateDish = 'UPDATE_DISH',
  UpdateIngredient = 'UPDATE_INGREDIENT',
  UpdateRole = 'UPDATE_ROLE',
  UpdateUser = 'UPDATE_USER'
}

export type RolePermission = {
  __typename?: 'RolePermission';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permission?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type TokenResult = {
  __typename?: 'TokenResult';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UpdateDishInput = {
  content: Array<InputMaybe<MultiLanguageInput_D>>;
  cookingTime?: InputMaybe<Scalars['Float']['input']>;
  difficultLevel?: InputMaybe<Scalars['String']['input']>;
  ingredientCategories: Array<InputMaybe<Scalars['String']['input']>>;
  ingredients: Array<InputMaybe<IngredientsInDishInput>>;
  mealCategories: Array<InputMaybe<Scalars['String']['input']>>;
  preparationTime?: InputMaybe<Scalars['Float']['input']>;
  relatedDishes: Array<InputMaybe<Scalars['String']['input']>>;
  shortDescription: Array<InputMaybe<MultiLanguageInput_D>>;
  slug: Scalars['String']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Array<InputMaybe<MultiLanguageInput_D>>;
  videos: Array<InputMaybe<Scalars['String']['input']>>;
};

export type UpdateIngredientInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbohydrate?: InputMaybe<Scalars['Int']['input']>;
  cholesterol?: InputMaybe<Scalars['Int']['input']>;
  fat?: InputMaybe<Scalars['Int']['input']>;
  ingredientCategory: Array<InputMaybe<Scalars['String']['input']>>;
  measure?: InputMaybe<Scalars['String']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  sodium?: InputMaybe<Scalars['Int']['input']>;
  title: Array<InputMaybe<MultiLanguageInput>>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRolePermissionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  permission?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdateRoleUserInput = {
  id: Scalars['String']['input'];
  roleName: Scalars['String']['input'];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Time']['input']>;
  email: Scalars['String']['input'];
  facebookID?: InputMaybe<Scalars['String']['input']>;
  githubID?: InputMaybe<Scalars['String']['input']>;
  googleID?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['Time']['output']>;
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  facebookID?: Maybe<Scalars['String']['output']>;
  githubID?: Maybe<Scalars['String']['output']>;
  googleID?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  roleName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};
