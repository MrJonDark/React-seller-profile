import React, { Component } from "react";
import ReactDOM from "react-dom";
import { NavLink } from 'react-router-dom';
import auth from '../../service/users';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp,faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';
import { Product } from './../layout/product';
import { getStore } from '../../service/sellers'
import images from "../../images/Image Placeholder.png";

import { Store } from './../layout/store';
export class SideBar extends Component {
  state={
    storeName:'',
    storeImg:'',
    storeStatus:false,
    dropdown:false,
  }
  
 async  componentDidMount(){
    const data=await getStore();
    try {
      this.setState({storeName:auth.getSeller().name,
        storeImg:data.attributes.logo,
        storeStatus:data.attributes.is_active,
      id: auth.getSeller().id},()=>{
      })
      
    } catch (error) {
    }
  }
  componentDidUpdate(){
    this.props.isOpen == false ? this.closeNav():this.openNav()
  }
  openNav = () => {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
  }
  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  dropDown=()=>{
    this.setState({dropdown:!this.state.dropdown})
  }
  render() {
    let user = sessionStorage.getItem('token');
    let Store =auth.getData().seller;
    return (
      
      <React.Fragment>

        <div id="mySidenav" className="sidenav">
          <div className='head row'>
         <div className="col-4"> <img src={this.state.storeImg ?? images} className={this.state.storeStatus == true ?'logoSidebarActive logoSidebar': 'logoSidebar logoSidebarInactive'} width='50%' alt="" /></div>
  <div className="col-7 text-left">
     <span className='storeName'> {this.state.storeName} </span><br /> 
      {this.state.storeStatus == true ? <span><span className='activedot'>. </span><small>  Active</small></span> : <span> <small> Inactive</small></span>}
  </div>           
          </div>
          <NavLink className={window.location.href == window.location.origin+'/store' ? 'font-weight-bold hovered' :''} to="/store">My Store</NavLink>
          {Store &&  <a href='#' onClick={this.dropDown} className="dropdown-btn">Products 
       <FontAwesomeIcon style={{margin:'0 -2.5rem 0 2rem'}} icon={this.state.dropdown ? faCaretUp:faCaretDown}/>
         </a>}
      <div className="dropdown-container" style={{display:this.state.dropdown?'block':'none'}}>
        <NavLink className={window.location.href == window.location.origin+'/products' ? 'font-weight-bold hovered':''}style={{paddingLeft:'41px'}} to="/products"><small>Manage Products</small></NavLink>
        <a className={window.location.href == window.location.origin+'/product' ? 'font-weight-bold hovered':''}style={{paddingLeft:'15px'}} href="/product"><small>Add Product</small></a>
      </div>
          {!user && <NavLink to="/sign">Login</NavLink>}

          {!Store && <NavLink className={window.location.href == window.location.origin+'/create_store' ? 'font-weight-bold hovered' :''} to="/create_store">Create Market</NavLink>}
          {Store &&   <NavLink className={window.location.href == window.location.origin+'/shipping' ? 'font-weight-bold hovered' :''} to="/shipping">Shipping</NavLink>}
          {user && <NavLink to="/logout">Log out</NavLink>}

     
        </div>


      </React.Fragment>

    );


  }
}