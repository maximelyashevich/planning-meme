import React, {Component} from 'react';
import axios from 'axios';
import MemeUtil from "../../../util/MemeUtil";
import SignForm, {Button, H2, Input, SignDiv} from "./style/SignInStyle";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamMember: undefined
        }
    }

    state = {
        username: ''
    };

    addUser = (e) => {
        e.preventDefault();

        axios.post('/meme/users/', {
            username: this.state.username
        })
            .then(() => {
                this.props.onAuthStateChange();
            })
            .catch(error => {
                alert(error);
            });
    };

    onInputChange = (e) => this.setState({
        username: e.target.value
    });

    render() {
        return (
            <SignDiv>
                <form style={SignForm} onSubmit={this.addUser}>
                    <H2>Let's start!</H2>
                    <Input required="required"  placeholder="Enter your name" onChange={this.onInputChange}/>
                    <Button>Enter</Button>
                </form>
            </SignDiv>
        );
    }
}

export default SignIn;
