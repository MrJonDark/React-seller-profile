import React, { Component } from 'react';

export class TableHeader extends Component {

    handle_sort = (path) => {
        const Sorting = { ...this.props.sort }

        if (Sorting.path == path) {

            Sorting.order = Sorting.order == 'asc' ? 'desc' : 'asc'
        } else {
            Sorting.path = path;
            Sorting.order = 'asc';

        }
        
        this.props.onSort(Sorting)
    }
    render() {
        const { headers } = this.props;

        return (<thead className="table-head">
            <tr>
                {headers.map((header, index) => <th key={index} style={{width:`${header.width}`}} onClick={() => this.handle_sort(header.path)} scope="col">{header.label}</th>)}

            </tr>
        </thead>);
    }
}

export default TableHeader;