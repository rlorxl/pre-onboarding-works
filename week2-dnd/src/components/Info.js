import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';

const Info = ({ info, closeModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.querySelector('#backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalArea>
          <Modal info={info} onClose={closeModal} />
        </ModalArea>,
        document.querySelector('#modal-root')
      )}
    </>
  );
};

const ModalArea = styled.div`
  width: 500px;
  height: 100vh;
  background: #fff;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  position: fixed;
  top: 0;
  right: 0;
  padding: 35px;
  z-index: 10;
`;

export default Info;
