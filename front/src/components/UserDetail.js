import React from 'react';
import {store, history} from '../index';
import {Link} from 'react-router';


class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {val: ''};
        this.state = {albums: [], error_msg: undefined};
    }

    componentDidMount() {
        this.loadAlbums()
    }


    loadAlbums() {
        let that = this;
        fetch(store.state.apiUrl + 'album/user/' + this.props.params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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
            covers = <div>No album yet !</div>
        }



        return (
            <div>
                <div className="gallery">
                {covers}
                </div>
            </div>
        )
    }
}

export default UserDetail;