import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiRequest from '../api/api';
import { RootState } from './configStore';

type Comment = {
  id?: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
};

type CommentData = {
  isEditing: boolean;
  comment: Comment;
  commentList: Comment[];
};

export const fetchAllComments = createAsyncThunk(
  'comment/fetchAll',
  async (pageNum: number, { rejectWithValue }) => {
    try {
      const response = await ApiRequest.getPage(pageNum);
      return response.data;
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
      const response = await ApiRequest.delete(commentId);
      return commentId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialCommentState: CommentData = {
  isEditing: false,
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
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.commentList = action.payload;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.isEditing = !state.isEditing;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.commentList.push(action.payload);
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isEditing = !state.isEditing;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});

export const editState = (state: RootState) => state.comment.isEditing;
export const comment = (state: RootState) => state.comment.comment;
export const list = (state: RootState) => state.comment.commentList;

export const commentReducer = commentSlice.reducer;
