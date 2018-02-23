import React from 'react';
import {store, history} from '../index';


class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    handleDisconnect(e) {
        e.preventDefault();
        store.state.isLoggedIn = false;
        history.push('/');
    }

    render() {
        return (
            <button className="logout" onClick={e => this.handleDisconnect(e)}><img className="logout-logo" src={require('../assets/logout.png')} alt="logout"/></button>
        );
    }
}

export default Logout;