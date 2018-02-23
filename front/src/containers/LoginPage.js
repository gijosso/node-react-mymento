import React from 'react';
import LoginForm from '../components/LoginForm';
import {store, history} from '../index';

export default class LoginPage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === true)
            history.push('/home')
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <LoginForm />
            </div>
        );
    }
}