import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import { useState } from 'react';
import Authorization from '../../../Authorization/Authorization';
import { useNavigate } from 'react-router-dom';
import './ModalErrorRegistration.scss';
import {useSelector} from "react-redux";
import {selectorRegistrationMessageError} from "../../../../selectors";

const ModalErrorRegistration = ({ closeErrorModal }) => {
  const closeModalError = useSelector(selectorRegistrationMessageError);
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
      modalAction={closeErrorModal}
      closeAction={() => {
        closeErrorModal();
      }}
    >
      <p className="modal_title"> {closeModalError && closeModalError } </p>
      <p className="modal_title__login">please try again or login</p>
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
            closeErrorModal();
            navigate('/');
          }}
        />
      )}
    </Modal>
  );
};

export default ModalErrorRegistration;
