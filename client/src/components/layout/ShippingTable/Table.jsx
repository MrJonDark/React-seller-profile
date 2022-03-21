import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import TableHeader from "../TableStructure/TableHeader";
import TableBody from "../TableStructure/TableBody";

export class ShippingTable extends Component {
    state = {
        checked: '',
    };



    render() {
        const { shipping, onSort, sort, deleteShipping, editing } = this.props;

        const header = [
            { path: 'city_en', label: 'City' },
            { path: 'shipping_fee_cents', label: 'Fee' ,PerNam: 'LE' },
            { path: 'min_shipping_day', path2: 'max_shipping_day', PerNam: 'days', label: 'Duration' },
            { path: 'min_order_price_cents', label: 'Minimum Order', PerNam: 'LE' },
            {
                content:
                    (shipping) => <div>
                        <button
                            className="btn bg-transparent"
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button onClick={() => editing(shipping)} className="dropdown-item" type="button">
                                Edit</button>
                            <button onClick={() => deleteShipping(shipping.id)} className="dropdown-item" type="button">
                                Delete</button>

                        </div>
                    </div >
            },


        ];


        const indexValue = []


        return (
            <table className="table table-hover table-striped">
                <TableHeader headers={header} onSort={onSort} sort={sort} />
                <TableBody data={shipping} header={header} editing={editing} deleteShipping={deleteShipping} />

            </table>
        );
    }
}

export default ShippingTable;
