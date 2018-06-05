import React, {Component} from 'react';
import {Col} from 'reactstrap';

class FeatureItem extends Component {
    render(){
        return(
            <Col>
                <h3 className="text-center">
                    <i className= {this.props.icon + " text-amzn-orange mb-3"}></i><br/>
                    {this.props.title}
                </h3>
                <p>{this.props.text}</p>
            </Col>
        );
    }
}

export default FeatureItem;