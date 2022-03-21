import React, { Component } from 'react';
import {
    getCities,
    getShipping,
    deleteShipping,
    createShipping,
    editShipping
} from '../../service/shipping';
import { ShippingTable } from './ShippingTable/Table';
import 'font-awesome/css/font-awesome.css';
import Joi from 'joi-browser'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faSignOutAlt,
    faTrash,
    faPlusCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
class Shipping extends Component {
    state = {
        errors: {},
        editedShipping: [],
        shipping: [],
        pageSize: 5,
        currentPage: 1,
        cities: [],
        Sorting: {
            path: 'title',
            order: 'asc'
        },
        shippingInputs: {
            cityId: '',
            shippingFee: '',
            minShippingDay: '',
            maxShippingDay: '',
            minOrderPriceCents: '',
        }
    };
    schema_shipping = {
            cityId:Joi.number().required().label('City'),
            shippingFee: Joi.number().required().label('Shipping'),
            minShippingDay: Joi.number().required().label('Min shipping day'),
            maxShippingDay: Joi.number().required().label('Max shipping day'),
            minOrderPriceCents: Joi.optional(),
            id: Joi.optional(),

      }
    async componentDidMount() {
        this.setState({ shipping: await getShipping() })
        this.setState({ cities: await getCities() })


    }
    handlePaginate = (page) => {
        this.setState({ currentPage: page });
    };
    groupSelect = (list) => {
        this.setState({ selectedList: list });
        this.setState({ currentPage: 1 });

    };
    handleSort = (Sorting) => {

        this.setState({ Sorting })
    }
    changeValue = e => {
        const shippingInputs = { ...this.state.shippingInputs }
        const name = e.target.name;

        shippingInputs[name] = e.currentTarget.value
        this.setState({ shippingInputs });
    }
    handle_submit = async e => {
        e.preventDefault();
        let shippingInputs = { ...this.state.shippingInputs }



        const joi = Joi.validate(shippingInputs, this.schema_shipping, { abortEarly: false })
        if (!joi.error) {
            if (shippingInputs.id) {
               

                try {
                    await editShipping({ shippingInputs })
                    const newShipping = await getShipping();
                   
                    this.setState({
                        shipping: newShipping, shippingInputs: {
                            cityId: 'select',
                            shippingFee: '',
                            minShippingDay: '',
                            maxShippingDay: '',
                            minOrderPriceCents: '',
                        }
                    })
                    document.getElementById('cityId').value = 'select'
                    
                } catch (error) {

                    
                }
                
            }
            else {
                try {
                    await createShipping({ shippingInputs })
            const newShipping = await getShipping();
            
            this.setState({
                shipping: newShipping,
                shippingInputs: {
                    cityId: 'select',
                    shippingFee: '',
                    minShippingDay: '',
                    maxShippingDay: '',
                    minOrderPriceCents: '',
                }
            })
            document.getElementById('cityId').value = 'select'

        } catch (error) {


        }
        
    }
    return
             
             
        }
             const errors = {}
    
             for (let item of joi.error.details) errors[item.path[0]] = item.message
             this.setState({ errors: errors },()=>{
             })


    }
    CancelEdit = async () => {
        this.setState({
            shipping: await getShipping(), shippingInputs: {
                cityId: 'select',
                shippingFee: '',
                minShippingDay: '',
                maxShippingDay: '',
                minOrderPriceCents: '',
            }
        })
        document.getElementById('cityId').value = 'select'
    }
    deleteShipping = async (item_id) => {
        if(window.confirm('Are you sure?')){
            this.setState({ errors: {} })
                try {
            await deleteShipping(item_id);
            const shipping = this.state.shipping
            const newShipping = shipping.filter(item => item.id !== item_id)
            this.setState({ shipping: newShipping })
        } catch (error) {

        }
        }
    }

