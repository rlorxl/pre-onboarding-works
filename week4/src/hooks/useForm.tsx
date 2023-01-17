import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { comment, editState } from '../store/commentSlice';
import { useAppSelector } from '../store/configStore';

type FormData = {
  id?: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
};

type FormDataConfig = {
  name: string;
  value: string;
};

const useForm = () => {
  const isEditing = useAppSelector(editState);
  const commentData = useAppSelector(comment);

  const initialFormData = isEditing
    ? commentData
    : {
        profile_url: '',
        author: '',
        content: '',
        createdAt: '',
      };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const setForm = useCallback((formDataConfig: FormDataConfig): void => {
    const { name, value } = formDataConfig;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const setSelectedData = useCallback(
    (formDataConfig: AxiosResponse<FormData, any>): void => {
      const { data } = formDataConfig;
      setFormData(data);
    },
    []
  );

  const resetForm = (): void => {
    setFormData({
      profile_url: '',
      author: '',
      content: '',
      createdAt: '',
    });
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
