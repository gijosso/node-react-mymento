import React from 'react';
import {store, history} from '../index';
import Album from '../components/Album';

export default class AlbumPage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === false)
        history.push('/')
    }

    render() {
        return (
            <div className="upload-page">
                <h3>Albums</h3>
                <Album />
            </div>
        )
    }
}
