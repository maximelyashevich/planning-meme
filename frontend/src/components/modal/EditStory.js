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

    componentDidMount() {
        MemeUtil.setFocus("editStory", "editStoryModalInput");
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
                                        required="required"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={(e) => this.editStory(e)}>Edit</Button>
                            <CloseButton>Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default EditStory;
