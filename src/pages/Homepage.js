import React, {Component} from 'react';

import LocationGoogleMaps from 'components/LocationGoogleMaps';
import $ from 'jquery'; 

import Hero from 'components/Hero';
import Features from 'components/Features';
import FeatureItem from 'components/FeatureItem';

class Homepage extends Component {
    render(){
        return (
            <div id="homepage-container">
                <section className="jumbotron">
                    <Hero/>
                </section>
                <section id="features" className="mt-3">
                    <Features>
                        <FeatureItem icon="far fa-smile fa-5x" title="Fun" text="We promise you won't get bored during our two-hour long talk!"/>
                        <FeatureItem icon= "fas fa-code fa-5x" title= "Practical" text= "We'll have multiple demos!"/>
                        <FeatureItem icon= "fab fa-aws fa-5x" title= "Useful" text= "Cloud computing is a fast-growing business and AWS is the undisputed market leader."/>
                    </Features>
                </section>
                <section id="info" className="mt-3">
                    <LocationGoogleMaps/>
                </section>
            </div>
        );
    }

    componentDidMount(){
        $('#learnMoreButton').click( function(){
            $('html, body').animate({scrollTop:$('#features').position().top}, 'slow');
        });
    }

}

export default Homepage;