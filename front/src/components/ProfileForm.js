import React from 'react';
import {store} from '../index';
import Error from './Error';
import Success from './Success';


class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfpasswordChange = this.handleConfpasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.state = {
            username: this.props.username,
            password: '',
            confpassword: '',
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            error_msg: undefined,
            success_msg: undefined
        };
    }

    componentDidMount() {
        this.loadProfile();
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

    handleFirstnameChange(event) {
        this.setState({firstname: event.target.value});
    }

    handleLastnameChange(event) {
        this.setState({lastname: event.target.value});
    }

    loadProfile() {
        let that = this;
        fetch(store.state.apiUrl + 'user/', {
            headers: {
                'api-key': store.state.userUuid,
            }
        })
            .then((response) => {
                return (response.json());
            })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"]});
                }
                else {
                    that.setState({
                        username: json["data"][0]["username"],
                        firstname: json["data"][0]["firstname"],
                        lastname: json["data"][0]["lastname"],
                        success_msg: "Profile loaded"
                    });
                }
            })
            .catch((error) => {
                that.setState({error_msg: "Error while loading your profile"});
            });
    }

    updateProfile(e) {
        e.preventDefault();
        let that = this;

         fetch(store.state.apiUrl + 'user/update', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         //'Content-Type': 'multipart/form-data',
         //'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: JSON.stringify({
             username: that.state.username,
             password: that.state.password,
             confpassword: that.state.confpassword,
             firstname: that.state.firstname,
             lastname: that.state.lastname,
             id: store.state.userId
         })
         })
         .then((response) => {
         return (response.json());
         })
         .then(function (json) {
         if (json["error"] !== null)
         that.setState({error_msg: json["error"]});
         else {

         }
         })
         .catch((error) => {
         that.setState({error_msg: "An error occurred"});
         })
        this.setState({success_msg:"Successfully changed your profile information"});

    }

    render() {
        let message;

        if (this.state.error_msg !== undefined) {
            message = <Error error_msg={this.state.error_msg}/>
        }
        else if (this.state.success_msg !== undefined) {
            message = <Success success_msg={this.state.success_msg}/>
        }
        else {
            message = '';
        }

        return (
            <div className="center-content">
                <form className="default-form">
                    Username :<input type="text" className="form-input" value={this.state.username}
                                     onChange={this.handleUsernameChange}/><br/>
                    Password :<input type="password" className="form-input"
                                     onChange={this.handlePasswordChange}/><br/>
                    Confirm password :<input type="password" className="form-input"
                                             onChange={this.handleConfpasswordChange}/><br/>

                    Firstname :<input type="text" className="form-input" value={this.state.firstname}
                                      onChange={this.handleFirstnameChange}/><br/>
                    Lastname :<input type="text" className="form-input" value={this.state.lastname}
                                     onChange={this.handleLastnameChange}/><br/>
                    <button className="confirm-btn" onClick={(e) => this.updateProfile(e)}>Update</button>
                </form>
                {message}
            </div>
        );
    }
}

export default ProfileForm;
