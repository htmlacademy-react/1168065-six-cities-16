import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { APIRoute, AuthStatus } from '@src/const';
import type { AxiosInstance } from 'axios';
import type { AuthData, ValidationError } from '@src/entities/auth';
import type { UserData } from '@src/entities/user';
import { removeToken, setToken } from '@src/services/token';

const INITIAL_USER = {} as UserData;
const INITIAL_VALIDATION = [] as ValidationError[];

type UserState = {
  authStatus: AuthStatus;
  user: UserData;
  validation: ValidationError[];
};

const initialState = {
  authStatus: AuthStatus.Unknown,
  user: INITIAL_USER,
  validation: INITIAL_VALIDATION,
} as UserState;

export const checkAuth = createAsyncThunk<
  UserData,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  return data;
});

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
});

/**
 * Слайс для работы с предложениями
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.authStatus = AuthStatus.Auth;
          state.user = action.payload;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.authStatus = AuthStatus.Auth;
          state.user = action.payload;
          setToken(action.payload.token ?? '');
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = INITIAL_USER;
        removeToken();
      });
  },
});

export const getAuthStatus = (state: State): AuthStatus =>
  state.user.authStatus;
export const getUserData = (state: State): UserData => state.user.user;
