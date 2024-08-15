import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import { AxiosInstance } from 'axios';
import { State } from '@src/entities/state';
import { Comment } from '@src/entities/comments';

/**
 * Загрузка отзывов
 */
export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('comment/fetchComments', async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
  return data;
});
