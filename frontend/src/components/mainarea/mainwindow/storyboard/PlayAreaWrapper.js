import React, {Component} from "react";
import PlayArea from "./playarea/PlayArea";
import { AreaTitle, Divider } from "../style/MainWindowStyle";
import axios from "axios";
import MemeUtil from "../../../../util/MemeUtil";
import {BOARD_URL_REGEX} from "../../../../util/TextConstant";

class PlayAreaWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {storyName: ""};
        this.loadStoryName = this.loadStoryName.bind(this);
    }

    componentDidMount() {
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        let storyId = this.props.match.params.storyId;

        this.loadStoryName(boardId, storyId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
            let storyId = this.props.match.params.storyId;

            this.loadStoryName(boardId, storyId);
        }
    }

    loadStoryName(boardId, storyId) {
        axios.get("/meme/users/current-user/boards/" + boardId + "/stories/" + storyId)
            .then((response) => {
                this.setState({
                    storyName: response.data.description
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <AreaTitle>Story: {this.state.storyName}</AreaTitle>
                <Divider/>
                {this.props.isUserMemberOfBoard && <PlayArea {...this.props}/>}
            </div>
        );
    }
}

export default PlayAreaWrapper;
