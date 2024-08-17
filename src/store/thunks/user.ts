import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { AuthData, AuthError } from '@src/entities/auth';
import type { UserData } from '@src/entities/user';
import axios, { type AxiosInstance } from 'axios';
import type { State } from '@src/entities/state';

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
