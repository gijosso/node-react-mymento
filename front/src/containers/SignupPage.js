import React from 'react';
import SignupForm from '../components/SignupForm';
import {store, history} from '../index';

export default class SignupPage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === true)
            history.push('/home')
    }

    render() {
        return (
            <div>
                <h3>Sign up</h3>
                <SignupForm />
            </div>
        );
    }
}