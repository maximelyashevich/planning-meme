import React, {Component} from 'react';
import './style/style.css'
import {StoryPaginationUl} from "./style/StoryAreaStyle";

class StoryPagination extends Component {

    state = {
        buttonList: []
    };

    componentDidMount() {
        this.initializePagination();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.storyCount !== this.props.storyCount) {
            this.initializePagination();
        }
    }

    initializePagination() {
        let buttons = [];
        for (let i = 1; i <= Math.ceil(this.props.storyCount / this.props.pageSize); i++) {
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
            <StoryPaginationUl>{this.state.buttonList}</StoryPaginationUl>
        );
    }
}

export default StoryPagination
