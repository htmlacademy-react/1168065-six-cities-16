import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { APIRoute, AuthStatus } from '@src/const';
import { AxiosInstance } from 'axios';
import { AuthData } from '@src/entities/auth';
import { UserData } from '@src/entities/user';
import { removeToken, setToken } from '@src/services/token';

type UserState = {
  authStatus: AuthStatus;
};

const initialState = {
  authStatus: AuthStatus.Unknown,
} as UserState;

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginUser = createAsyncThunk<
  void,
  AuthData,
  {
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(APIRoute.Login, { email, password });
  setToken(token);
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
  removeToken();
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
      .addCase(checkAuth.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});

export const getAuthStatus = (state: State): AuthStatus =>
  state.user.authStatus;
