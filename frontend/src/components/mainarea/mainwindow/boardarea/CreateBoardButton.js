import React, { Component } from 'react';
import './style/style.css'
import {CreateBoardButtonAttribute, CreateButton} from "../style/MainWindowStyle";
import MemeUtil from "../../../../util/MemeUtil";

class CreateBoardButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreateButton>
                <CreateBoardButtonAttribute onClick={(e) => MemeUtil.focusBoardNameInput("#createBoardInputText")}>
                    <i className="fa fa-plus"/> Create Board
                </CreateBoardButtonAttribute>
            </CreateButton>
        );
    }
}

export default CreateBoardButton;
