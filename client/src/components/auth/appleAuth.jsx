
import axios from "axios";
import AppleLogin from 'react-apple-login'
import 'font-awesome/css/font-awesome.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import React, { Component } from 'react'
library.add(fab);


export default class AppleAuth extends Component {
    render() {
      
        document.getElementById('demo')
        const responseApple = async(response) => {
         document.getElementById('spinner-body').classList.remove('hide-spinner')
            try {
              const res = await axios.post("/api/users/apple_auth", {'id_token':response.authorization.id_token});
            
            sessionStorage.setItem('token',res.headers.authorization);
            sessionStorage.setItem('data',res.data);

          window.location ='/create_store'
            } catch (error) {
              document.getElementById('spinner-body').classList.add('hide-spinner')

            }
          }
           console.log(process.env.REACT_APP_REDIRECT_URI)
        return (
          <AppleLogin  
          clientId={"com.shopless.sellerCenter.AppleSignIn"} 
          redirectURI={process.env.REACT_APP_REDIRECT_URI}   
    render={renderProps => (
      <button className='appleBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}>   <FontAwesomeIcon
      icon={["fab", "apple"]}
      className="second-icon"
      style={{marginRight: 'calc(.34435vw + 3.38843px)'}}
      rotation={360}
      size="lg"
    /> {this.props.text} WITH APPLE</button>
    )}
    
    designProp={
      {
        height: 43,
        width: 290,
        color: "black",
        border: false,
        type: "sign-in",
        border_radius: 15,
        scale: 1,
        locale: "en_US", 
      }
    }
    responseType={"code id_token"} 
    responseMode={"form_post"}       
    usePopup={true}
    callback={responseApple}
      />
         
        )
    }
}


