import React, {Component} from 'react';
import {
    DeleteIAttribute,
    TableEditIcon,
    TableHiddenXs,
    TableNamedTd,
    TableTrClickableTitle
} from "../style/MainWindowStyle";
import {StoryDeleteTdAttribute, StoryEditIAttribute} from "./style/StoryAreaStyle";
import MemeUtil from "../../../../util/MemeUtil";
import $ from "jquery"

class StoryElement extends Component {

    constructor(props) {
        super(props);
        this.goToStory = this.goToStory.bind(this);
    }

    setStoryProps() {
        sessionStorage.setItem('storyId', this.props.id);
    }

    goToStory() {
        this.props.history.push(`${this.props.match.url}/` + this.props.id);
    }

    deleteStory() {
        console.log(this.props.webSocketStartVoting);
        this.props.onChangeStoryIdToDelete(this.props.id);
    }

    editStory() {
        this.props.onChangeStoryIdToEdit(this.props.id);
        this.props.onChangeStoryNameToEdit(this.props.description);
        MemeUtil.focusBoardNameInput("#editStoryModalInput");
    }

    render() {
        console.log(this.props.isUserAdminOfBoard);

        return (
            <TableTrClickableTitle isFinished={this.props.finishTime}>
                <TableNamedTd onClick={ this.goToStory }>{this.props.description}</TableNamedTd>
                <TableHiddenXs onClick={ this.goToStory }>{String(this.props.startTime).replace('T', ' / ')} </TableHiddenXs>
                <TableHiddenXs onClick={ this.goToStory }>{String(this.props.finishTime).replace('T', ' / ')}</TableHiddenXs>
                <TableHiddenXs onClick={ this.goToStory }>stub</TableHiddenXs>
                <TableHiddenXs onClick={ this.goToStory }>{this.props.estimation}</TableHiddenXs>
                { this.props.isUserAdminOfBoard === true && <TableEditIcon onClick={(e) => this.editStory(e)}>
                    <StoryEditIAttribute/>
                </TableEditIcon> }
                { this.props.isUserAdminOfBoard === true && <StoryDeleteTdAttribute onClick={(e) => this.deleteStory(e)}>
                    <DeleteIAttribute/>
                </StoryDeleteTdAttribute> }
            </TableTrClickableTitle>
        );
    }
}

export default StoryElement;
