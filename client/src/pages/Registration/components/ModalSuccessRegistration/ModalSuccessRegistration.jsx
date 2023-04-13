import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import { useState } from 'react';
import Authorization from '../../../Authorization/Authorization';
import { useNavigate } from 'react-router-dom';
import './ModalSuccessRegistration.scss';

const ModalSuccessRegistration = ({ closeModal }) => {
  const navigate = useNavigate();
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);

  const toggleModalAuth = (event) => {
    event.preventDefault();
    setIsModalAuthOpen(!isModalAuthOpen);
  };

  const closeModalAuth = () => {
    setIsModalAuthOpen(false);
  };
  return (
    <Modal
      modalAction={closeModal}
      closeAction={() => {
        closeModal();
      }}
    >
      <p className="modal_title"> Successful registration ! </p>
      <Button
        className="form-block__btn"
        type="button"
        text="login"
        onClick={(event) => toggleModalAuth(event)}
      />
      {isModalAuthOpen && (
        <Authorization
          closeModalAuth={() => {
            closeModalAuth();
            closeModal();
            navigate('/');
          }}
        />
      )}
    </Modal>
  );
};

export default ModalSuccessRegistration;
