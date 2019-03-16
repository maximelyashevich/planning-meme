import React, {Component} from 'react';
import './style/style.css'
import {CreateButton, CreateStoryButtonAttribute} from "../style/MainWindowStyle";
import MemeUtil from "../../../../util/MemeUtil";

class CreateStoryButton extends Component {
    render() {
        return (
            <CreateButton>
                <CreateStoryButtonAttribute onClick={(e) => MemeUtil.focusBoardNameInput("#createStoryInputText")}>
                    <i className="fa fa-plus"/> Create Story
                </CreateStoryButtonAttribute>
            </CreateButton>
        );
    }
}

export default CreateStoryButton;