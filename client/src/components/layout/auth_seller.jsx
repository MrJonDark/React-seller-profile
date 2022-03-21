import React, { Component } from "react";
import ReactDOM from "react-dom";
import imagesone from "../../images/Vector 1.png";
import imagestwo from "../../images/Vector 2.png";
import imagesthree from "../../images/Vector 3.png";
import imagesqr from "../../images/Seller Center App QR Code.png";
import imagegp from "../../images/Google Play.png";
import imageas from "../../images/App Store.png";
import axios from 'axios';
import auth from '../../service/users'
import Joi from 'joi-browser'
import jwtDecode from "jwt-decode";

import "bootstrap/dist/css/bootstrap.css";
import { ajax } from "jquery";
import { Router, Redirect } from "react-router-dom";
import GoogleAuth from "../auth/googleAuth";
import FacebookAuth from "../auth/facebookAuth";
import AppleAuth from "../auth/appleAuth";
export class SignUp extends Component {
  state = {
    text:'SIGN UP',
    signIn: {
      email: '',
      password: '',
    },
    SignUp: {
      name: '',
      email: '',
      phoneNumber: '',
      code: '',
      password: '',
      confirmPass: '',
    },
    errors: {},
  }

  changeValueSignUp = e => {
    const SignUp = { ...this.state.SignUp }
    //const SignIn = { ...this.state.SignIn }

    const name = e.target.name;

    SignUp[name] = e.currentTarget.value
    this.setState({ SignUp });
  }
  changeValueSignIn = e => {
    const signIn = { ...this.state.signIn }

    const name = e.target.name;

    signIn[name] = e.currentTarget.value
    this.setState({ signIn });
  }


