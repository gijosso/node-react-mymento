import React from 'react';
import {store, history} from '../index';
import Error from './Error';


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfpasswordChange = this.handleConfpasswordChange.bind(this);
        this.state = {username:'', password: '', error_msg: undefined};
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleConfpasswordChange(event) {
        this.setState({confpassword: event.target.value});
    }

    signUp(e) {
        e.preventDefault();
        let that = this;

        fetch(store.state.apiUrl + 'user/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: that.state.username,
                password: that.state.password,
                confpassword: that.state.confpassword
            })
        })
            .then((response) => {
                return (response.json());
            })
            .then(function (json) {
                if (json["error"] !== null)
                    this.setState({error_msg: json["error"]});
                else {
                    history.push('/login');
                }
            })
            .catch((error) => {
                this.setState({username: '', password : '', confpassword: '', error_msg: error.name});
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
                    Confirm password :<input type="password" className="form-input"
                                     onChange={this.handleConfpasswordChange}/><br/>
                    <button className="confirm-btn" onClick={(e) => this.signUp(e)}>Sign Up</button>
                </form>
                {error}
            </div>
        );
    }
}

export default SignupForm;