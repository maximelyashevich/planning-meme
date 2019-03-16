import React, {Component} from 'react';
import {FooterContainer, FooterDiv, FooterInner, FooterText} from "./style/FooterStyle";

class Footer extends Component {
    render() {
        return (
            <FooterDiv>
                <FooterInner>
                    <FooterContainer>
                        <FooterText>
                            <small>Planning Meme &copy; 2018</small>
                        </FooterText>
                    </FooterContainer>
                </FooterInner>
            </FooterDiv>
        );
    }
}

export default Footer;
