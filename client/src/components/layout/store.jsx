import React, { Component } from 'react';
import logo from '../../images/image_cropper_818C35D6-14B0-4042-8E77-7436E71C9D72-7478-0000053936F1CCC5.jpg'
import $ from 'jquery';
import images from "../../images/Image Placeholder.png";

import 'font-awesome/css/font-awesome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faSignOutAlt,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import Demo from '../functions/resizing_function';
import imageas from "../../images/App Store.png";
import coverPlaceHolder from "../../images/coverPlaceHolder.png";

import { getStore, editStoreInfo, updateLogo, updateCover ,changeState } from '../../service/sellers'
import auth from "../../service/users";
import jwtDecode from "jwt-decode";
import {SideBar} from "../shared/sidebar"
import cover from '../../images/image_cropper_9BFB4C0F-5A38-4A0A-A2FE-F236FF90FA5C-7463-0000053704C3EB80 (1).jpg'
import { async } from './../../service/shipping';
export class Store extends Component {
    state = {
        index: 0,
        image: imageas,
        edit:false,
        cover: '',
        logo: '',
        status: '',
        name: '',
        store_info: {
            descriptionEn: '',
            descriptionAr: '',
            phoneNumber: '',
            cashbackPercentage: '',
        },
        categories_en: '',
        categories_ar: '',
    }

    async componentDidMount() {

        try {
            const data  = await getStore();
            this.setState({
                logo: data.attributes.logo ??images,
                cover: data.attributes.cover ?? coverPlaceHolder,
                name: data.attributes.name,
                status: data.attributes.is_active,
                store_info: {
                    descriptionEn: data.attributes.description_en,
                    descriptionAr: data.attributes.description_ar,
                    phoneNumber: data.attributes.phone_number,
                    cashbackPercentage: data.attributes.cashback_percentage
                },
                categories_en: data.attributes.categories_en,
                categories_ar: data.attributes.categories_ar,
            })
        } catch (error) {

           // this.props.history.push('/logout')
        }



    }

    
    handle_edit = () => {
        this.setState({edit:! this.state.edit})
        if ($('.profile_store').attr('readOnly')) {
            $('.profile_store').removeAttr('readOnly');
            document.getElementById('button_save').setAttribute('type', 'submit')

        } else {
            $('.profile_store').attr('readOnly', 'readOnly')
            document.getElementById('button_save').setAttribute('type', 'hidden')
        }
        $('.profile_store').toggleClass('edit')
    }
    handle_logo = (e,title) => {
        const url = URL.createObjectURL(e.target.files[0]);
       // if (e.target.files[0].size > 102400) {
       //     alert("Image too big (max 100kb)");
        //    return false;
      //  }
        this.setState({ image: url, index: 0,size:1/1 , title:title })
        document.getElementById('upload_logo').click()
        e.target.value = '';
        
    }
    get_image = async (src, selected_image, index) => {
        let store = { ...this.state.store }
        const oldcover = this.state.cover
        const oldlogo = this.state.logo
        if (index == 0) {
            try {
                await updateLogo(src)
                this.setState({ logo: src })
            } catch (error) {
                this.setState({ logo: oldlogo })
            }



        }
        if (index == 1) {
            try {
                await updateCover(src)
                this.setState({ cover: src })
            } catch (error) {
                this.setState({ cover: oldcover })

            }
        }



    }
    handle_cover = (e,title) => {
        const url = URL.createObjectURL(e.target.files[0]);
       // if (e.target.files[0].size > 204800) {
         //   alert("Image too big (max 200kb)");
            
         //   return false;
       // }
        this.setState({ image: url, index: 1 ,size:18/5 , title:title})
        document.getElementById('upload_logo').click()
        e.target.value = '';
        
    }
    changeValueInfo = e => {
        const store_info = { ...this.state.store_info }
        const name = e.target.name;

        store_info[name] = e.currentTarget.value
        this.setState({ store_info });
    }
    submitStoreInfo = e => {
        e.preventDefault();
        const store_info = this.state.store_info
        this.setState({ store_info })
        editStoreInfo({ store_info })
        this.handle_edit();
     
    }
    statesChange = async (e)=>{
        
        this.setState({status:!this.state.status})
            await changeState(!this.state.status)
            return <SideBar status={!this.state.status} />
            
    }

