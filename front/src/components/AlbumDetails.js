import React from 'react';
import {store, history} from '../index';
import Photo from './Photo';
import Navbar from "./Navbar";
import Footer from "./Footer";


class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {val: ''};
        this.state = {photos: [], error_msg: undefined, logged: false};
    }

    componentDidMount() {
        let that = this;
        fetch(store.state.apiUrl + 'album/' + this.props.params.id, {
            method: 'GET',
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

                if (json['message'] === 'logged')
                    that.setState({photos: json["data"], logged: true});
                else
                    that.setState({photos: json["data"]});

            })
            .catch((error) => {
                that.setState({val: "Error while loading your profile"});
            });
    }

    addPic(e) {
        history.push('/addpic/' + this.props.params.id);
    }

    render() {

        let images;

        if (this.state.photos.length > 0) {
            images = (this.state.photos.map((photo) => {
                if (this.state.logged || photo.visibility === 1)
                    return <Photo link={photo.link} name={photo.name}/>
            }))
        }
        else {
            images = <div className="cheer">No photos yet ! You should upload a first one :)</div>
        }

        let button;
        if (this.state.logged)
            button = <button className="confirm-btn" onClick={(e) => this.addPic(e)}>addPic</button>;

        return (
            <div>
                <div>
                    <h3>Album</h3>
                    <div className="gallery">
                        {images}
                    </div>
                    {button}
                </div>
            </div>
        );
    }
}

export default AlbumDetails;