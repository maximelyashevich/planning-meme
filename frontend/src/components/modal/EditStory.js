import React, {Component} from 'react';
import axios from "axios";
import MemeUtil from "../../util/MemeUtil";
import {
    Button, CloseButton, ModalBody, ModalContent, ModalDialog, ModalDialogDiv, ModalFooter, ModalHeader, ModalInput,
    ModalTitle, SmallCloseButton
} from "./style/ModalStyle";
import $ from 'jquery';

class EditStory extends Component {

    constructor(props) {
        super(props);
        this.state = {description: ""};
    }

    editStory() {
        axios.put('/meme/users/current-user/boards/'+ this.props.boardId
            + '/stories/' + this.props.storyIdToEdit, {
            description: this.state.description
        })
            .then(() => {
                this.props.onReloadPage();
                $("#editStoryModalInput").val("");
            })
            .catch((error) => {
                console.log(error.data);
            });
    };

    onKeyPressed = (e) => {
        if (e.key === 'Enter') {
             this.editStory();
             MemeUtil.closeModal("#closeEditStoryButton");
        }
        return false;
    };

    onInputChange = (e) => this.setState({
        description: e.target.value
    });

    render() {
        return (
            <ModalDialogDiv id="editStory">
                <ModalDialog>
                    <ModalContent>
                        <ModalHeader>
                            <SmallCloseButton>&times;</SmallCloseButton>
                            <ModalTitle>Edit Story</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <ModalInput id="editStoryModalInput"
                                        placeholder={this.props.storyNameToEdit}
                                        onChange={this.onInputChange}
                                        onKeyPress={ this.onKeyPressed }
                                        required="required"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={(e) => this.editStory(e)}>Edit</Button>
                            <CloseButton id="closeEditStoryButton">Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default EditStory;
