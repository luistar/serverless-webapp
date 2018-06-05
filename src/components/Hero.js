import React, {Component} from 'react';

import {Container} from 'reactstrap';

class Hero extends Component {
    render(){
        return(
            <Container>
                <h1 className="display-4">Eeew! What do you mean you don't know AWS?</h1>
                <p className="lead">Don't worry, we've got you covered!</p>
                <BlinkingText><i className="fas fa-child"></i> NOW 100% MORE SERVERLESS! <i className="fas fa-child"></i></BlinkingText>
                <p className="lead">
                    <button className="btn btn-amzn-blue btn-lg pull-right" id="learnMoreButton">Learn more</button>
                </p>
            </Container>
        );
    }
}

class BlinkingText extends Component {

    componentDidMount() {
        const blinkingElement = document.getElementById('fancy-message');
        setInterval(function() {
            blinkingElement.style.opacity = (blinkingElement.style.opacity === '0' ? '100' : '0');
        }, 1000);
    }

    render(){
        return(
            <p id="fancy-message" className="fancy-text lead">
                {this.props.children}
            </p>
        );
    }
}

export default Hero;