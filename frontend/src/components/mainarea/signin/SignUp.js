import React, {Component} from 'react';
import SignForm, {Button, FormGroup, H2, Input, SignDiv} from "./style/SignInStyle";

class SignUp extends Component {
    render() {
        return (
            <SignDiv>
                <SignForm>
                    <H2>Sign up for free!</H2>
                    <FormGroup>
                        <Input placeholder="Enter your name" required="required"/>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="&#xf0e0 Enter your email" required="required"/>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="&#xf023 Enter your password" required="required"/>
                    </FormGroup>
                    <FormGroup>
                        <Button data-target="#mainWindow" data-toggle="collapse">Sign up</Button>
                    </FormGroup>
                </SignForm>
            </SignDiv>
        );
    }
}

export default SignUp;
