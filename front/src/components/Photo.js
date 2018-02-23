import React from 'react';

class Photo extends React.Component {
    render() {
        return (
            <div className="photo-container">
                <div className="photo">
                    <img className="photo-img" src={this.props.link} alt="img"/>
                    <div className="photo-overlay">
                        <span className="photo-title">{this.props.name}</span>
                        <span className="photo-misc">1 ❤ 2 ♦</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default Photo
