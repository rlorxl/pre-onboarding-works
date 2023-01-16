import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const API = {
  getAll: () => instance.get(`/issue`),
  createIssue: (data) => instance.post(`/issue`, data),
  updateIssue: (id, data) => instance.patch(`/issue/${id}`, data),
  deleteIssue: (id) => instance.delete(`/issue/${id}`),
};
