import React, {Component} from 'react';
import axios from "axios";
import {
    Button, CloseButton, ModalBody, ModalContent, ModalDialog, ModalDialogDiv, ModalFooter, ModalHeader, ModalInput,
    ModalTitle, SmallCloseButton
} from "./style/ModalStyle";

class CreateStory extends Component {
    state = {};

    addValue = (e) => {
        e.preventDefault();
        let newStory = {
            description: this.state.description,
        };
        axios.post('/meme/users/current-user/boards/' + this.props.match.params.boardId + '/stories', newStory)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(res.headers.location);
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
                                        onChange={ this.onInputChange }
                                        required=""
                                        value={ this.state.description }/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.addValue}>Create</Button>
                            <CloseButton>Close</CloseButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalDialog>
            </ModalDialogDiv>
        );
    }
}

export default CreateStory;
