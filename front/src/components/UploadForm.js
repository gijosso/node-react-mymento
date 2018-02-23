import React from 'react';
import {store} from '../index'
import Error from './Error';
import Success from './Success';

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',name:'' ,imagePreviewUrl: '',visibility:'',country:'',city:'',success_msg:'',error_msg:''};
    }

    upload(e) {
        e.preventDefault();
        let that = this;
        let formData = new FormData();
        formData.append('photo', this.state.file);
        formData.append('visibility', this.state.visibility);
        formData.append('country', this.state.country);
        formData.append('city', this.state.city);
        formData.append('name', this.state.name);

        fetch(store.state.apiUrl + 'photo/new', {
            method: 'POST',
            headers: {
                'api-key': store.state.userUuid,
            },
            body: formData
        })
            .then((response) => {
                return (response.json());
            })
            .then(function (json) {
                if (json["error"] !== null) {
                    that.setState({error_msg: json["error"], success_msg: ''});
                }
                else {
                    that.setState({
                        error_msg: '',
                        success_msg: "Image successfully added"
                    });
                }
            })
            .catch((error) => {
                this.setState({error_msg: error.name});
            })
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    handleVis0Change(event) {
        this.setState({visibility: 0});
    }

    handleVis1Change(event) {
        this.setState({visibility: 1});
    }

    handlecountryChange(event) {
        this.setState({country: event.target.value});
    }

    handlecityChange(event) {
        this.setState({city: event.target.value});
    }

    handlenameChange(event) {
        this.setState({name: event.target.value});
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="preview-img" src={imagePreviewUrl} alt="preview"/>);
        } else {
            $imagePreview = (<div>Please select an Image for Preview</div>);
        }

        let message = '';

        if (this.state.error_msg !== '') {
            message = <Error error_msg={this.state.error_msg}/>
        }
        else if (this.state.success_msg !== '') {
            message = <Success success_msg={this.state.success_msg}/>
        }

        return (
            <div className="upload-section">
                <form className="default-form">
                    Name :<input type="text" className="form-input"
                                 onChange={(e)=>this.handlenameChange(e)}/><br/>
                    Visibility :
                    <div className="form-input-radio-container">
                                Private <input type="radio" className="form-input-radio" name="vis" value="0" onChange={(e)=>this.handleVis0Change(e)}/>
                                Public <input type="radio" className="form-input-radio" name="vis" value="1" onChange={(e)=>this.handleVis1Change(e)}/> <br/>
                    </div>
                    Country :<input type="text" className="form-input"
                                     onChange={(e)=>this.handlecountryChange(e)}/><br/>
                    City :<input type="text" className="form-input"
                                     onChange={(e)=>this.handlecityChange(e)}/><br/>
                    Photo :<input type="file" className="form-input form-input-upload" onChange={(e)=>this._handleImageChange(e)}/><br/>
                    <button className="confirm-btn" onClick={(e) => this.upload(e)}>Upload</button>
                </form>
                <div className="preview-arrow">></div>
                <div className="preview-img-container">
                    {$imagePreview}
                </div>
                {message}
            </div>
        );
    }
}
export default UploadForm

