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

type Notification = {
  status: string;
  message: string;
};

type CommentData = {
  notifications: Notification;
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

// export const updateComment = createAsyncThunk(
//   'comment/update',
//   async (
//     { commentId, newComment }: { commentId: number; newComment: Comment },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await ApiRequest.update(commentId, newComment);
//       console.log(response);
//       // return response.data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

const initialCommentState: CommentData = {
  notifications: {
    status: '',
    message: '',
  },
  commentList: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    // setComments: (state, action) => {
    //   state.commentList = action.payload;
    // },
    // addComment: (state, action) => {
    //   state.commentList.push(action.payload);
    // },
    // deleteComment: (state, action) => {
    //   state.commentList = state.commentList.filter(
    //     (comment) => comment.id !== action.payload
    //   );
    // },
    // setNotifications: (state, action) => {
    //   state.notifications = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.commentList = action.payload;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.commentList.push(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});

export const list = (state: RootState) => state.comment.commentList;
export const notification = (state: RootState) => state.comment.notifications;

export const commentReducer = commentSlice.reducer;
