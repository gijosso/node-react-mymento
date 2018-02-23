import React from 'react';
import {store, history} from '../index';
import Photo from './Photo';

class AddPic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {photos: [], error_msg: undefined};
    }

    componentDidMount() {
        this.loadImages();
    }

    addPic(e){
        let that = this;
        fetch(store.state.apiUrl + 'album/addPic', {
            method: 'POST',
            headers: {
                'api-key': store.state.userUuid,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                link: e,
                albumid: that.props.params.id,
            })
        })
            .then((response) => {
                return (response.json());
            })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"]});
                }
                else {
                    history.push('/album/' + that.props.params.id);
                }
            })
            .catch((error) => {
                this.setState({error_msg: error.message});
            })
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
                return <div className="image-click" onClick={(e) => this.addPic(photo.link)}><Photo link={photo.link} name={photo.name}/></div>
            }))
        }
        else {
            images = <div>No photos yet ! You should upload a first one :)</div>
        }

        return (
            <div>
                {this.state.error_msg}
                <div className="gallery">
                {images}
                </div>
            </div>
        )
    }
}

export default AddPic
