import React, {Component} from 'react';

const ButtonStyle = {
    marginBottom: '0px',
    marginTop: '0.25em',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '1.42857',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundImage: 'none',
    padding: '6px 12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderImage: 'initial',
    borderRadius: '4px'
};

class StartButton extends Component {
    render() {
        return (
            <div className="no-left-padding">
                <a className="btn btn-primary pull-left btn-lg btn-block" style={ButtonStyle}>
                    {this.props.name}
                </a>
            </div>
        );
    }
}

export default StartButton;
