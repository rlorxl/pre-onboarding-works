import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { comment, editState } from '../store/commentSlice';
import { useAppSelector } from '../store/configStore';
import { Comment } from '../types/comment-types';

type FormDataConfig = {
  name: string;
  value: string;
};

const useForm = () => {
  const isEditing = useAppSelector(editState);
  const commentData = useAppSelector(comment);

  const initialValues = {
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  };

  const initialFormData = isEditing ? commentData : initialValues;

  const [formData, setFormData] = useState<Comment>(initialFormData);

  const setForm = useCallback((formDataConfig: FormDataConfig): void => {
    const { name, value } = formDataConfig;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const setSelectedData = useCallback(
    (formDataConfig: AxiosResponse<Comment, any>): void => {
      const { data } = formDataConfig;
      setFormData(data);
    },
    []
  );

  const resetForm = (): void => {
    setFormData(initialValues);
  };

  useEffect(() => {
    if (isEditing) setFormData(commentData);
  }, [isEditing, commentData]);

  return {
    formData,
    setForm,
    setSelectedData,
    resetForm,
  };
};

export default useForm;
