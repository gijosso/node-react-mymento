import React from 'react';
import {store, history} from '../index';
import ProfileForm from '../components/ProfileForm';

export default class ProfilePage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === false)
            history.push('/')
    }

    render() {
        return (
            <div>
                <h3>Modify your profile</h3>
                <ProfileForm />
            </div>
        );
    }
}