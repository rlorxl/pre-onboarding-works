import styled from 'styled-components';

const Backdrop = () => {
  return <BackdropArea />;
};

const BackdropArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export default Backdrop;