  schema_signUp = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().min(8).required(),
    confirmPass: Joi.string().min(8).required(),
    code: Joi.required(),

  }
  schema_login = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  }
  handle_submit = async e => {
    e.preventDefault();
    const SignUp = this.state.SignUp
    this.setState({ SignUp })

    const joi = Joi.validate(SignUp, this.schema_signUp, { abortEarly: false })

    if (!joi.error) {

      
        document.getElementById('spinner-body').classList.remove('hide-spinner')
        const res = await axios.post("/api/users/signup", SignUp)
        .then(response => { 
          sessionStorage.setItem("token", response.headers.authorization);
          let data = response.data;
          sessionStorage.setItem("data", data);
          window.location = '/create_store'
        })
        .catch(error => {
            document.getElementById('spinner-body').classList.add('hide-spinner')
            if(error.response.status == 500){
              this.setState({errors:{signUp:'Internal Server Error please try again later'}})

            }else{

              this.setState({errors:{signUp:error.response.data.errors}})
            }
        });

   
     
      
      return
    };

    const errors = {}

    for (let item of joi.error.details) errors[item.path[0]] = item.message
    this.setState({ errors: errors })

  }

  handle_submit_login = async e => {
    e.preventDefault();
    const signIn = this.state.signIn
    this.setState({ signIn })
    const joi = Joi.validate(signIn, this.schema_login, { abortEarly: false })

    if (!joi.error) {
      document.getElementById('spinner-body').classList.remove('hide-spinner')

      const res = await axios.post("/api/users/login",signIn)
      .then(response => { 
        let authorization = response.headers.authorization;
        let data = response.data;
        sessionStorage.setItem("token", authorization);
        sessionStorage.setItem("data", data);
      
        
     if(jwtDecode(data).seller == false) window.location = '/create_store'
     else window.location = '/store'

      })
      .catch(error => {
             
      document.getElementById('spinner-body').classList.add('hide-spinner')
      if(error.response.status == 500){
              this.setState({errors:{login:'Internal Server Error please try again later'}})

            }else{

              this.setState({errors:{login:error.response.data.errors}})
            }
      });
     
    
  }else{
    const errors = {}

    for (let item of joi.error.details) errors[item.path[0]] = item.message
    this.setState({ errors: errors })
  }



  }



  changeText= (text)=>{
      this.setState({text})
  }
  render() {
    if (auth.currentUser()) {

      return <Redirect to='/create_store' />

    }
    const { errors } = this.state;
    return (
      <section className='p-3'>

        <div className=' spinner-body hide-spinner' id='spinner-body'>
          <div className="loader spinner"></div>
        </div>

        <div className="card w-100 pt-lg-5 pl-lg-4 pb-md-5 pb-lg-5 p-3 mr-auto text-left mt-5">
          <div className="row">
            <div className="col-md-7">
              <div>
                <h1 className='text-center font-weight-bold'>
                  Welcome, your one-stop site to manage all shop operations
                </h1>
                <p className='text-center font-weight-bold'>Grow your sales and bring your store to the next level!</p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <img className="vector_sign_up" src={imagesone} alt="" />
                  <p className="text-center font-weight-bold">LOYALTY PROGRAM</p>
                </div>
                <div className="col-lg-4 col-md-12">
                  <img className="vector_sign_up" src={imagestwo} alt="" />
                  <p className="text-center font-weight-bold">ZERO PRODUCT <br />
LISTING FEE</p>
                </div>
                <div className="col-lg-4 col-md-12">
                  <img className="vector_sign_up" src={imagesthree} alt="" />
                  <p className="text-center font-weight-bold">STRONG PLATFORM
SUPPORT</p>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-6 ml-lg-auto text-center m-s-auto">
                  <div className="row pt-5 align-items-center">
                    <div className='col-md-2'>
                      <img className="qr_img_sign_up" src={imagesqr} alt="" />
                    </div>

                    <div className="col-md-9">
                      <p className="test_layer text-center">
                        DOWNLOAD THE APP NOW FOR EFFORTLESS SELLING!
                      </p>
                      <div className='text-center'>
                     <a href="https://play.google.com/store/apps/details?id=com.zux.shopless_merchant_app" target="_blank"><img style={{width:'40% '}} className="btns-store" src={imagegp} alt="" /></a>
                     <a href="https://apps.apple.com/eg/app/shopless-seller-center/id1531021804" target="_blank"> <img className="btns-store" src={imageas} alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card mt-lg-auto mt-5 card_sign border-0 text-center mr-lg-5">
                <div className="card-header card-header-card p-0 ">
                  <ul className="nav nav-tabs">
                    <li className="nav-item w-50">
                      <a
                        className="nav-link  active signup_tap"
                        data-toggle="tab"
                        href="#home"
                        onClick={()=>{this.changeText('SIGN UP')}}

                      >
                        Sign-Up
                      </a>
                    </li>
                    <li className="nav-item w-50">
                      <a
                        className="nav-link signup_tap"
                        data-toggle="tab"
                        href="#menu1"
                        onClick={()=>{this.changeText('SIGN IN')}}
                      >
                        Sign-In
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div id="home" className="tab-pane fade in active show">
                      <form method='POST' onSubmit={this.handle_submit} className='form-row'>
                        <div className="form-group col-12">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter Name"
                            name='name'
                            value={this.state.SignUp.name}
                            onChange={this.changeValueSignUp}
                          ></input>
                        </div>
                        {errors['name'] && <p className='text-danger col-12  mr-auto text-left'>{errors['name']}</p>}
                        <div className="form-group col-12">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name='email'
                            value={this.state.SignUp.email}
                            onChange={this.changeValueSignUp}

                          ></input>
                        </div>
                        {errors['email'] && <p className='text-danger col-12  mr-auto text-left'>{errors['email']}</p>}
                        <div className="form-group col-3">
                          <select name="" className="form-control w-auto " id="">
                            <option value="+20">+20</option>
                          </select>
                        </div>
                        <div className="form-group col-9">

                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Number"
                            name='phoneNumber'
                            value={this.state.SignUp.phoneNumber}
                            onChange={this.changeValueSignUp}


                          ></input>

                        </div>
                        {errors['phoneNumber'] && <p className='text-danger col-12  mr-auto text-left'>{errors['phoneNumber']}</p>}
                        <div className="form-group col-12">
                          <input
                            type="password"
                            className="form-control "
                            placeholder="Enter Password"
                            name='password'
                            value={this.state.SignUp.password}
                            onChange={this.changeValueSignUp}


                          ></input>

                        </div>
                        {errors['password'] && <p className='text-danger col-12  mr-auto text-left'>{errors['password']}</p>}
                        <div className="form-group col-12">
                          <input
                            type="password"
                            className="form-control "
                            placeholder="Confirm Password"
                            name='confirmPass'
                            value={this.state.SignUp.confirmPass}
                            onChange={this.changeValueSignUp}
                          ></input>

                        </div>
                        {errors['confirmPass'] && <p className='text-danger col-12  mr-auto text-left'>{errors['confirmPass']}</p>}
                       
                        {errors['signUp'] && <p className='text-danger col-12  mr-auto text-center'>{errors['signUp']}</p>}

                        <button type="submit" className="w-100 btn btn-success">
                        SIGN UP
                        </button>
                      </form>
                      <hr /> 
               
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <form className='form-row' onSubmit={this.handle_submit_login}>

                        <div className="form-group col-12">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name='email'
                            value={this.state.signIn.email}
                            onChange={this.changeValueSignIn}

                          ></input>
                        </div>
                        {errors['email'] && <p className='text-danger col-12  mr-auto text-left'>{errors['email']}</p>}

                        <div className="form-group col-12">
                          <input
                            type="password"
                            className="form-control "
                            placeholder="Enter Password"
                            name='password'
                            value={this.state.signIn.password}
                            onChange={this.changeValueSignIn}
                          ></input>

                        </div>
                       {errors['password'] && <p className='text-danger col-12  mr-auto text-left'>{errors['password']}</p>}

                       {errors['login'] && <p className='text-danger col-12  mr-auto text-center'>{errors['login']}</p>}

                        <button type="submit" className="w-100 btn btn-success">
                        SIGN IN
                        </button>
                      </form>
                      <hr /> 
               
                      <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

                    </div>
                    <div className='btns_auth'>

<GoogleAuth text={this.state.text}/>
<FacebookAuth text={this.state.text}/>
<AppleAuth text={this.state.text}/>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    );
  }
}
