import React, { Component } from "react"

import { Overlay, ModalWindow } from "components/Modal/Modal.styled"

export class Modal extends Component {
  
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }
     
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }
     
    handleKeyDown = e => {
        if (e.code === "Escape") {
            this.props.closeModal();
        }
    };

    render() {
        const {closeModal, selectedImg} = this.props
        return (<Overlay onClick={closeModal}>
                   <ModalWindow>
                      <img src={selectedImg} alt="" />
                    </ModalWindow>
                </Overlay>)
         }
}