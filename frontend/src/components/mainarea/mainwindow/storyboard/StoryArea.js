import React, {Component} from 'react';
import StoryTable from "./StoryTable";
import EditStory from "../../../modal/EditStory";
import CreateStory from "../../../modal/CreateStory";
import ConfirmStoryDelete from "../../../modal/ConfirmStoryDelete";
import {Route} from "react-router-dom";
import PlayAreaWrapper from "./PlayAreaWrapper";
import {AreaColumns, AreaContainer, AreaRow, AreaTitle, Divider} from "../style/MainWindowStyle";
import axios from "axios";
import StoryElement from "./StoryElement";
import MemeUtil from "../../../../util/MemeUtil";
import {BOARD_URL_REGEX, USER_COOKIE_NAME} from "../../../../util/TextConstant";
import JoinBoardButton from "./JoinBoardButton";
import CreateStoryButton from "./CreateStoryButton"

class StoryArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boardName: "",
            boardUsers: [],
            isUserMemberOfBoard: undefined,
            isUserAdminOfBoard: undefined,
            boardId: 0,
            pageNumber: 0,
            pageSize: 5,
            storyCount: 5,
            storyIdToDelete: 0,
            storyIdToEdit: 0,
            storyNameToEdit: "",
            stories: []
        };
        this.reloadPage = this.reloadPage.bind(this);
        this.becomeMember = this.becomeMember.bind(this);
        this.loadElements = this.loadElements.bind(this);
        this.onInputPageNumberChange = this.onInputPageNumberChange.bind(this);
        this.checkStoryCount = this.checkStoryCount.bind(this);
        this.specifyStoryName = this.specifyStoryName.bind(this);
        this.loadBoardName = this.loadBoardName.bind(this);
        this.checkUserMembership = this.checkUserMembership.bind(this);
        this.checkUserAdmin = this.checkUserAdmin.bind(this);
        this.changeStoryIdToDeleteStateChange = this.changeStoryIdToDeleteStateChange.bind(this);
        this.changeStoryIdToEditStateChange = this.changeStoryIdToEditStateChange.bind(this);
        this.changeStoryNameToEditStateChange = this.changeStoryNameToEditStateChange.bind(this);
    }

    componentDidMount() {
        let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
        this.setState(()=>({
            boardId: boardId
        }));
        this.checkUserAdmin(boardId);
        this.loadBoardName(boardId);
        this.checkUserMembership(boardId);


        this.loadStories(this.state.pageNumber, boardId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            let boardId = MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href);
            this.loadBoardName(boardId);
        }
    }

    changeStoryIdToDeleteStateChange = (e) => {
        this.setState(() => ({
            storyIdToDelete: e
        }));
    };

    changeStoryIdToEditStateChange = (e) => {
        this.setState(() => ({
            storyIdToEdit: e
        }));
    };

    changeStoryNameToEditStateChange = (e) => {
        this.setState(() => ({
           storyNameToEdit: e
        }));
    }

    checkStoryCount(boardId) {
        axios.get('/meme/users/current-user/boards/' + boardId)
            .then((response) => {
                this.setState({
                    storyCount: response.data.countOfStories
                });
            })
            .catch(error => {
                console.log(error.data);
            });
    }

    loadStories(pageNumber, boardId) {
        if (boardId != null) {
            this.checkStoryCount(boardId);
            axios.get('/meme/users/current-user/boards/'
                + boardId
                + '/stories?page='
                + pageNumber
                + '&pageSize='
                + this.state.pageSize)
                .then((response) => {
                    let storyElements = response.data.map(story =>
                        <StoryElement
                            key={story.id}
                            id={story.id}
                            description={story.description}
                            startTime={story.startTime}
                            finishTime={story.finishTime}
                            estimation={story.estimation}
                            onChangeStoryIdToDelete = {this.changeStoryIdToDeleteStateChange}
                            onChangeStoryIdToEdit = {this.changeStoryIdToEditStateChange}
                            onChangeStoryNameToEdit = {this.changeStoryNameToEditStateChange}
                            checkUserAdmin = {this.checkUserAdmin}
                            isUserAdminOfBoard = { this.state.isUserAdminOfBoard }
                            {...this.props} />);
                    this.loadElements(storyElements);
                })
                .catch(error => {
                    alert(error.data);
                });
        }
    }

    reloadPage() {
        this.loadStories(this.state.pageNumber, this.state.boardId);
    }

    onInputPageNumberChange(e) {
            let newPageNumber = Number(e.target.text) - 1;
            this.setState({
                pageNumber: newPageNumber
            });
            this.loadStories(newPageNumber, this.state.boardId);
    }

    loadBoardName(boardId) {
        axios.get("/meme/users/current-user/boards/" + boardId)
            .then((response) => {
                this.setState({
                    boardName: response.data.name
                });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    checkUserMembership(boardId) {
        axios.get("/meme/users/current-user/boards/" + boardId + "/members")
            .then((response) => {
                this.setState({
                    isUserMemberOfBoard: response.data.some((element) => {
                        return element.id === JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id;
                    })
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    checkUserAdmin(boardId) {
        axios.get("/meme/users/current-user/boards/" + boardId)
            .then((response) => {
                this.setState({
                    isUserAdminOfBoard: response.data.admin.id === JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).id
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            });
       }

    becomeMember() {
        this.setState({
            isUserMemberOfBoard: true
        })
    }

    loadElements(elements) {
        this.setState(() => ({
            stories: elements.slice()
        }));
    }

    specifyStoryName(storyName) {
        this.setState({
            storyName: storyName
        });
    }

    render() {
        return (
            <AreaContainer id="storyArea">
                <AreaColumns>
                    <AreaTitle>
                        Board: {this.state.boardName}
                    </AreaTitle>
                    <Divider/>
                    { this.state.isUserAdminOfBoard && <CreateStoryButton/> }
                    {!this.state.isUserMemberOfBoard && <JoinBoardButton becomeMember={this.becomeMember}/>}
                    <AreaRow>
                        <Route path={`${this.props.match.url}/:storyId`}
                               render={(props) =>
                                   <PlayAreaWrapper isUserMemberOfBoard={this.state.isUserMemberOfBoard}
                                                    isUserAdminOfBoard={this.state.isUserAdminOfBoard}
                                                    storyName={this.state.storyName}
                                                    boardId={this.state.boardId}
                                                    webSocketStartVoting={this.props.webSocketStartVoting}
                                                    webSocketFinishVoting={this.props.webSocketFinishVoting}
                                                    onReloadPage={this.reloadPage}
                                                    {...props}/>}/>
                        <div>
                            <CreateStory onAdd={ this.reloadPage } {...this.props}/>
                            <StoryTable storyList={this.state.stories}
                                        onStoriesLoad={this.loadElements}
                                        specifyStoryName={this.specifyStoryName}
                                        onInputPageNumberChange={this.onInputPageNumberChange}
                                        pageSize={this.state.pageSize}
                                        storyCount={this.state.storyCount}
                                        {...this.props}/>
                        </div>
                         <EditStory storyIdToEdit={this.state.storyIdToEdit}
                                   storyNameToEdit={this.state.storyNameToEdit}
                                   boardId={this.state.boardId}
                                   onReloadPage={this.reloadPage}/>
                        <ConfirmStoryDelete storyIdToDelete={this.state.storyIdToDelete}
                                            boardId={this.state.boardId}
                                            onReloadPage={this.reloadPage}/>
                    </AreaRow>
                </AreaColumns>
            </AreaContainer>
        );
    }
}

export default StoryArea;
