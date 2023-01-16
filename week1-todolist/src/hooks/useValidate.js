import { useCallback, useState } from 'react';

const useValidate = () => {
  const [inputValidation, setInputValidation] = useState({
    idValid: false,
    pwValid: false,
  });

  const validate = useCallback(input => {
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const pwIsvalid = input.value?.length >= 8;

    if (input.id === 'register-id-input') {
      if (idRegex.test(input.value)) {
        setInputValidation(prev => ({ ...prev, idValid: true }));
      } else {
        setInputValidation(prev => ({ ...prev, idValid: false }));
      }
    } else {
      if (pwIsvalid) {
        setInputValidation(prev => ({ ...prev, pwValid: true }));
      } else {
        setInputValidation(prev => ({ ...prev, pwValid: false }));
      }
    }
  }, []);

  return {
    validate,
    inputValidation,
  };
};

export default useValidate;
