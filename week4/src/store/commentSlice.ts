import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import ApiRequest from '../api/api';
import pageListArray from '../lib/page-list';
import { Comment, CommentData } from '../types/comment-types';
import { RootState } from './configStore';

type UpdateConfig = { commentId: number; newComment: Comment };
type Payload = number | Comment | UpdateConfig | undefined;

const GET_ALL = 'GETALL';
const GET_PAGE = 'GETPAGE';
const GET_ONE = 'GETONE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export const fetchCommentData = (type: string, payload?: Payload) => {
  return async (dispatch: Dispatch) => {
    try {
      switch (type) {
        case GET_ALL: {
          const res = await ApiRequest.get();
          return dispatch(setPagenationList(res.data));
        }
        case GET_PAGE: {
          const res = await ApiRequest.getPage(payload as number);
          return dispatch(setCommentList({ data: res.data, pageNum: payload }));
        }
        case GET_ONE: {
          const res = await ApiRequest.getById(payload as number);
          return dispatch(setComment(res.data));
        }
        case CREATE: {
          const res = await ApiRequest.create(payload as Comment);
          return dispatch(addComment(res.data));
        }
        case UPDATE: {
          const { commentId, newComment } = payload as UpdateConfig;
          const res = await ApiRequest.update(commentId, newComment);
          return dispatch(addComment(res.data));
        }
        case DELETE: {
          ApiRequest.delete(payload as number);
          return dispatch(deleteComment(payload as number));
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
    setPagenationList: (state, action: PayloadAction<Comment[]>) => {
      state.pagenationList = pageListArray(action.payload);
    },
    setCommentList: (
      state,
      action: PayloadAction<{ data: Comment[]; pageNum: Payload }>
    ) => {
      const { data, pageNum } = action.payload;
      if (typeof pageNum === 'number') {
        state.commentList = data;
        state.currentPage = pageNum;
      }
    },
    setComment: (state, action: PayloadAction<Comment>) => {
      state.comment = action.payload;
      state.isEditing = true;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
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
    deleteComment: (state, action: PayloadAction<number>) => {
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
