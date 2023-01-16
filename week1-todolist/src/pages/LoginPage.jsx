import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Input from '../components/auth/ui/Input';
import Button from '../components/auth/ui/Button';
import FormContainer from '../components/auth/ui/FormContainer';

function LoginPage() {
  const navigate = useNavigate();

  const idInputRef = useRef();
  const pwInputRef = useRef();

  const { auth } = useAuth();

  const login = e => {
    e.preventDefault();

    const enteredId = idInputRef.current?.value;
    const enteredPw = pwInputRef.current?.value;

    auth({
      name: 'signIn',
      formData: { email: enteredId, password: enteredPw },
      direction: '/todo',
    });
  };

  return (
    <FormContainer onSubmit={login}>
      <div className="input-wrapper">
        <label htmlFor="user-id-input">id</label>
        <Input id="user-id-input" name="user-id-input" ref={idInputRef} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="user-pw-input">pw</label>
        <Input id="user-pw-input" name="user-pw-input" ref={pwInputRef} type="password" />
      </div>
      <Button>로그인</Button>
      <Button onClick={() => navigate('/signup')}>회원가입</Button>
    </FormContainer>
  );
}

export default LoginPage;
