import React, { useRef } from 'react';
import useValidate from '../hooks/useValidate';
import useAuth from '../hooks/useAuth';

import Input from '../components/auth/ui/Input';
import Button from '../components/auth/ui/Button';
import FormContainer from '../components/auth/ui/FormContainer';

function SignupPage() {
  const idInputRef = useRef();
  const pwInputRef = useRef();

  const { validate, inputValidation } = useValidate();
  const { auth } = useAuth();

  const signinInputHandler = ({ target }) => {
    validate(target);
  };

  const createAccount = e => {
    e.preventDefault();

    const enteredId = idInputRef.current?.value;
    const enteredPw = pwInputRef.current?.value;

    auth(
      {
        name: 'signUp',
        formData: { email: enteredId, password: enteredPw },
        direction: '/',
      },
      '회원가입이 완료되었습니다!'
    );
  };

  const isDisabled = !(inputValidation.idValid && inputValidation.pwValid);

  return (
    <FormContainer onSubmit={createAccount}>
      <div className="input-wrapper">
        <label htmlFor="register-id-input">id(email)</label>
        <Input
          id="register-id-input"
          ref={idInputRef}
          placeholder="이메일 주소(xxxx@xxx.xxx)"
          onChange={signinInputHandler}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="register-pw-input">pw</label>
        <Input
          id="register-pw-input"
          ref={pwInputRef}
          placeholder="8자리 이상"
          type="password"
          onChange={signinInputHandler}
        />
      </div>
      <Button disabled={isDisabled}>회원가입</Button>
    </FormContainer>
  );
}

export default SignupPage;
