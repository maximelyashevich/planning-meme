import React, {Component} from 'react';
import {CardBlock, CardImg} from "../style/VotingAreaStyle";

class Card extends Component {

    constructor(props) {
        super(props);
    }

    changeActiveState = (e) => {
        let element = e.target;
        let header = document.getElementById("all_cards");
        let liImages = header.getElementsByClassName("cardImg");
        for (let i = 0; i < liImages.length; i++) {
            let currentImage = liImages[i].firstChild;
            currentImage.className = currentImage.className.replace("filterImg", "");
        }
        element.className += " filterImg";
    };

    render() {
        return (
            <CardBlock>
                <CardImg id={this.props.id} src={this.props.source} onClick={this.changeActiveState}
                         alt={this.props.desc} draggable="false"/>
            </CardBlock>
        );
    }
}

export default Card;
