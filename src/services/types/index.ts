import apiStateSlice, { closePrivateFeed, closePublicFeed, discardPrivateFeed, discardPublicFeed, openPrivateFeed, openPublicFeed, requestPrivateFeed, requestPublicFeed, setApiError } from "../store/api-state-slice";
import { feedDataSlice, privateFeedStart, privateFeedStop, publicFeedStart, publicFeedStop, setPrivateFeedData, setPublicFeedData } from "../store/feed-slice";

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string;
};

export type Order = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

// allIngredients типизирован как словарь, имеющий ключ string и значение Ingredient
export type DictionaryIngredients = Record<string, Ingredient> | undefined;

export type DictionaryStrStr = Record<string, string>;
export type DictionaryStrBool = Record<string, boolean>;

export type FetchParameters<T> = {
  endpoint: string;
  data?: T;
  method?: string;
}

export type FetchOptions = {
  headers: DictionaryStrStr;
  method: string;
  body?: string;
}

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type ErrorResponse = {
  message: string;
  statusCode: number;
  [key: string]: unknown;
};

// export type RegisterNewUserRequest = {
//   email: string;
//   password: string;
//   name: string; 
// } | void;

type UserData = {
  email: string;
  name: string;
}

export type RegisterNewUserResponse = {
  success: boolean;
  user: UserData;
  accessToken: string;
  refreshToken: string;
};

export type GetIngredientsResponse = {
  success: boolean;
  data: Ingredient[];
};

export type GetOrderInfoResponse = {
  success: boolean;
  orders: Order[];
};

// export type LoginUserRequest = {
//   email: string;
//   password: string;
// } | void;

export type LoginUserResponse = RegisterNewUserResponse;

export type LogoutRequest = {
  token: string | null;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

// export type ForgotPasswordRequest = {
//   email: string;
// } | void;

export type ForgotPasswordResponse = LogoutResponse;

// export type ResetPasswordRequest = {
//   password: string;
//   token: string;
// } | void;

export type ResetPasswordResponse = LogoutResponse;

// export type GetProfileInfoRequest = {
//   authorization: string;
// };

export type GetProfileInfoResponse = {
  success: boolean;
  user: UserData;
};

// export type UpdateProfileInfoRequest = {
//   authorization: string;
//   user: UserData;
// } | void;

export type AddNewOrderRequest = {
  ingredients: string[];
};

export type AddNewOrderResponse = {
  name: string;
  order: {
      number: number
  };
  success: boolean;
};

export type UpdateProfileInfoResponse = GetProfileInfoResponse;

type FeedWSActionsPublic = {
  wsConnect: typeof publicFeedStart;
      wsDisconnect: typeof publicFeedStop;
      onOpen: typeof openPublicFeed;
      onClose: typeof closePublicFeed;
      onError: typeof setApiError;
      onMessage: typeof setPublicFeedData;
      wsOpen: typeof requestPublicFeed;
      wsClose: typeof discardPublicFeed;
};

type FeedWSActionsPrivate = {
  wsConnect: typeof privateFeedStart;
      wsDisconnect: typeof privateFeedStop;
      onOpen: typeof openPrivateFeed;
      onClose: typeof closePrivateFeed;
      onError: typeof setApiError;
      onMessage: typeof setPrivateFeedData;
      wsOpen: typeof requestPrivateFeed;
      wsClose: typeof discardPrivateFeed;
};

export type FeedWSActions = FeedWSActionsPublic | FeedWSActionsPrivate;