    editing = async (item) => {
        this.setState({ errors: {} })

        var shipping = this.state.shipping
        document.getElementById('shippingForm').classList.remove('alertForm')

        if (this.state.editedShipping.length < 1) this.setState({ editedShipping: shipping })

        if (this.state.shippingInputs.id) {

            this.setState({ shipping: this.state.editedShipping })
            shipping = this.state.editedShipping
        }
        const newShipping = shipping.filter(ship => ship.id !== item.id)
        this.setState({
            shipping: newShipping, shippingInputs: {
                cityId: item.city_id,
                shippingFee: item.shipping_fee_cents,
                minShippingDay: item.min_shipping_day,
                maxShippingDay: item.max_shipping_day,
                minOrderPriceCents: item.min_order_price_cents,
                id: item.id
            }
        })
        document.getElementById('cityId').value = item.city_id
        //  document.getElementById('shippingForm').className += ' alertForm'
        document.getElementById('shippingForm').classList.add('alertForm')
        setTimeout(function () {
            document.getElementById('shippingForm').classList.remove('alertForm')

        }, 1000);

    }
    render() {
        const { shippingInputs, shipping, Sorting, cities,errors } = this.state
        return (
            <section className='w-75 ml-auto mr-auto mt-4 p-4 '>
            <h2 className=' text-left font-weight-bold'>Shipping</h2>

            <div className="card ml-auto mr-auto mt-4 p-4  w-100  card_background">
            <div className="table-responsive">

                {shipping ? <ShippingTable deleteShipping={this.deleteShipping} editing={this.editing} shipping={shipping} sort={Sorting} onSort={this.handleSort} /> : <h2>Shipping Information are not available, Create Now</h2>}
               </div>
                <hr />
                <div>
               
                    <form onSubmit={this.handle_submit} method='POST' className='form-row align-items-center' id='shippingForm'>
                        {shippingInputs.id && <input type='hidden' name='id' value={shippingInputs.id} />}
                        <div className="form-group mb-1 col-md-3 ">
                            <select disabled={shippingInputs.id && 'disabled'} className="form-control  w-75" onChange={this.changeValue} name="cityId" id="cityId">
                                <option value='select'>Select City</option>
                                {cities.map(city => <option key={city.id} value={city.id}>{city.attributes.name_en}</option>)}
                            </select>
                        </div>
                        <div className="form-group mb-1 col-md-2">
                            <input className="form-control  " onChange={this.changeValue} value={shippingInputs.shippingFee} name='shippingFee' type="text" placeholder='Fee' />
                        </div>

                        <div className="form-group mb-1 d-flex align-items-center col-md-3">
                            <input className="form-control mr-2 " onChange={this.changeValue} value={shippingInputs.minShippingDay} max={shippingInputs.maxShippingDay} name='minShippingDay' type="number" placeholder='Day' />
                            <strong>-</strong>
                            <input className="form-control ml-2 " onChange={this.changeValue} value={shippingInputs.maxShippingDay} min={shippingInputs.minShippingDay} name='maxShippingDay' type="number" placeholder='Day' />

                        </div>

                        <div className="form-group mb-1 col-md-2">
                            <input onChange={this.changeValue} value={shippingInputs.minOrderPriceCents} name='minOrderPriceCents' className="form-control textarea-shipping "  type="text" placeholder='Minimum Order' />
                        </div>
                        <div className="form-group d-flex mb-1 col-md-2">
                            <button type="submit" className="list-group-item border-0 text-success font-weight-bold" style={{ background: 'unset' }}>{shippingInputs.id ? 'Save' : 'Add City'}</button>
                            {shippingInputs.id && <button type="button" onClick={this.CancelEdit} className="list-group-item border-0 text-alert font-weight-bold" title='Cancel' style={{ background: 'unset' }}><FontAwesomeIcon icon={faTrash} /></button>}

                        </div>
                    </form>
                    <br />
                    {errors['cityId'] && <p className='text-danger col-12  mr-auto text-center'>{errors['cityId']}</p>}
                {errors['shippingFee'] && <p className='text-danger col-12  mr-auto text-center'>{errors['shippingFee']}</p>}
                {errors['minShippingDay'] && <p className='text-danger col-12  mr-auto text-center'>{errors['minShippingDay']}</p>}
                {errors['maxShippingDay'] && <p className='text-danger col-12  mr-auto text-center'>{errors['maxShippingDay']}</p>}

                </div>

            </div>
            </section>
        );
    }
}

export default Shipping;