import React, {Component} from "react";
import axios from "axios";
import MemeUtil from "../../../../util/MemeUtil";
import {BOARD_URL_REGEX} from "../../../../util/TextConstant";

class JoinBoardButton extends Component {
    constructor(props) {
        super(props);

        this.joinBoard = this.joinBoard.bind(this);
    }

    joinBoard() {
        axios.post("/meme/users/current-user/boards/"
            + MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href)
            + "/members")
            .then((response) => {
                console.log(response);
                this.props.becomeMember();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="no-left-padding">
                <a className="btn btn-primary pull-left btn-lg btn-block" onClick={this.joinBoard}>
                    <i className="fa fa-plus"/> Join board
                </a>
            </div>
        );
    }
}

export default JoinBoardButton;
