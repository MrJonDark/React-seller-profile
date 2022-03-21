import React, { Component } from 'react';
class Alert extends Component {
    state = {}

    render() {

        let classStyle = 'alert';
        classStyle += this.props.styleAlert ?? '';
        return (<div className={classStyle} role="alert">
            {this.props.text}
        </div>
        );

    }
}

export default Alert;