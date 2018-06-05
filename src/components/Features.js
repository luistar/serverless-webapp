import React, {Component} from 'react';

import {Container, Row} from 'reactstrap';

class Features extends Component {
    render(){
        return(
            <Container>
                <h2 className="text-center mb-5">Get to know Amazon Web Services with our talk</h2>
                <Row>
                    {this.props.children}
                </Row>
            </Container>
        );
    }
}

export default Features;