import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { AxiosInstance } from 'axios';
import type { State } from '@src/entities/state';
import type { Comment, NewComment } from '@src/entities/comments';

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

/**
 * Отправка отзыва
 */
export const postComment = createAsyncThunk<
  Comment,
  NewComment,
  {
    state: State;
    extra: AxiosInstance;
  }
>(
  'comment/postComment',
  async ({ offerID, rating, comment }, { extra: api }) => {
    const { data } = await api.post<Comment>(
      `${APIRoute.Comments}/${offerID}`,
      {
        rating,
        comment,
      }
    );

    return data;
  }
);
