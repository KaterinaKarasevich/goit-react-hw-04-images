import React, { useEffect } from "react"

import { Overlay, ModalWindow } from "components/Modal/Modal.styled"

export const Modal = ({closeModal, selectedImg}) => {
  
    useEffect(() => {
        const handleKeyDown = e => {
        if (e.code === "Escape") {
            closeModal();
            };
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [closeModal])

    
    return (
         <Overlay onClick={closeModal}>
            <ModalWindow>
                <img src={selectedImg} alt="" />
            </ModalWindow>
        </Overlay>
    )
}

