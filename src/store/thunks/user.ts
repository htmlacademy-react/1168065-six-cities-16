import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { AuthData, AuthError } from '@src/entities/auth';
import type { UserData } from '@src/entities/user';
import { isAxiosError } from 'axios';
import type { ThunksAPI } from '@src/entities/state';
import { fetchFavorites } from './favorites';

/**
 * Проверка статуса авторизации пользователя
 */
export const checkAuth = createAsyncThunk<UserData, undefined, ThunksAPI>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    dispatch(fetchFavorites());
    return data;
  }
);

/**
 * Авторизовать пользователя
 */
export const loginUser = createAsyncThunk<UserData, AuthData, ThunksAPI>(
  'user/login',
  async ({ email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });

      return data;
    } catch (error) {
      const serverError = isAxiosError<AuthError>(error);

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
export const logoutUser = createAsyncThunk<void, undefined, ThunksAPI>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);
