import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from '../../images/Logo Horizontal.png';

import 'bootstrap/dist/css/bootstrap.css';
//import { usePopper } from 'react-popper';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import auth from "../../service/users";
//import '@popperjs/core'; // Edit here
import { SideBar } from "./sidebar";

export class Header extends Component {
  state = {
    open: false,
  }

  render() {
    const user = auth.getSeller();

    return (

      <header>


        {user && <SideBar isOpen={this.state.open} />}
        <nav className="navbar navbar-expand-lg navbar-light">
          { user   && <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => { this.setState({open:! this.state.open}) }}>&#9776; </span>}
          <img className='logo ml-2' src={logo} alt="" />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto mr-5">

              <li className="nav-item dropdown">
                <strong>Language :</strong>
                <a className="d-inline nav-link dropdown-toggle disabled" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  English
        </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>          </ul>
          </div>
        </nav>
      </header>

    );
  }
}