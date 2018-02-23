import React from 'react'
import {Link} from 'react-router';
import Favicon from 'react-favicon';
import {store, history} from '../index';
import Logout from './Logout';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', data: []};


    }

    handleChangetext(e) {

        let that = this;
        fetch(store.state.apiUrl + 'user/all').then((response) => {
            return (response.json());
        })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"]});
                }
                else {
                    that.setState({data: json["data"]});
                }
            })
            .catch((error) => {
                that.setState({error_msg: error.name});
            });
        this.setState({text: e.target.value});
    }

    gotouser(e) {
        this.setState({text: ''});
        history.push(e);
    }

    handleSubmit(e){
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.text !== '' && this.state.data[i].username.startsWith(this.state.text)) {
                let link = "/users/" + this.state.data[i].id;
                this.setState({text: ''});
                history.push(link);
                break;
            }
        }
    }


    render() {
        let links;
        let logo;

        let values = [];
        if (this.state.data.length > 0) {
            values = (this.state.data.map((data) => {
                if (this.state.text !== '' && data.username.startsWith(this.state.text)) {
                    let link = "/users/" + data.id;
                    return <div className="search-result-value"
                                onClick={(e) => this.gotouser(link)}>{data.username}<br/></div>
                }
            }));
            values = values.slice(0, 10);
        }
        if (store.state.isLoggedIn === true) {
            links = <ul className="nav-site nav-site-internal">
                {/*<li><Link to="/roadmap">Roadmap</Link></li>*/}
                <li><Link to="/album">Album</Link></li>
                <li><Link to="/photos">Photo</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <div className="vsep"/>
                <li><Logout /></li>
            </ul>;
            logo = <Link to="/home">
                <img className="nav-logo" src={require('../assets/mymento_alternatif.png')} alt="logo"/>
            </Link>
        }
        else {
            links = <ul className="nav-site nav-site-internal">
                <li><Link to="/login">Log In</Link></li>
                <div className="vsep"/>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>;
            logo = <Link to="/">
                <img className="nav-logo" src={require('../assets/mymento_alternatif.png')} alt="logo"/>
            </Link>
        }

        return <div><Favicon url={require('../assets/favicon.ico')}/>
            <div className="nav-main">
                {logo}
                <div className="search-content">
                    <form onSubmit={(e) =>  {e.preventDefault();this.handleSubmit(e)}} >
                        <input className="search-bar" type="text" value={this.state.text}
                               onChange={(e) => this.handleChangetext(e)}/>
                    </form>
                    <div className="search-result">{values}</div>
                </div>
                <div className="wrap">
                    <div className="wrap">
                        <div className="nav-lists">
                            {links}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default NavBar
