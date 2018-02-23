import React from 'react';

class Success extends React.Component {
    render() {
        return (
            <div className="success">{this.props.success_msg}</div>
        )
    }
}

export default Success