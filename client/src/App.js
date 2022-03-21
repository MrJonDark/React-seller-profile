import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/shared/header";
import { SignUp } from "./components/layout/auth_seller";
import Demo from "./components/functions/resizing_function";
import Product from "./components/layout/product";
import Products from "./components/layout/Products";
import Store from "./components/layout/store";
import { LogOut } from "./components/functions/LogOut";

import { CreateMarket } from "./components/layout/create_market";
import ProtectedRoute from "./components/functions/ProtectedRoute";
import Shipping from "./components/layout/Shipping";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
      <div className="App" id="main">
        <Header />
        <Switch>
          <ProtectedRoute path="/store"  component={Store} />
          <ProtectedRoute path="/products" component={Products} />
          <ProtectedRoute path="/shipping" component={Shipping} />

          <Route path="/" exact component={SignUp} />
          <ProtectedRoute path="/Product/:id?" component={Product} />
          <ProtectedRoute path="/logout" component={LogOut} />

          <ProtectedRoute path="/create_store" component={CreateMarket} />
        </Switch>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
