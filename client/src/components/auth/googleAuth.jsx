
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

import React, { Component } from 'react'

export default class GoogleAuth extends Component {
    render() {
        const responseGoogle = async (response) => {
            document.getElementById('spinner-body').classList.remove('hide-spinner')
            const res = await axios.post("/api/users/google_auth", {'id_token':response.tokenId});
                    
                 sessionStorage.setItem('token',res.headers.authorization);
                 sessionStorage.setItem('data',res.data);

      window.location ='/create_store'
           
          }

        return (
           
                   <GoogleLogin
            clientId="259410580291-1c7qua4bpbkdn52q7vulp2br8r9m8tuh.apps.googleusercontent.com"
            buttonText={this.props.text+ ' WITH GOOGLE'}
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}

          />
         
        )
    }
}


