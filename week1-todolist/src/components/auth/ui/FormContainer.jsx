import styled from 'styled-components';

const FormContainer = props => {
  return <StFormContainer {...props}>{props.children}</StFormContainer>;
};

const StFormContainer = styled.form`
  width: 60rem;
  height: 50rem;
  padding: 7rem 0;
  margin: 6rem auto;
  border: 0.3rem solid #2b3467;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .input-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    label {
      font-size: 2rem;
      margin-bottom: 0.3rem;
    }
    input {
      font-size: 2.3rem;
    }
  }
`;

export default FormContainer;
