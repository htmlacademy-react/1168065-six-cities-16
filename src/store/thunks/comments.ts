import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { ThunksAPI } from '@src/entities/state';
import type { Comment, NewComment } from '@src/entities/comments';

/**
 * Загрузка отзывов
 */
export const fetchComments = createAsyncThunk<Comment[], string, ThunksAPI>(
  'comment/fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

/**
 * Отправка отзыва
 */
export const postComment = createAsyncThunk<Comment, NewComment, ThunksAPI>(
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
