import styled from 'styled-components';

const Button = props => {
  return <StFormBtn {...props}>{props.children}</StFormBtn>;
};

const StFormBtn = styled.button`
  width: 90%;
  height: 4rem;
  font-size: 2rem;
  background-color: ${({ disabled }) => {
    if (!disabled) {
      return '#bad7e9';
    } else {
      return '#e9e9ed';
    }
  }};
  border: 0.2rem solid #2b3467;
  border-radius: 2rem;
`;

export default Button;
