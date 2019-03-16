import React, {Component} from "react";
import {LiElement} from "../style/MemberStyle";

class MemberElement extends Component {
    render() {
        return (
            <LiElement>{this.props.name}<i>{this.props.isAdmin ? '(Admin)' : null}</i></LiElement>
        );
    }
}

export default MemberElement;
