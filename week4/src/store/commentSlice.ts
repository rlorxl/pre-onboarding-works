import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiRequest from '../api/api';
import pageListArray from '../lib/page-list';
import { Comment, CommentData } from '../types/comment-types';
import { RootState } from './configStore';

type UpdateConfig = {
  commentId: number;
  newComment: Comment;
};

type FetchConfig = {
  type: string;
  payload?: any;
};

export const fetchCommentData = (config: FetchConfig) => {
  const { type, payload } = config;
  return async (dispatch: any) => {
    let res;
    try {
      switch (type) {
        case 'GETALL': {
          res = await ApiRequest.get();
          dispatch(setPagenationList(res.data));
          return;
        }
        case 'GETPAGE': {
          res = await ApiRequest.getPage(payload);
          dispatch(setCommentList({ data: res.data, pageNum: payload }));
          return;
        }
        case 'GETONE': {
          res = await ApiRequest.getById(payload);
          dispatch(setComment(res.data));
          return;
        }
        case 'CREATE': {
          res = await ApiRequest.create(payload);
          dispatch(addComment(res.data));
          return;
        }
        case 'UPDATE': {
          const { commentId, newComment } = payload;
          res = await ApiRequest.update(commentId, newComment);
          dispatch(updateComment(res.data));
          return;
        }
        case 'DELETE': {
          res = await ApiRequest.delete(payload);
          dispatch(deleteComment(payload));
          return;
        }
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialCommentState: CommentData = {
  isEditing: false,
  comment: {
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  },
  commentList: [],
  pagenationList: [],
  currentPage: 1,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    setPagenationList: (state, action) => {
      state.pagenationList = pageListArray(action.payload);
    },
    setCommentList: (state, action) => {
      const { data, pageNum } = action.payload;
      state.commentList = data;
      state.currentPage = pageNum;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
      state.isEditing = true;
    },
    addComment: (state, action) => {
      state.commentList.push(action.payload);
    },
    updateComment: (state) => {
      state.comment = {
        profile_url: '',
        author: '',
        content: '',
        createdAt: '',
      };
      state.isEditing = false;
    },
    deleteComment: (state, action) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const {
  setPagenationList,
  setCommentList,
  setComment,
  addComment,
  updateComment,
  deleteComment,
} = commentSlice.actions;

export const editState = (state: RootState) => state.comment.isEditing;
export const page = (state: RootState) => state.comment.currentPage;
export const comment = (state: RootState) => state.comment.comment;
export const list = (state: RootState) => state.comment.commentList;
export const pagenationList = (state: RootState) =>
  state.comment.pagenationList;

export const commentReducer = commentSlice.reducer;
