import React from 'react';
import {store} from '../index';
import Photo from './Photo';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {photos: [], error_msg: undefined};
    }

    componentDidMount() {
        this.loadImages();
    }

    loadImages() {
        let that = this;
        fetch(store.state.apiUrl + 'user/photo/' + store.state.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
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
                    that.setState({photos: json["data"]});
                }
            })
            .catch((error) => {
                that.setState({error_msg: error.name});
            });
    }

    render() {
        let images;

        if (this.state.photos.length > 0) {
            images = (this.state.photos.map((photo) => {
                return <Photo link={photo.link} name={photo.name}/>
            }))
        }
        else {
            images = <div className="cheer">No photos yet ! You should upload a first one :)</div>
        }

        return (
            <div className="gallery">
                {images}
            </div>
        )
    }
}

export default Gallery