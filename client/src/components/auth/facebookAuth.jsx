
import axios from "axios";
import FacebookLogin from 'react-facebook-login';

import React, { Component } from 'react'

export default class FacebookAuth extends Component {
    render() {
      
        document.getElementById('demo')
        const responseFacebook = async(response) => {
          document.getElementById('spinner-body').classList.remove('hide-spinner')

            const res = await axios.post("/api/users/facebook_auth", {'access_token':response.accessToken});

            
            sessionStorage.setItem('token',res.headers.authorization);
            sessionStorage.setItem('data',res.data);

            window.location ='/create_store'
          }
           
        return (
           
            <FacebookLogin
            appId="1213940415633450"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            //cssClass="my-facebook-button-class"
            icon="fa-facebook"
            textButton={this.props.text +' with Facebook'}
          />
         
        )
    }
}


