import React, {Component} from 'react';
import NavigationBar from "./components/navigation/NavigationBar";
import MainArea from "./components/mainarea/MainArea";
import MemeUtil from "./util/MemeUtil";
import {MEME_START_ENDPOINT, MEME_FINISH_ENDPOINT} from "./util/TextConstant";
import Footer from "./components/mainarea/footer/Footer";
import { Route, Redirect, Switch } from "react-router-dom";
import BoardArea from "./components/mainarea/mainwindow/boardarea/BoardArea";
import StoryArea from "./components/mainarea/mainwindow/storyboard/StoryArea";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <NavigationBar {...this.props} />
                <Footer/>
            </div>
        )
    };
}

class App extends Component {

    constructor(props) {
        super(props);

        let status = window.localStorage.getItem("isLoggedIn");

        this.state = {
            isLoggedIn: status === "true" ? true : false,
            webSocketStartVoting: null,
            webSocketFinishVoting: null
        }

        this.initializeWebSocketConnection(MEME_START_ENDPOINT, this.state.webSocketStartVoting);
        this.initializeWebSocketConnection(MEME_FINISH_ENDPOINT, this.state.webSocketFinishVoting);

        this.handleAuthStatusChange = this.handleAuthStatusChange.bind(this);
    }

    initializeWebSocketConnection(endpoint, memeClient) {
        if (this.state.isLoggedIn) {
             if (memeClient!=null){
                MemeUtil.disconnect(memeClient);
             }

             let webSocketValue = MemeUtil.initializeWebSocket(endpoint);

             if (endpoint == MEME_START_ENDPOINT) {
                 this.state.webSocketStartVoting = webSocketValue;
             }

              if (endpoint == MEME_FINISH_ENDPOINT) {
                 this.state.webSocketFinishVoting = webSocketValue;
              }
        }
    }

    handleAuthStatusChange() {
        this.setState(state => ({
            isLoggedIn: !state.isLoggedIn
        }));

        this.initializeWebSocketConnection(MEME_START_ENDPOINT, this.state.webSocketStartVoting);
        this.initializeWebSocketConnection(MEME_FINISH_ENDPOINT, this.state.webSocketFinishVoting);

        window.localStorage.setItem("isLoggedIn", this.state.isLoggedIn);
    }

    render() {
        return (
            <div>
                <Route path="/"
                       render={(props) => <Home onAuthStateChange={ this.handleAuthStatusChange }
                                                isLoggedIn={ this.state.isLoggedIn }
                                                webSocketStartVoting = {this.state.webSocketStartVoting}
                                                webSocketFinishVoting = {this.state.webSocketFinishVoting}
                                                { ...props } /> } />
                {

                this.state.isLoggedIn ?
                    <Switch>
                        <Route exact={true} path="/boards"
                               render={(props) =>
                                        <BoardArea webSocketStartVoting = {this.state.webSocketStartVoting}
                                        webSocketFinishVoting = {this.state.webSocketFinishVoting}
                                        { ...props } /> }/>
                        <Route path="/boards/:boardId/stories"
                               render={(props) =>
                                        <StoryArea webSocketStartVoting = {this.state.webSocketStartVoting}
                                        webSocketFinishVoting = {this.state.webSocketFinishVoting}
                                        {...props}/>} />
                        <Redirect to="/boards" />
                    </Switch>
                    :
                    <Switch>
                        <Route exact={true} path="/sign-in"
                               render={(props) => <MainArea onAuthStateChange={ this.handleAuthStatusChange }
                                                            webSocketStartVoting = {this.state.webSocketStartVoting}
                                                            webSocketFinishVoting = {this.state.webSocketFinishVoting}
                                                            isLoggedIn={ this.state.isLoggedIn } { ...props } /> } />
                        <Redirect from="/" to="/sign-in" />
                    </Switch>
                }
            </div>
        );
    }
}

export default App;