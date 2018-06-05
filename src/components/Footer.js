import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import {Container, Row, Col} from 'reactstrap';

class Footer extends Component {

    render(){
        return (
            <footer id="footer" className="footer">  
                <Container>
                    <Row>
                        <Col xs="9">
                            <h4 className="">About this web app</h4>
                            <p>
                                This very simple single page web application was built with {' '}
                                <Link to="https://reactjs.org/"><i className="fab fa-react"></i> React </Link> for {' '}
                                demonstration purposes during a talk about <a href="https://aws.amazon.com">AWS</a>. 
                            </p>
                        </Col>
                        <Col xs="3">
                            <h4 className="">Links</h4>
                            <ul className="list-unstyled">
                                <li> <NavLink to="/">Homepage</NavLink></li>
                                <li> <NavLink to="/comments">Comment page</NavLink></li>
                                <li> <a href="https://aws.amazon.com">AWS</a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-bottom">
                    <p>
                        Made with <span className="text-amzn-orange"><i className="fas fa-heart"></i></span> by {' '}
                        <span className="text-amzn-orange">Luigi Libero Lucio Starace</span>.
                    </p>
                </div>
            </footer>                               
        );
    }
}

export default Footer;