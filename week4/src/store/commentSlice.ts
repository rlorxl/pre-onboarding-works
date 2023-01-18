import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ApiRequest from '../api/api';
import { Comment, CommentData } from '../types/comment-types';
import { RootState } from './configStore';

export const fetchPage = createAsyncThunk(
  'comment/fetchPage',
  async (pageNum: number, { rejectWithValue }) => {
    try {
      const response = await ApiRequest.getPage(pageNum);
      return { data: response.data, pageNum };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchComment = createAsyncThunk(
  'comment/fetchComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      const response = await ApiRequest.getById(commentId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createComment = createAsyncThunk(
  'comment/create',
  async (newComment: Comment, { rejectWithValue }) => {
    try {
      const response = await ApiRequest.create(newComment);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comment/update',
  async (
    { commentId, newComment }: { commentId: number; newComment: Comment },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiRequest.update(commentId, newComment);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await ApiRequest.delete(commentId);
      return commentId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialCommentState: CommentData = {
  isEditing: false,
  currentPage: 1,
  comment: {
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  },
  commentList: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPage.fulfilled,
      (state, action: PayloadAction<{ data: Comment[]; pageNum: number }>) => {
        state.commentList = action.payload.data;
        state.currentPage = action.payload.pageNum;
      }
    );
    builder.addCase(
      fetchComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comment = action.payload;
        state.isEditing = true;
      }
    );
    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.commentList.push(action.payload);
      }
    );
    builder.addCase(updateComment.fulfilled, (state) => {
      state.comment = {
        profile_url: '',
        author: '',
        content: '',
        createdAt: '',
      };
      state.isEditing = false;
    });
  },
});

export const editState = (state: RootState) => state.comment.isEditing;
export const page = (state: RootState) => state.comment.currentPage;
export const comment = (state: RootState) => state.comment.comment;
export const list = (state: RootState) => state.comment.commentList;

export const commentReducer = commentSlice.reducer;
