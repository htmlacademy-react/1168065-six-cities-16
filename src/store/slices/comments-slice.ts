import { createSlice } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { Comment } from '@src/entities/comments';
import { fetchComments } from '../thunks/comments';

type CommentsState = {
  comments: Comment[];
};

const initialState = {
  comments: [],
} as CommentsState;

/**
 * Слайс для работы с предложениями
 */
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

/**
 * Отзывы
 */
export const getComments = (state: State): Comment[] => state.comments.comments;
