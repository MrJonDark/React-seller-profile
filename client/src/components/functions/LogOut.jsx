import React, { Component } from 'react';


export class LogOut extends Component {
    componentDidMount() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('data')
        window.location = '/'

    }
    render() {
        return null;
    }
}

export default LogOut;
