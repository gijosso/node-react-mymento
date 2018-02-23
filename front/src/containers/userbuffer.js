import React from 'react';
import {store, history} from '../index';

export default class UserBuffer extends React.Component {
    componentDidMount() {
        history.push('/user/'+ this.props.params.id);
    }
    render(){
        return (<div>tmp</div>);
    }
}
