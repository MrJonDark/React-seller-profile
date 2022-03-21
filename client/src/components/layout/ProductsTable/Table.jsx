import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH,faPen,faTrash } from "@fortawesome/free-solid-svg-icons";
import TableHeader from "../TableStructure/TableHeader";
import TableBody from "../TableStructure/TableBody";

export class ProductTable extends Component {
    state = {
        checked:'',
    };
   
    render() {
        const header = [
            { path: 'id', label: 'ID',width:'10%' },
            { path: 'image', label: 'Main Image', image: 1,width:'20%' },
            { path: 'name_en', label: 'Name',width:'20%'  },
            { path: 'price_cents', label: 'Price'  ,PerNam: 'LE',width:'20%' },
            { path: 'discount_price_cents', label: 'Discounted Price'  ,PerNam: 'LE',width:'15%' },
            { path: 'quantity', label: 'quantity' },
            {
                label: 'Status',width:'20%',  content: (product,index) => 
                
                   
                <label className="switch ">
                    <input type="checkbox" name={product.id}  onChange={(e)=> {this.props.changeStatus(product) ;  }}   checked={product.is_available}   />
                    <span className="slider round"></span>
                </label>
                
            
            },
            {
                label: 'Actions',width:'25%', content:
                    (product) => <div>
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
                            <a href={'/product/'+product.id} className="dropdown-item" type="button">
                            <FontAwesomeIcon style={{color:"#767676bd"}} icon={faPen}/>  Edit</a>
                                <hr className='p-0 m-0' />
                                <button type='button' onClick={()=>this.props.deleteProduct(product.id)} className="dropdown-item" type="button">
                                <FontAwesomeIcon style={{color:"#767676bd"}} icon={faTrash}/> Delete</button>
                        </div>
                    </div >
            },


        ];

        const { products, onSort, sort } = this.props;

        const indexValue = []
        for (var product in products[0]) {
            indexValue.push(product)
        }

        return (
            <table className="table table-hover table-striped">
                <TableHeader headers={header} onSort={onSort} sort={sort} />
                <TableBody data={products} header={header} />

            </table>
        );
    }
}

export default ProductTable;
