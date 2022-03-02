import React from 'react';
import bannerlogC from './resources/images/logo003.png';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePageComponent from "./Index/component/IndexComponent";
import CarritoComponent from "./Carrito/component/CarritoComponent";
import TiendaComponent from "./Tienda/component/TiendaComponent";
import NosotrosComponent from "./Nosotros/component/NosotrosComponent";
import LoginComponent from "./Login/component/LoginComponent";
import ProductoComponent from "./Producto/component/ProductoComponent";
import ProductosGridComponent from "./Productos/component/ProductosGridComponent";
import ProductosFormComponent from "./Productos/component/ProductosFormComponent";
import ContactanosComponent from "./Contactanos/component/ContactanosComponent";
import MenuSuperAdminComponent from "./SuperAdminMenu/component/MenuSuperAdminComponent";
import { event } from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }


  render() {

    return (
      <div className="App">
        <div class="logoC">
          <div class="col my-6 col-sm-8 col-md-10 col-lg-10">
            <img class="logo" src={bannerlogC} />
          </div>
        </div>
        <div class="wrap">
          <ul class="tabs">
            <li><a href="/"><i class="fi fi-rr-home"></i>Inicio</a></li>
            <li><a href="/Tienda"><i class="fi fi-rr-shop"></i><span class="tab-text">Tienda</span></a></li>
            <li><a href="/Nosotros"><i class="fi fi-rr-briefcase"></i><span class="tab-text">Acerca de Nosotros</span></a></li>
            <li><a href="/Contactanos"><i class="fi fi-rr-envelope"></i><span class="tab-text">Contactanos</span></a></li>
            <li><a href="/Carrito"><i class="fi fi-rr-shopping-cart"></i><span class="tab-text">Carrito</span></a></li>
            <li><a href="/Login"><i class="fi fi-rr-user"></i>Login</a></li>
          </ul>
        </div>
        <div className="container-fluid text-white">
          <Router>
            <div className="content" >
              <Switch>
                <Route path="/productosForm" component={ProductosFormComponent} />
                <Route path="/productosGrid" component={ProductosGridComponent} />
                <Route path="/menuSuper" component={MenuSuperAdminComponent} />
                <Route path="/Carrito" component={CarritoComponent} />
                <Route path="/Tienda" component={TiendaComponent} />
                <Route path="/Nosotros" component={NosotrosComponent} />
                <Route path="/Contactanos" component={ContactanosComponent} />
                <Route path="/Login" component={LoginComponent} />
                <Route path="/Producto" component={ProductoComponent} />
                <Route path="/" component={HomePageComponent} />
              </Switch>
            </div>
          </Router>
        </div>
        <div class="pie">
          
        </div>
      </div>
    )
  }
}