    render() {
        let checking = ''
        if (this.state.status == false) checking = 'checked'
        return (
            <section className='mt-5'>
                <div className="card m-auto mb-5 overflow-hidden  w-75 card_background" >
                    <a onClick={() => { document.getElementById('cover').click(); }}><FontAwesomeIcon icon={faPen}  className='edit_icon_cover' /></a>
                    <input type="file" className='d-none' id="cover" name="file" onChange={(e) => this.handle_cover(e,'Upload cover')} />

                    <div className='card-body p-0 w-100 m-auto'>
                        <img className="w-100" style={{maxHeight: '325px'}} src={this.state.cover} alt="Card image cap"></img>


                        <span><i className="fas fa-pencil-alt "></i></span>
                        <div className='row align-items-center pb-0  pt-4 pr-lg-4 m-auto pl-lg-4 justify-content-between w-100'>
                            <div className='row col-lg-6 col-12 m-auto  align-items-center position-relative'>
                                <div className='col-lg-6 col-12' style={{ position: 'relative'}}>
                                    <img className='rounded-circle logo-store'  style={{  width: '80%', boxShadow: ' 0px 0px 15px -7px',marginTop: '-68px' }} src={this.state.logo} alt="" />
                                    <a  onClick={() => { document.getElementById('logo').click(); }}><FontAwesomeIcon icon={faPen} style={{right: '28%'}}  className='edit_icon_logo' /></a>
                                    <input type="file" className='d-none' id="logo" name="file" onChange={(e) => this.handle_logo(e , 'Upload logo')} />
                                </div>
                                <div className='text-lg-left text-center col-lg-6 col-12 m-auto'>
                                    <h1>{this.state.name}</h1>
                                    <p>{this.state.categories_en}</p>
                                </div>
                            </div>
                            <div className='d-flex col-lg-6 col-12  justify-content-end '>
                                <div className='toggle-status'>

                                    <label className="switch p-2 mt-5">
                                        <input type="checkbox" onChange={(e) =>this.statesChange(e)}  checked={this.state.status == true && 'checked'}></input>
                                        <span className="slider round"></span>

                                    </label>
                                </div>
                              {this.state.status == true ?  <div className='mt-auto'>
                                 <p><span className='activedot'>.</span> Active</p>
                                </div> : <div className='mt-auto'>
                                 <p>inactive</p>
                                </div>}
                            </div>
                        </div>


                    </div>

                </div>

                <div className="card ml-auto mr-auto mt-4 p-4  w-75  card_background" >
                    <a  onClick={this.handle_edit}><FontAwesomeIcon  icon={this.state.edit == false ? faPen : faTimesCircle} className='edit_icon_cover' /></a>
                    <div className='text-left p-5'>
                        <form action="" onSubmit={this.submitStoreInfo}>                        <div className="form-group">
                            <label htmlFor="edescription"><h5>English Description</h5></label>
                            <input type="text" onChange={this.changeValueInfo} className="form-control border-0 profile_store  bg-white" id="exampleInputEmail1" readOnly defaultValue={this.state.store_info.descriptionEn} name='descriptionEn' ></input>
                        </div>

                            <div className="form-group">
                                <label htmlFor="ardescription"><h5>Arabic Description</h5></label>
                                <input type="text" onChange={this.changeValueInfo} className="form-control border-0  profile_store bg-white" id="exampleInputPassword1" readOnly defaultValue={this.state.store_info.descriptionAr} name='descriptionAr'></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1"><h5>Phone Number</h5></label>
                                <input type="text" onChange={this.changeValueInfo} className="form-control  border-0  profile_store bg-white" id="exampleInputPassword1" readOnly defaultValue={this.state.store_info.phoneNumber} name='phoneNumber'></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1"><h5>Cashback Amount</h5></label>
                                <input type="text" onChange={this.changeValueInfo} className="form-control border-0 profile_store bg-white" id="exampleInputPassword1" readOnly defaultValue={this.state.store_info.cashbackPercentage} name='cashbackPercentage'></input>
                            </div>

                            <input type='hidden' value='Update Store' id='button_save' className=' btn btn-success buttons_admin'></input>
                        </form>

                    </div>
                </div>

                <div className="row p-4 w-75 m-auto">
                    <div className="col-md-3 col-lg-3 col-xl-3 col-12">
                        <button onClick={()=>{window.location='/logout'}} className='signout_btn'><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button>

                    </div>
                </div>

                <input type="button" className="d-none" id='upload_logo' data-toggle="modal" data-target="#exampleModalCenter"></input>

                <Demo url={this.state.image} size={this.state.size} title={this.state.title} index={this.state.index} handle_close={this.get_image} />

            </section >
        );
    }
}

export default Store;