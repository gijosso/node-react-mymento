import React from 'react';
import {store, history} from '../index';
import {Link} from 'react-router';

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', albums: [], error_msg: undefined};
    }

    componentDidMount() {
        this.loadAlbums();
    }

    loadAlbums() {
        let that = this;
        fetch(store.state.apiUrl + 'album/user/' + store.state.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'api-key': store.state.userUuid,
            },
            credentials: 'same-origin',
        }).then((response) => {
            return (response.json());
        })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"]});
                }
                else {
                    that.setState({albums: json["data"]});
                }
            })
            .catch((error) => {
                that.setState({error_msg: error.name});
            });
    }

    createNew(e) {
        e.preventDefault();
        let that = this;

        fetch(store.state.apiUrl + 'album/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': store.state.userUuid,
            },
            body: JSON.stringify({
                id: store.state.userId,
                name: this.state.name
            })
        }).then((response) => {
            return (response.json());
        })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"]});
                }
                else {
                    that.setState({name:''});
                    that.loadAlbums();
                }
            })
            .catch((error) => {
                that.setState({error_msg: error.name});
            });
    }

    handlenameChange(e) {
        this.setState({name: e.target.value});
    }

    render() {
        let covers;

        if (this.state.albums.length > 0) {
            covers = (this.state.albums.map((album) => {
                //return <Photo link={photo.link}/>
                let link = "/album/" + album.id;
                return <div className="album-content">
                    <Link to={link}>
                        <img className="album-img" src="http://p7.storage.canalblog.com/77/06/115792/38539843.jpg"/>
                        <div className="album-overlay">
                            <h2 className="album-title"> {album.name} </h2>
                        </div>
                    </Link>
                </div>
            }))
        }
        else {
            covers = <div className="cheer">No album yet ! You should create a first one :)</div>
        }


        return (
            <div className="upload-section">
                <div className="album-section">
                        {covers}
                </div>
                <div>
                    <h3>Create a new album </h3>
                    <form className="default-form album-form">
                        Name :<input type="text" className="form-input"
                                     onChange={(e) => this.handlenameChange(e)}/><br/>
                        <button className="confirm-btn" onClick={(e) => this.createNew(e)}>Create a new album</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Album;
