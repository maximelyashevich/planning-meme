import React, {Component} from 'react';
import StartButton from "./StartButton";
import MemeUtil from "../../../../../util/MemeUtil";
import {BOARD_URL_REGEX, USER_COOKIE_NAME} from "../../../../../util/TextConstant";
import axios from "axios";
import $ from 'jquery';
import 'bootstrap-notify';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            isOn: false,
            isVoted: false,
            isFinished: false,
            time: 0,
            chosenCardId: 0,
            result: null
        };

        console.log("Page was uploaded.");

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.vote = this.vote.bind(this);
        this.loadStory = this.loadStory.bind(this);

        this.loadStory();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location) {
            console.log("component did update");
            this.loadStory();
        }
    }

    componentWillUnmount() {
        //window.clearInterval(this.timer);
    }

    loadStory = () => {
        console.log("load story");
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        axios.get(
            "/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId)
            .then(response => {
                console.log("->" + response.data.finishTime);
                let finishTime = response.data.finishTime;
                if (!finishTime && response.data.startTime) {
                    this.setState({
                        start: new Date(response.data.startTime),
                        isOn: true
                    });
                    this.timer = setInterval(() => this.setState({
                        time: Date.now() - this.state.start
                    }), 1000);
                } else if (finishTime) {
                    this.setState({
                        finishTime: true,
                        time: finishTime,
                        isOn: false,
                        isVoted: true
                    })
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    startTimer = () => {
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        let updStory = {setStartTime: true};
        axios.put("/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId, updStory)
            .then(res => {
                this.setState({
                    isOn: true,
                    start: Date.now()
                });

                this.timer = setInterval(() => this.setState({
                    time: Date.now() - this.state.start
                }), 1000);

                let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;
                let vote = -1;
                MemeUtil.startVoting(this.props.webSocketStartVoting, userId, boardId);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };


    vote() {
        let filterImg = '.filterImg';
        let voteValue = $(filterImg).attr('alt');
        let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;

        this.setState({
            result: voteValue,
            chosenCardId: $(filterImg).attr('id'),
            isVoted: true,
            isOn: false
        });

        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);

        let updStory = {
            setFinishTime: true,
            estimation: voteValue
        };

        axios.put("/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId, updStory)
            .then(res => {
                console.log(res.data);
                let username = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).username;
                MemeUtil.vote(this.props.webSocketVote, userId, username, boardId, voteValue);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }

    stopTimer = () => {
        this.setState({
            isOn: false,
            isFinished: true
        });

        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);

        let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;

        let vote = this.state.result;
        let updStory = {
            setFinishTime: true
        };

        axios.put("/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId, updStory)
            .then(res => {
                console.log(res.data);
                let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
                let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;

                MemeUtil.finishVoting(this.props.webSocketFinishVoting, userId, boardId);
            })
            .catch(err => {
                console.log(err.response.data);
            });

    };

    changeImg(id) {
        $('#' + id).attr('src', 'resources/images/34.png');
        let header = document.getElementById("all_cards");
        let liImages = header.getElementsByClassName("cardImg");
        for (let i = 0; i < liImages.length; i++) {
            let currentImage = liImages[i].firstChild;
            currentImage.className = currentImage.className.replace("filterImg", "");
        }
    }

    render() {

        let isUserAdmin = this.props.isUserAdminOfBoard;
        let isUserMemberOfBoard = this.props.isUserMemberOfBoard;
        let boardId = this.props.boardId;
        let storyId = this.props.match.params.storyId;

        this.props.webSocketStartVoting.onmessage = (event) => {

            let jsonObj = JSON.parse(event.data);
            let targetBoardId = jsonObj.boardId;
            let message = jsonObj.userId + "-> " + targetBoardId;

            $(document).ready(function () {
                $.notify({
                    title: 'Voting is starting.',
                    message: 'Board: ' + targetBoardId + ', story: ' + storyId,
                }, {
                    element: "body",
                    type: "info",
                    allow_dismiss: true,
                    newest_on_top: true,
                    offset: 90,
                    placement: {
                        from: "top",
                        align: "right"
                    }
                });
            });

            //todo: check equals
            if (isUserMemberOfBoard && targetBoardId === boardId) {

                console.log("Init timer...");

                if (!isUserAdmin) {

                    this.setState({
                        isOn: true,
                        start: Date.now(),
                        timer: setInterval(() => this.setState({
                            time: Date.now() - this.state.start
                        }), 1000)
                    });
                }
            }
        };

        this.props.webSocketVote.onmessage = (event) => {

            let jsonObj = JSON.parse(event.data);
            let targetBoardId = jsonObj.boardId;
            let message = jsonObj.userId + "-> " + targetBoardId;

            //todo: check equals
            if (isUserMemberOfBoard && targetBoardId === boardId) {

                $(document).ready(function () {
                    $.notify({
                        title: 'Successful voting.',
                        message: jsonObj.username + ' has just voted.',
                    }, {
                        element: "body",
                        type: "info",
                        allow_dismiss: true,
                        newest_on_top: true,
                        offset: 90,
                        placement: {
                            from: "top",
                            align: "right"
                        }
                    });
                });

                console.log("Init timer...");

                if (!isUserAdmin) {
                }
            }
        };

        this.props.webSocketFinishVoting.onmessage = (event) => {
            console.log("message on stopping...");
            let jsonObj = JSON.parse(event.data);
            let targetBoardId = jsonObj.boardId;
            let message = jsonObj.userId + "-> " + targetBoardId;

            $(document).ready(function () {
                $.notify({
                    title: 'Voting was finished.',
                    message: 'Board: ' + targetBoardId + ', story: ' + storyId,
                }, {
                    element: "body",
                    type: "success",
                    allow_dismiss: true,
                    newest_on_top: true,
                    offset: 90,
                    placement: {
                        from: "top",
                        align: "right"
                    }
                });
            });

            //todo: check equals
            if (isUserMemberOfBoard && targetBoardId === boardId) {

                if (!isUserAdmin) {
                    this.setState({
                        isOn: false
                    });

                    clearInterval(this.state.timer);
                }
                clearInterval(this.timer);

            }
        };

        let start = (isUserAdmin && this.state.time === 0)
            ? <div onClick={this.startTimer}><StartButton name={"Start voting"}/></div>
            : null;

        let stop = (isUserAdmin && (this.state.time !== 0 && !this.state.isFinished))
            ? <div onClick={this.stopTimer}><StartButton name={"Finish voting"}/></div>
            : null;

        let vote = (!this.state.isVoted && this.state.time !== 0)
            ? <div onClick={this.vote}><StartButton name={"Vote"}/></div>
            : null;

        let result = null;

        if (!this.state.isOn && this.state.start > 0 && this.state.chosenCardId !== 0) {
            this.changeImg(this.state.chosenCardId);
            result = <div><i>Your vote: </i><b>{this.state.result}</b></div>
        }

        let time = this.state.finishTime
            ? 'Voting has already been held.'
            : 'Time: ' + MemeUtil.formatTime(this.state.time / 1000);

        return (
            <div>
                <h3>{time}</h3>
                {start}
                {vote}
                {stop}
                {result}
            </div>
        )
    }
}

export default Timer;
