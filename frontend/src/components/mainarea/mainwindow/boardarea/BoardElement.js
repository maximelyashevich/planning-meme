import React, {Component} from 'react';
import './style/style.css';
import {
    BoardEditIAttribute, BoardHiddenSpan, BoardTableBindDiv, BoardTableDeleteIcon, BoardTableDeleteSpan
} from "./style/BoardAreaStyle";
import {
    DeleteIAttribute,
    TableEditIcon,
    TableHiddenXs,
    TableNamedTd,
    TableTrClickableTitle
} from "../style/MainWindowStyle";
import MemeUtil from "../../../../util/MemeUtil";

class BoardElement extends Component {

    constructor(props) {
        super(props);
        this.goToStoryList = this.goToStoryList.bind(this);
    }

    deleteBoard() {
        this.props.onChangeBoardIdToDelete(this.props.id);
    }

    editBoard() {
        this.props.onChangeBoardNameToEdit(this.props.name);
        this.props.onChangeBoardIdToEdit(this.props.id);
        MemeUtil.focusBoardNameInput("#editBoardModalInput");
    }

    goToStoryList() {
        this.props.history.push(`${this.props.match.url}/` + this.props.id + `/stories`);
    }

    render() {
        return (
            <TableTrClickableTitle>
                <TableNamedTd onClick={this.goToStoryList}>
                    <div>{this.props.name}</div>
                </TableNamedTd>
                <TableHiddenXs onClick={this.goToStoryList}>
                    <div>
                        In: <BoardHiddenSpan>
                        {String(this.props.startTime).replace('T', ' / ')}
                    </BoardHiddenSpan>
                    </div>
                </TableHiddenXs>
                <TableHiddenXs onClick={this.goToStoryList}>
                    <BoardTableBindDiv>
                        {this.props.storiesCount}
                    </BoardTableBindDiv>
                </TableHiddenXs>
                <TableEditIcon>
                    <BoardEditIAttribute onClick={(e) => this.editBoard(e)}/>
                </TableEditIcon>
                <BoardTableDeleteIcon>
                    <BoardTableDeleteSpan onClick={(e) => this.deleteBoard(e)}>
                        <DeleteIAttribute/>
                    </BoardTableDeleteSpan>
                </BoardTableDeleteIcon>
            </TableTrClickableTitle>
        );
    }
}

export default BoardElement;
