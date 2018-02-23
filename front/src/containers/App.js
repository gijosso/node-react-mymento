import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {resetErrorMessage} from '../actions'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Link} from 'react-router'
import {store} from '../index'
import p1 from '../assets/pexels-photo.jpg'
import p2 from '../assets/pexels-photo-59519.jpg'
import p3 from '../assets/pexels-photo2.jpg'
import p4 from '../assets/pexels-photo-126313.jpg'
import p5 from '../assets/pexels-photo-185933.jpg'
import p6 from '../assets/pexels-photo-196464.jpg'
import p0 from '../assets/pexels-photo-386009.jpg'

class App extends Component {
    static propTypes = {
        // Injected by React Redux
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,
        inputValue: PropTypes.string.isRequired,
        // Injected by React Router
        children: PropTypes.node
    };

    handleDismissClick = e => {
        this.props.resetErrorMessage();
        e.preventDefault()
    };

    handleChange = nextValue => {
        browserHistory.push(`/${nextValue}`)
    };

    renderErrorMessage() {
        const {errorMessage} = this.props;
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{backgroundColor: '#e99', padding: 10}}>
                <b>{errorMessage}</b>
                {' '}
                <button onClick={this.handleDismissClick}>
                    Dismiss
                </button>
            </p>
        )
    }

    render() {
        let backgrd;
        let rnd = Math.floor(Math.random() * 20) % 7;
        switch (rnd) {
            case 1:
                backgrd = p1;
                break;
            case 2:
                backgrd = p2;
                break;
            case 3:
                backgrd = p3;
                break;
            case 4:
                backgrd = p4;
                break;
            case 5:
                backgrd = p5;
                break;
            case 6:
                backgrd = p6;
                break;
            case 0:
                backgrd = p0;
                break;
            default:
                backgrd = p2;
                break;
        }

        const {children} = this.props;

        const divStyle = {
            backgroundImage: 'url(' + backgrd + ')',
        };

        return (
            <div>
                <img src={p1} className="preload-img"/>
                <img src={p2} className="preload-img"/>
                <img src={p3} className="preload-img"/>
                <img src={p4} className="preload-img"/>
                <img src={p5} className="preload-img"/>
                <img src={p6} className="preload-img"/>
                <img src={p0} className="preload-img"/>
                <div style={ divStyle } className="background-photo"/>
                <Navbar />
                <div className="page">
                    {this.renderErrorMessage()}
                    {children}
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
});

export default connect(mapStateToProps, {
    resetErrorMessage
})(App)
