import styled from "styled-components";

const divStyle = {
    background: '#545454',
    color: 'darkgray',
    padding: '1% 0 0 0'
};

const FooterDiv = styled.div.attrs({
    className: "navbar-fixed-bottom row-fluid"
})``;

const FooterInner = styled.div.attrs({
    className: "navbar-inner"
})` ${divStyle}`;

const FooterContainer = styled.div.attrs({
    className: "container"
})``;

const FooterText = styled.p.attrs({
    className: "text-center"
})``;

export {divStyle, FooterDiv, FooterInner, FooterContainer, FooterText}
