import React, {Component} from "react";
import axios from "axios";
import MemberElement from "./MemberElement";
import MemeUtil from "../../../../../util/MemeUtil";
import {BOARD_URL_REGEX} from "../../../../../util/TextConstant";
import $ from 'jquery';


const styleUserList = {
    marginTop: '50px',
    paddingBottom: '20px',
    paddingTop: '50px'
};

const uListStyle = {
    maxHeight: '24em',
    overflowY: 'auto',
    minHeight: '3em'
};

class MemberList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardUsers: [],
            boardAdminId: null
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.getBoardAdminId();
    }

    getBoardAdminId() {
        axios.get("/meme/users/current-user/boards/" + MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href))
            .then((response) => {
                this.setState({
                    boardAdminId: response.data.admin.id
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    tick() {
        axios.get("/meme/users/current-user/boards/" + MemeUtil.findIdByUrl(BOARD_URL_REGEX, window.location.href) + "/members")
            .then((response) => {
                $('.spinner').remove();

                this.setState({
                    boardUsers: response.data.map(item =>
                        <MemberElement key={item.id}
                                       id={item.id}
                                       name={item.username}
                                       isAdmin={(this.state.boardAdminId == item.id) ? true : false}
                        />
                    )
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="text-center" style={styleUserList}>
                Member List
                <div className="spinner circles">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>

                <ul className="list-group" style={uListStyle}>
                    {this.state.boardUsers}
                </ul>
            </div>
        );
    }
}

export default MemberList;
