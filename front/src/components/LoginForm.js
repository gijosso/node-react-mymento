import React from 'react';
import Error from './Error';
import {store, history} from '../index';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {username:'', password: '', error_msg: undefined};
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    logIn(e) {
        e.preventDefault();
        let that = this;

        fetch(store.state.apiUrl + 'user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: that.state.username,
                password: that.state.password,
            })
        })
            .then((response) => {
                return (response.json());
            })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["message"]});
                }
                else {
                    store.state.isLoggedIn = true;
                    store.state.userId = json["data"][0]["id"];
                    store.state.userUuid = json["data"][0]["uuid"];
                    history.push('/home');
                }
            })
            .catch((error) => {
                this.setState({error_msg: "Can't reach server"});
            })
    }

    render() {
        let error;

        if (this.state.error_msg !== undefined) {
            error = <Error error_msg={this.state.error_msg}/>;
        }
        else {
            error = '';
        }

        return (
            <div className="center-content">
                <form className="default-form">
                    Username :<input type="text" className="form-input"
                                     onChange={this.handleUsernameChange}/><br/>
                    Password :<input type="password" className="form-input"
                                     onChange={this.handlePasswordChange}/><br/>
                    <button className="confirm-btn" onClick={(e) => this.logIn(e)}>Log In</button>
                </form>
                {error}
            </div>
        );
    }
}

export default LoginForm;