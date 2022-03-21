import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faSignOutAlt,
    faTrash,
    faPlusCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { deleteStocks, getStocks, addStocks } from '../../service/stocks'
import Modal from './modales'
import Joi from 'joi-browser'

class Sizes extends Component {
    state = {
        disabled: true,
        stocks: [{
            size_id: '',
            quantity:2
        }],
        allStocks: [],
        stock:
        {
            attributes: {
                size: '', quantity: ''
            }
        },
        errors:{},
    }
    async componentDidMount() {
        try {
            const stocks =await this.props.stocks

            this.setState({
                allStocks: stocks.map(stock => stock)

            },()=>{

               
            })
        } catch (error) {

        }
    }
    
   
        
        schema_stocks = Joi.object().keys({
            size_id: Joi.string().required().label('Size'),
            quantity: Joi.number().required().label('Quantity')
        });
    changeValue = e => {
        const stock = { ...this.state.stock }
    
        const name = e.target.name;

        stock[name] = e.currentTarget.value
        this.setState({ stock });
    }
    add_items = () => {

        this.setState({ allStocks: [...this.state.allStocks, { attributes: { size: ' ', quantity: 0 }, edit: true, }] })

    }
    edit_items = (stock, index) => {
        this.setState({ stock })
        return <Modal stock={stock} />
    }

    delete_items = async (index) => {
        const deletedStock = this.state.allStocks.filter((stock, i) => i == index)
        const allStocks = this.state.allStocks.filter((stock, i) => i !== index)
       if(window.confirm('Are you sure?')){
        await deleteStocks(deletedStock[0].id)
        this.setState({ allStocks })
       }

    }
    changeValueStocks = (e, index) => {
        const allStocks = this.state.allStocks

        allStocks[index]['attributes'][e.target.name] = e.currentTarget.value
        this.setState({ allStocks });
    }
    
    saveStock = async (stock, index) => {
        const allStocks = this.state.allStocks
        let data = {size_id:stock.attributes.size_id,quantity:stock.attributes.quantity}
        const joi = Joi.validate(data, this.schema_stocks, { abortEarly: false })
        let errors = {}
        if(!joi.error){

            let errors = {}
            const allStock = stock
            allStocks[index].edit = false;
            const size = this.props.sizes.filter(size => size.id == stock.attributes.size_id)
    
            allStocks[index]['attributes']['size'] = size[0].attributes.name
            await addStocks({ stock }, this.props.product)
            this.setState({ allStocks: allStocks })
            this.setState({ errors: errors },()=>{
                document.getElementById('add_item').style.display='block'
            })

            return
        }
        
    
        for (let item of joi.error.details) errors[item.path[0]] = item.message
        this.setState({ errors: errors },()=>{
            document.getElementById('add_item').style.display='none'
        })
    }
    getstock=async (number,stock)=>{
       const allStocks=this.state.allStocks

       const updatedStocks=allStocks.filter((stock, index) => index != number)
    const editedStock={id:stock[2],type: "stock",attributes:{size_id:parseInt(stock[3]),size:stock[0],quantity:parseInt(stock[1])}}
    updatedStocks.push(editedStock)

       this.setState({ allStocks:Object.values(updatedStocks) })
    }
    render() {
        const { stocks, allStocks ,errors} = this.state;
        const { product, sizes, add_items } = this.props
        return (
            <React.Fragment>
                <h5 className='text-left m-4'>Stock Details</h5>

                {allStocks.length==0 ? <h5>There is no stocks in this product</h5>: allStocks.map((stock, index) =>
                    <div key={index} className="row p-3 align-items-center items_size_single ">
                        <div className="col-lg-2 col-md-2 col-12 mb-2">


                            {stock.edit == true ?

                                <select name="" id="" className="form-control"
                                    placeholder="size_id"
                                    onChange={(e, number) => this.changeValueStocks(e, index)}
                                    
                                    name="size_id">
                                    <option>Select size</option>
                                    {sizes.map(size => <option key={size.id} value={size.id}>{size.attributes.name}</option>)}
                                </select> :
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="size_id"
                                    name="size_id"
                                    value={stock.attributes.size}
                                    disabled
                                ></input>

                            }
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">

                            <input
                                type="text"
                                className="form-control "
                                placeholder="Quantity"
                                name="quantity"
                                value={stock.attributes.quantity}
                                onChange={(e, number) => this.changeValueStocks(e, index)}
                                disabled={stock.edit == true ? false : true}
                            ></input>
                        </div>
                        <Modal getstock={this.getstock} index={index} modal={'modal_' + index} title='Edit Stock' changeValue={this.changeValue} stock={stock} />
                        {stock.edit == true ? <button onClick={() => this.saveStock(stock, index)} className='input_main'>Create Stock</button> : <button className='edit_item btn' data-toggle="modal" data-target={'#modal_' + index} onClick={() => this.edit_items(stock, index)}><FontAwesomeIcon className='m-2' icon={faPen} /></button>}
                        <button type='button' className='remove_item btn' onClick={() => this.delete_items(index)}><FontAwesomeIcon className='m-2' icon={faTrash} /></button>

                    </div>

)}
{errors['size_id'] && <p className='text-danger col-12  mr-auto text-left'>{errors['size_id']}</p>}
{errors['quantity'] && <p className='text-danger col-12  mr-auto text-left'>{errors['quantity']}</p>}

                <button className='add_item' type='button' id='add_item' onClick={this.add_items}>+ Add More </button>
            </React.Fragment>
        );
    }
}

export default Sizes;