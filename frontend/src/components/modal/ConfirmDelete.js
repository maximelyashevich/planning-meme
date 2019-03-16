import React, {Component} from 'react';
import axios from "axios";
import {
    Button,
    CloseButton,
    divStyle,
    ModalBody,
    ModalContent,
    ModalDialog,
    ModalDialogDiv,
    ModalFooter,
    ModalHeader
} from "./style/ModalStyle";

class ConfirmDelete extends Component {

    deleteBoard() {
        axios.delete('/meme/users/current-user/boards/' + this.props.boardIdToDelete)
            .then(() => {
                this.props.onReloadPage();
            })
            .catch((error) => {
                console.log(error.data);
            });
    };

    render() {
        return (
            <ModalDialogDiv id="confirm-delete">
                <ModalDialog>
                    <ModalContent>
                        <ModalHeader style={divStyle}>Wait!</ModalHeader>
                        <ModalBody>Are you sure to delete this?</ModalBody>
                        <ModalFooter>
                            <CloseButton onClick={(e) => this.deleteBoard(e)}>Delete anyway</CloseButton>
                            <Button>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default ConfirmDelete;
