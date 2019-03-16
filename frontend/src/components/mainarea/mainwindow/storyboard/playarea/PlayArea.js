import React, {Component} from 'react';
import {CardsUl, PlayingArea} from "../style/VotingAreaStyle";
import Card from "./Card";
import MemberList from "../memberarea/MemberList";
import Timer from "./Timer";

const StartPlayStyle = {
    width: '100%',
    height: '10.5em',
    backgroundColor: 'transparent',
    boxShadow: 'rgba(1, 1, 1, 0.05) 0px 0px 5px 0px',
    margin: '8px',
    padding: '0.5em 1.5em 0.5em 1.5em',
    borderWidth: 'initial',
    borderStyle: 'none',
    borderColor: 'initial',
    borderImage: 'initial',
    borderRadius: '8px;'
};

class PlayArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ["resources/images/0_card.png", "resources/images/half_card.png", "resources/images/1_card.png",
                "resources/images/2_card.png", "resources/images/3_card.png", "resources/images/5_card.png",
                "resources/images/8_card.png", "resources/images/13_card.png",
                "resources/images/20_card.png", "resources/images/40_card.png", "resources/images/100_card.png",
                "resources/images/coffee_card.png", "resources/images/question_card.png"],
            values: ["0", "1/2", "1", "2", "3", "5", "8", "13", "20", "40", "100", "break", "no idea"]
        };
    }

    initializeDataMap() {
        let map = new Map();
        for (let i = 0; i < this.state.data.length; i++) {
            map.set(this.state.values[i], this.state.data[i]);
        }
        this.state.dataMap = map;
    }

    componentDidMount() {
        this.initializeDataMap();
        this.setState({
            cards: Array.from(this.state.dataMap.entries()).map((currentImgData, index) => {
                return <Card id={index} source={currentImgData[1]} desc={currentImgData[0]}/>
            })
        });
    }

    render() {
        return (
            <div className="col-md-12">
                <PlayingArea>
                    <CardsUl id="all_cards">
                        {this.state.cards}
                    </CardsUl>
                </PlayingArea>
                <div className="col-md-2 col-md-offset-1 text-center">
                    <div style={StartPlayStyle}>
                        <Timer {...this.props}/>
                    </div>
                    <MemberList/>
                </div>
            </div>
        );
    }
}

export default PlayArea;
