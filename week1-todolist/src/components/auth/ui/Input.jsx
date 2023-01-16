import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Input = forwardRef((props, ref) => {
  return <StFormInput {...props} ref={ref} />;
});

const StFormInput = styled.input`
  width: 100%;
  height: 5rem;
`;

export default Input;
