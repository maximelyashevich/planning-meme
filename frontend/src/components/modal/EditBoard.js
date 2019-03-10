import React, {Component} from 'react';
import axios from "axios";
import MemeUtil from "../../util/MemeUtil";
import {
    Button, CloseButton, ModalBody, ModalContent, ModalDialog, ModalDialogDiv, ModalFooter, ModalHeader, ModalInput,
    ModalTitle, SmallCloseButton
} from "./style/ModalStyle";
import $ from 'jquery';

class EditBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {name: this.props.boardNameToEdit};
    }

    editBoard(){
            axios.put('/meme/users/current-user/boards/' + this.props.boardIdToEdit, {
                name: this.state.name
            })
                .then(() => {
                    this.props.onReloadPage();
                    $("#editBoardModalInput").val("");
                })
                .catch((error) => {
                    console.log(error.data);
                });
    }

    onKeyPressed = (e) => {
        if (e.key === 'Enter') {
             this.editBoard();
             MemeUtil.closeModal("#closeEditBoardButton");
        }
        return false;
    };

    onInputChange = (e) => this.setState({
        name: e.target.value
    });

    render() {
        return (
            <ModalDialogDiv id="editBoard">
                <ModalDialog>
                    <ModalContent>
                        <ModalHeader>
                            <SmallCloseButton>&times;</SmallCloseButton>
                            <ModalTitle>Update Board</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <ModalInput id="editBoardModalInput"
                                        placeholder={this.props.boardNameToEdit}
                                        onChange={this.onInputChange}
                                        onKeyPress={ this.onKeyPressed }
                                        required="required"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={(e) => this.editBoard(e)}>Edit</Button>
                            <CloseButton id="closeEditBoardButton">Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default EditBoard;
