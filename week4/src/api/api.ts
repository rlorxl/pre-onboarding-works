import axios from 'axios';
import { Comment } from '../types/comment-types';

const client = axios.create({
  baseURL: 'http://localhost:4000',
});

const ApiRequest = {
  get: () => client.get('/comments'),
  getById: (commentId: number) => client.get(`/comments/${commentId}`),
  create: (data: any) => client.post('/comments', data),
  update: (commentId: number, data: Comment) =>
    client.put(`/comments/${commentId}`, data),
  delete: (commentId: number) => client.delete(`/comments/${commentId}`),
  getPage: (page: number) =>
    client.get(`/comments?_page=${page}&_limit=4&_order=desc&_sort=id`),
};

export default ApiRequest;
