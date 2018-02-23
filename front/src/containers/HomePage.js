import React from 'react';
import {store, history} from '../index';
import Home from '../components/Home'

export default class HomePage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === false)
        history.push('/')
    }

    render() {
        return (
            <div className="upload-page">
                <h3>Welcome to MyMento</h3>
                <Home />
            </div>
        );
    }
}
