import React, {Component} from 'react';
import axios from "axios";

import {
    Button, CloseButton, ModalBody, ModalContent, ModalDialog, ModalDialogDiv, ModalFooter, ModalHeader, ModalInput,
    ModalTitle, SmallCloseButton
} from "./style/ModalStyle";
import MemeUtil from "../../util/MemeUtil";
import {USER_COOKIE_NAME} from "../../util/TextConstant";

const BOARD_NAME_LENGTH = 47;

class CreateBoard extends Component {

    state = {
        name: ''
    };

    createBoard() {
        let boardName = this.validateBoardName();
        let admin = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME));

        let newBoard = {
            name: boardName,
            admin: {id: admin.id}
        };
        axios.post('/meme/users/current-user/boards/', newBoard)
            .then((response) => {
                this.props.onAdd();
                this.setState({
                    name: ""
                })
            })
            .catch((error) => {
                console.log(error.response.data);
                this.setState({
                    name: ""
                })
            });
    }

    addValue = (e) => {
        e.preventDefault();
        this.createBoard();
        return false;
    };

    onKeyPressed = (e) => {
        if (e.key === 'Enter') {
             this.createBoard();
             MemeUtil.closeModal("#closeButton");
        }
        return false;
    };

    validateBoardName() {
        let name = "Empty";
        if (this.state.name.length > 0 && this.state.name.length < BOARD_NAME_LENGTH) {
            name = this.state.name;
        } else if (this.state.name.length >= BOARD_NAME_LENGTH) {
            name = this.state.name.substring(0, BOARD_NAME_LENGTH) + "...";
        }
        return name;
    }

    onInputChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };


    render() {
        return (
            <ModalDialogDiv id="createBoard">
                <ModalDialog>
                    <ModalContent>
                        <ModalHeader>
                            <SmallCloseButton>&times;</SmallCloseButton>
                            <ModalTitle>Create New Board</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <ModalInput id="createBoardInputText"
                                        placeholder="Enter board name"
                                        required="required"
                                        onChange={ this.onInputChange }
                                        onKeyPress={ this.onKeyPressed }
                                        value={ this.state.name } />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.addValue}>Create</Button>
                            <CloseButton id="closeButton">Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default CreateBoard;
