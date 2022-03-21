import React, { Component } from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom'
export class Pagination extends Component {
    state = {
        PageNumber: [],
    }
    UpdateNumberOfNextPage = (currentPage, allpage) => {
        if (this.state.PageNumber.find(p => p == allpage.length)) {
            return
        }
        if (this.state.PageNumber[this.state.PageNumber.length - 1] == currentPage) {
            this.setState({ PageNumber: _.slice(allpage, currentPage, currentPage + 4) })

        }
        //  this.setState({ PageNumber: _.slice(allpage, currentPage, currentPage + 4) })

    }

    UpdateNumberOfPreviousPage = (currentPage, allpage) => {
        if (currentPage < 5) { this.setState({ PageNumber: _.slice(allpage, 0, 4) }) }
        else if (this.state.PageNumber[0] == currentPage) {
            this.setState({ PageNumber: _.slice(allpage, Math.abs(currentPage - 4), currentPage) })
        }
    }
    componentDidMount() {
        const { pageSize, products_count } = this.props;
        const pageCount = Math.ceil(products_count / pageSize)
        const pages = _.range(1, pageCount + 1)
        this.setState({ PageNumber: _.slice(pages, 0, 4) })
        // this.setState({ PageNumber: pages })
    }
    componentWillReceiveProps(props) {
        const { currentPage, pageSize, products_count } = props;
        const pageCount = Math.ceil(products_count / pageSize)
        const pages = _.range(1, pageCount + 1)
        if (this.state.PageNumber[0] == currentPage) {
            this.setState({ PageNumber: _.slice(pages, currentPage - 1, currentPage + 3) })
        } else if (currentPage == 1) {
            this.setState({ PageNumber: _.slice(pages, 0, 4) })

        }
    }

    render() {
        const { currentPage, handlePaginat, pageSize, products_count } = this.props;
        const pageCount = Math.ceil(products_count / pageSize)
        const pages = _.range(1, pageCount + 1)
        const { PageNumber } = this.state
        return (<nav aria-label="Page navigation example">
            <ul className="pagination float-right">
                <li className="page-item">
                    {PageNumber[0] == 1 ? "" : <a className="page-link" href="#" aria-label="Previous" onClick={() => { if (currentPage !== 1) handlePaginat(currentPage - 1); this.UpdateNumberOfPreviousPage(currentPage, pages) }}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>}
                </li>
                {PageNumber.map(page => <li key={page} className={page == currentPage ? "page-item active" : "page-item"}><a className="page-link " onClick={() => { handlePaginat(page); }}>{page}</a></li>)}
                <li className="page-item">
                    {PageNumber[PageNumber.length - 1] == pages[pages.length - 1] ? '' : <a className="page-link" href="#" aria-label="Next" onClick={() => { if (currentPage < pageCount) handlePaginat(currentPage + 1); this.UpdateNumberOfNextPage(currentPage, pages) }}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>}

                </li>
            </ul>
        </nav>
        )
    }
}

