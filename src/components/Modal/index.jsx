import React from 'react';
import styled from "./index.module.scss"


function Modal({ active, setActive, children }) {
    return (
        <div className={active ? `${styled.modal} ${styled.modal__active}` : `${styled.modal}`} onClick={() => setActive(false)}>
            <div className={styled.modal__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;