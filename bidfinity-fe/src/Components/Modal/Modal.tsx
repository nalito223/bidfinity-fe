import React, { useState, useContext, ReactNode } from "react";
import "./Modal.css"
import { AppContext } from '../App/AppContext';

type ModalProps = {
  children: ReactNode;
}

export default function Modal({children}: ModalProps) {
  const { closeModal } = useContext(AppContext);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
