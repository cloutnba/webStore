import {Box} from "@mui/material";
import styled from "styled-components";

import {ReactComponent as Close} from './icons/close.svg'

const ModalWrapper = styled.div `
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        margin: 0 auto;
    `

const ModalBlock = styled(Box) `
        max-width: 450px;
        min-width: 320px;
        position: relative;
        background-color: #FFFFFF;
        padding: 45px 35px 30px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `

const CloseBtn = styled(Close) `
        position: absolute;
        top: -5px;
        right: -5px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    `

const Modal = ({children, modalAction, closeAction}) => {
return (
    <div className="wrapper">
    <ModalWrapper onClick={closeAction}>
        <ModalBlock onClick={(e) => e.stopPropagation()}>
            <CloseBtn fontSize="large" stroke="white" onClick={modalAction}/>
            {children}
        </ModalBlock>
    </ModalWrapper>
    </div>
)
}

export default Modal;
