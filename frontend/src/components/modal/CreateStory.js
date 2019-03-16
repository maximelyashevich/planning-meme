import React, {Component} from 'react';
import axios from "axios";
import MemeUtil from "../../util/MemeUtil";
import {
    Button,
    CloseButton,
    ModalBody,
    ModalContent,
    ModalDialog,
    ModalDialogDiv,
    ModalFooter,
    ModalHeader,
    ModalInput,
    ModalTitle,
    SmallCloseButton
} from "./style/ModalStyle";

class CreateStory extends Component {
    state = {};

    createStory() {
        let newStory = {
            description: this.state.description,
        };
        axios.post('/meme/users/current-user/boards/' + this.props.match.params.boardId + '/stories', newStory)
            .then(res => {
                axios.get(res.headers.location)
                    .then(response => {
                        this.props.onAdd();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.setState({
                    description: ""
                })
            })
            .catch(err => {
                console.log(err);
                console.log(err.data);
            });
    }

    onKeyPressed = (e) => {
        if (e.key === 'Enter') {
            this.createStory();
            MemeUtil.closeModal("#closeStoryButton");
        }
        return false;
    };

    addValue = (e) => {
        e.preventDefault();
        this.createStory();
        return false;
    };

    onInputChange = (e) => this.setState({
        description: e.target.value
    });

    render() {
        return (
            <ModalDialogDiv id="createStory">
                <ModalDialog>
                    <ModalContent>
                        <ModalHeader>
                            <SmallCloseButton>&times;</SmallCloseButton>
                            <ModalTitle>Create New Story</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <ModalInput id="createStoryInputText"
                                        placeholder="Put your stories text here."
                                        onChange={this.onInputChange}
                                        required=""
                                        onKeyPress={this.onKeyPressed}
                                        value={this.state.description}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.addValue}>Create</Button>
                            <CloseButton id="closeStoryButton">Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default CreateStory;
