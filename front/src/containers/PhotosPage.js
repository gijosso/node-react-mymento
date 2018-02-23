import React from 'react';
import {store, history} from '../index';
import Gallery from '../components/Gallery';

export default class PhotosPage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === false)
        history.push('/')
    }

    render() {
        return (
            <div>
                <h3>Gallery</h3>
                <Gallery />
            </div>
        )
    }
}
