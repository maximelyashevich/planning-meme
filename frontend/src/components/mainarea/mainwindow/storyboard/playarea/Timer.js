import React, {Component} from 'react';
import StartButton from "./StartButton";
import MemeUtil from "../../../../../util/MemeUtil";
import {BOARD_URL_REGEX} from "../../../../../util/TextConstant";
import {USER_COOKIE_NAME} from "../../../../../util/TextConstant";
import axios from "axios";
import $ from 'jquery';


class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            isOn: false,
            isVoted: false,
            time: 0,
            chosenCardId: 0,
            result: null
        };

        console.log("Page was uploaded.");

        this.startTimer = this.startTimer.bind(this);
        this.initTimer = this.initTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.vote = this.vote.bind(this);
        this.loadStory = this.loadStory.bind(this);
        this.refreshTimer = this.refreshTimer.bind(this);

        this.loadStory();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //window.clearInterval(this.timer);
        if (this.props.location != prevProps.location) {
            this.refreshTimer();
            this.loadStory();
        } else {
            if (this.state.start != 0 && this.timer == undefined) {
                this.timer = setInterval(() => this.setState({
                    time: Date.now() - this.state.start
                }), 1000);
            }
        }
    }

    refreshTimer() {
        window.clearInterval(this.timer);
        this.setState({
            start: 0,
            isOn: false,
            time: 0
        });
    }

    componentWillUnmount() {
        //window.clearInterval(this.timer);
    }

    loadStory() {
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        axios.get(
            "/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId)
            .then(response => {
                if (!response.data.finishTime && response.data.startTime) {
                    this.setState({
                        start: new Date(response.data.startTime),
                        isOn: true
                    });
                    this.timer = setInterval(() => this.setState({
                        time: Date.now() - this.state.start
                    }), 1000);
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    initTimer() {
         console.log("Init timer...");
         this.setState({
               isOn: true,
               start: Date.now()
         });

         this.timer = setInterval(() => this.setState({
                     time: Date.now() - this.state.start
         }), 1000);
    }

    startTimer = () => {
        console.log(this.props.webSocketStartVoting);
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;
        let vote = -1;
        MemeUtil.startVoting(this.props.webSocketStartVoting, userId, boardId);

        let updStory = { setStartTime: true };
        axios.put("/meme/users/current-user/boards/"
            + boardId
            + "/stories/"
            + this.props.match.params.storyId, updStory)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }


    vote() {
        let voteValue = $('.filterImg').attr('alt');

        this.setState({
               result: voteValue,
               chosenCardId: $('.filterImg').attr('id'),
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
                alert(this.state.isVoted);
                let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);

                let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;

                MemeUtil.sendMessage(this.props.webSocketStartVoting, userId, boardId, voteValue);
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }

    stopTimer() {
         console.log(this.props.webSocketFinishVoting);
         let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);

         let userId = JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;

         let vote = this.state.result;
         MemeUtil.finishVoting(this.props.webSocketFinishVoting, userId, boardId);
    }

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

        this.props.webSocketStartVoting.onmessage = (event) => {
            let jsonObj = JSON.parse(event.data);
            let targetBoardId = jsonObj.boardId;
            let message = jsonObj.userId + "-> " + targetBoardId;
            if (isUserMemberOfBoard && targetBoardId === boardId) {

                console.log("Init timer...");
                            this.setState({
                                isOn: true,
                                start: Date.now()
                            });

                            this.timer = setInterval(() => this.setState({
                                time: Date.now() - this.state.start
                            }), 1000);
                if (!isUserAdmin){

                }

                alert("Voting is started: " + message);
            }
        };

        this.props.webSocketFinishVoting.onmessage = (event) => {
               let jsonObj = JSON.parse(event.data);
               let targetBoardId = jsonObj.boardId;
               let message = jsonObj.userId + "-> " + targetBoardId;
               if (isUserMemberOfBoard && targetBoardId === boardId) {
                  clearInterval(this.timer);
                  alert("Voting was finished: " + message);
               }
        };

        let start = (isUserAdmin && this.state.time === 0)
            ? <div onClick={this.startTimer}><StartButton name={"Start voting"}/></div>
            : null;
        let stop = (isUserAdmin && (this.state.time !=0 && this.state.isOn))
            ? <div onClick={this.stopTimer}><StartButton name={"Finish voting"}/></div>
            : null;
            //&& this.state.time != 0
        let vote = (!isUserAdmin && !this.state.isVoted)
            ? <div onClick={this.vote}><StartButton name={"Vote"}/></div>
            : null;

        let result = null;

        if (!this.state.isOn && this.state.start > 0 && this.state.chosenCardId!=0){
            this.changeImg(this.state.chosenCardId);
            result = <div><i>Your vote: </i><b>{this.state.result}</b></div>
        }

        return (
            <div>
                <h3>Time: {MemeUtil.formatTime(this.state.time/1000)}</h3>
                {start}
                {vote}
                {stop}
                {result}
            </div>
        )
    }
}

export default Timer;
