import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signAPI } from '../api/api';

const useAuth = () => {
  const navigate = useNavigate();

  const auth = useCallback(
    async (request, message) => {
      const { name, formData: enteredFormData, direction } = request;

      const API = name === 'signIn' ? signAPI.goSignIn : signAPI.goSignUp;

      try {
        const { data } = await API(enteredFormData);

        if (!data) {
          alert('error: 로그인 요청 실패');
          return;
        }

        name === 'signIn' && localStorage.setItem('token', data.access_token);

        message && alert(message);

        navigate(direction);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    [navigate]
  );

  return {
    auth,
  };
};

export default useAuth;
