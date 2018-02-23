import React from 'react';
import {store, history} from '../index';
import UploadForm from '../components/UploadForm';

export default class UploadPage extends React.Component {
    componentDidMount() {
        if (store.state.isLoggedIn === false)
            history.push('/')
    }

    render() {
        return (
            <div className="upload-page">
                <h3>Upload</h3>
                <UploadForm />
            </div>
        );
    }
}