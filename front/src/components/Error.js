import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div className="error">{this.props.error_msg}</div>
        )
    }
}

export default Error