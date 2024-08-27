import { createSlice } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import type { Comment } from '@src/entities/comments';
import { fetchComments, postComment } from '../thunks/comments';
import type { Status } from '@src/entities/status';

type CommentsState = {
  comments: Comment[];
  isSubmittingComment: boolean;
};

const initialState = {
  comments: [],
  isSubmittingComment: false,
} as CommentsState;

/**
 * Слайс для работы с предложениями
 */
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.isSubmittingComment = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isSubmittingComment = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isSubmittingComment = false;
      });
  },
});

/**
 * Отзывы
 */
export const getComments = (state: State): Comment[] => state.comments.comments;

/**
 * Статус отправки отзыва
 */
export const getCommentSubmitStatus = (state: State): Status =>
  state.comments.isSubmittingComment;
