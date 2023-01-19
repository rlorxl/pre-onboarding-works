import { Comment } from '../types/comment-types';

const pageListArray = (data: Comment[]) => {
  const LIMIT = 4;
  const pageCount = Math.ceil(data.length / LIMIT);
  const newPageArray = Array(pageCount)
    .fill(0)
    .map((_, idx) => idx + 1);
  return newPageArray;
};

export default pageListArray;
