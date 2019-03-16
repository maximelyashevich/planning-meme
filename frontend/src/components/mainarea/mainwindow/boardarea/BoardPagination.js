import React, {Component} from 'react';
import './style/style.css'
import {BoardPaginationUl} from "./style/BoardAreaStyle";


class BoardPagination extends Component {

    state = {
        buttonList: []
    };

    componentDidMount() {
        this.initializePagination();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.boardCount !== this.props.boardCount) {
            this.initializePagination();
        }
    }

    initializePagination() {
        let buttons = [];
        for (let i = 1; i <= Math.ceil(this.props.boardCount / this.props.pageSize); i++) {
            buttons.push(
                <li className="page-item">
                    <a className="page-link" onClick={this.props.pageNumberHandler}>{i}</a>
                </li>
            );
        }
        this.setState({
            buttonList: buttons.slice()
        })
    }

    render() {
        return (
            <BoardPaginationUl>{this.state.buttonList}</BoardPaginationUl>
        );
    }
}

export default BoardPagination
