import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { APIRoute, AuthStatus } from '@src/const';
import type { AxiosError, AxiosInstance } from 'axios';
import type { AuthData, AuthError, ValidationError } from '@src/entities/auth';
import type { UserData } from '@src/entities/user';
import { removeToken, setToken } from '@src/services/token';
import axios from 'axios';

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

/**
 * Проверка статуса авторизации пользователя
 */
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

/**
 * Авторизовать пользователя
 */
export const loginUser = createAsyncThunk<
  UserData,
  AuthData,
  {
    state: State;
    extra: AxiosInstance;
    rejectValue: AuthError;
  }
>(
  'user/login',
  async ({ email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });

      return data;
    } catch (error) {
      const serverError = axios.isAxiosError<AuthError>(error);

      if (serverError && error.response) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

/**
 * Разлогинить пользователя
 */
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
 * Слайс для работы с авторизацией
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
          state.validation = INITIAL_VALIDATION;
          setToken(action.payload.token ?? '');
        }
      )
      // No overload matches this call.
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<AuthError>) => {
          state.authStatus = AuthStatus.NoAuth;
          state.validation = action.payload.details;
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = INITIAL_USER;
        removeToken();
      });
  },
});

/**
 * Статус авторизации
 */
export const getAuthStatus = (state: State): AuthStatus =>
  state.user.authStatus;

/**
 * Данные пользователя
 */
export const getUserData = (state: State): UserData => state.user.user;

/**
 * Валидация от сервера
 */
export const getValidation = (state: State): ValidationError[] =>
  state.user.validation;
