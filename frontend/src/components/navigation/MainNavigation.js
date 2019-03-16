import React from 'react';
import {
    DropdownButton,
    DropdownMenu,
    DropdownToggle,
    MainNavigationBarCollapse,
    MainNavigationUl,
    NavigationUl,
    SignOutButton,
    UserPlace
} from "./style/NavigationStyle";
import MemeUtil from "../../util/MemeUtil";
import {USER_COOKIE_NAME} from "../../util/TextConstant";

class MainNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: ""};
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut = () => {
        MemeUtil.deleteCookieByName(USER_COOKIE_NAME);

        window.localStorage.removeItem("isLoggedIn");
        if (this.props.webSocketStartVoting != null) {
            MemeUtil.disconnect(this.props.webSocketStartVoting);
        }

        if (this.props.webSocketVote != null) {
            MemeUtil.disconnect(this.props.webSocketVote);
        }

        if (this.props.webSocketFinishVoting != null) {
            MemeUtil.disconnect(this.props.webSocketFinishVoting);
        }
    };

    componentDidMount() {
        try {
            this.setState({username: JSON.parse(MemeUtil.identifyCookieByName(USER_COOKIE_NAME)).username});
        } catch (err) {
            MemeUtil.deleteCookieByName(USER_COOKIE_NAME);
            window.localStorage.removeItem("isLoggedIn");
            window.location.reload();
        }
    }


    render() {
        return (
            <div id="mainNavBar">
                <MainNavigationUl>
                    <DropdownButton>
                        <DropdownToggle>
                            <UserPlace id="userPlace">{this.state.username}</UserPlace><b className="caret"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <li><a href={"/#/boards"}>My boards</a></li>
                            <li className="divider"/>
                            <li>
                                <SignOutButton href="/" onClick={this.handleSignOut}>Sign Out</SignOutButton>
                            </li>
                        </DropdownMenu>
                    </DropdownButton>
                </MainNavigationUl>
                <MainNavigationBarCollapse>
                    <NavigationUl>
                        <li className="active"><a href="/">Home</a></li>
                    </NavigationUl>
                </MainNavigationBarCollapse>
            </div>
        );
    }
}

export default MainNavigation;