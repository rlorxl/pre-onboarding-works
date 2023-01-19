export type Comment = {
  id?: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
};

export type CommentData = {
  isEditing: boolean;
  currentPage: number;
  comment: Comment;
  commentList: Comment[];
  pagenationList?: number[];
};
