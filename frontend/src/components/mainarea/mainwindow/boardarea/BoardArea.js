import React, {Component} from 'react';
import CreateBoardButton from "./CreateBoardButton";
import BoardTable from "./BoardTable";
import './style/style.css'
import EditBoard from "../../../modal/EditBoard";
import ConfirmDelete from "../../../modal/ConfirmDelete";
import CreateBoard from "../../../modal/CreateBoard";
import BoardElement from "./BoardElement";
import {BoardAreaDiv} from "./style/BoardAreaStyle";
import {AreaContainer, AreaTitle, BoardAreaColumns} from "../style/MainWindowStyle";
import axios from "axios";

class BoardArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            pageNumber: 0,
            pageSize: 5,
            boardCount: 5,
            boardIdToDelete: 0,
            boardIdToEdit: 0,
            boardNameToEdit: null
        };
        this.reloadPage = this.reloadPage.bind(this);
        this.loadElements = this.loadElements.bind(this);
        this.onInputPageNumberChange = this.onInputPageNumberChange.bind(this);
        this.checkBoardCount = this.checkBoardCount.bind(this);
        this.changeBoardIdToDeleteStateChange = this.changeBoardIdToDeleteStateChange.bind(this);
        this.changeBoardIdToEditStateChange = this.changeBoardIdToEditStateChange.bind(this);
        this.changeBoardNameToEditStateChange = this.changeBoardNameToEditStateChange.bind(this);
    }

    componentDidMount() {
        this.loadBoards(this.state.pageNumber);
    }

    changeBoardIdToDeleteStateChange = (e) => {
        this.setState(() => ({
            boardIdToDelete: e
        }));
    };

    changeBoardIdToEditStateChange = (e) => {
        this.setState(() => ({
            boardIdToEdit: e
        }));
    };

    changeBoardNameToEditStateChange = (e) => {
        this.setState(() => ({
            boardNameToEdit: e
        }));
    };

    checkBoardCount() {
        axios.get('/meme/users/current-user/')
            .then((response) => {
                this.setState({
                    boardCount: response.data.countOfBoards
                });
            })
            .catch(error => {
                console.log(error.data);
            });
    }

    onInputPageNumberChange(e) {
        let newPageNumber = Number(e.target.text) - 1;
        this.setState({
            pageNumber: newPageNumber
        });
        this.loadBoards(newPageNumber);
    }

    loadBoards(pageNumber) {
        this.checkBoardCount();
        axios.get(
            "/meme/users/current-user/boards?page="
            + pageNumber
            + "&pageSize="
            + this.state.pageSize)
            .then((response) => {
                let boardElements = response.data.map(item =>
                    <BoardElement
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        startTime={item.startTime}
                        storiesCount={item.storiesCount}
                        onChangeBoardIdToDelete={this.changeBoardIdToDeleteStateChange}
                        onChangeBoardIdToEdit={this.changeBoardIdToEditStateChange}
                        onChangeBoardNameToEdit={this.changeBoardNameToEditStateChange} {...this.props} />
                );
                this.loadElements(boardElements);
            })
            .catch(error => {
                console.log(error);
            });
    }

    reloadPage() {
        this.loadBoards(this.state.pageNumber);
    }

    loadElements(elements) {
        this.setState({
            boards: elements.slice()
        });
    }

    render() {
        return (
            <AreaContainer>
                <BoardAreaDiv>
                    <BoardAreaColumns>
                        <AreaTitle>Recent Boards</AreaTitle>
                        <CreateBoardButton/>
                        <BoardTable boardList={this.state.boards}
                                    onInputPageNumberChange={this.onInputPageNumberChange}
                                    pageSize={this.state.pageSize}
                                    boardCount={this.state.boardCount} {...this.props} />
                        <EditBoard boardIdToEdit={this.state.boardIdToEdit}
                                   boardNameToEdit={this.state.boardNameToEdit}
                                   onReloadPage={this.reloadPage}/>
                        <CreateBoard onAdd={ this.reloadPage }/>
                        <ConfirmDelete boardIdToDelete={this.state.boardIdToDelete}
                                       onReloadPage={this.reloadPage}/>
                    </BoardAreaColumns>
                </BoardAreaDiv>
            </AreaContainer>
        );
    }
}

export default BoardArea;
