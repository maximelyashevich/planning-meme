import styled from "styled-components";

const Button = styled.button.attrs({
    type: "submit",
    className: "btn btn-primary hidden-xs",
    name: "loginButton"
})`width: 100%;  display: inline !important`;

const Input = styled.input.attrs({
    type: "text",
    className: "fa form-control",
    pattern: "^(?=.{3,20}$)(?![_])(?!.*[_]{2,})[a-zA-Z0-9_]+(?<![_])$",
    title: "Length of the name must be between 3 and 20 characters",
    name: "usernameArea"
})`width: 100%; margin-bottom: 2px`;

const H2 = styled.h2.attrs({
    className: "text-center"
})``;

const SignForm = {
    marginTop: '10%'
};

const SignDiv = styled.div.attrs({
    className: "col-md-8 col-md-offset-2 collapse in"
})``;

const FormGroup = styled.div.attrs({
    className: "form-group"
})``;
export {SignForm as default, Button, Input, H2, FormGroup, SignDiv}