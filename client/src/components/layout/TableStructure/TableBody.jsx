import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash'
class TableBody extends Component {
    state = {}
    getCol = (item, header) => {
        if (header.image == 1) return <img src={_.get(item, header.path)} width='50%' alt="" />
        else if (header.content) return header.content(item);
        else if (header.path2) return _.get(item, header.path) + '/' + _.get(item, header.path2)
        return _.get(item, header.path)
    }
    render() {
        const { data, header, deleteShipping, editing } = this.props
        data.map(item => item.attributes.id = item.id)
        return (<tbody>
            {data.map((item,index) =>
                <tr key={index}>{header.map((head,index) => <td key={index}>{this.getCol(item.attributes, head)  ?? '-'} {this.getCol(item.attributes, head) ? head.PerNam : ''}</td>)}</tr>)}
        </tbody>);
    }
}

export default TableBody;