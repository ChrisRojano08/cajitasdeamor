import React from 'react';
import bannerlogC from './resources/images/logo003.png';
import logC from './resources/images/logo001.png';
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
import DedicatoriaComponent from "./Dedicatoria/component/DedicatoriaComponent";
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
      <div class="container-fluid ">

        <div class="row justify-content-center">
          <img src={bannerlogC} class="rounded mx-auto d-block" style={{ height: '125px', width: 'auto' }} />
        </div>

        <div class="row justify-content-center">
          <ul class="tabs">
            <li><a href="/"><i class="fi fi-rr-home"></i><span class="tab-text">Inicio</span></a></li>
            <li><a href="/Tienda"><i class="fi fi-rr-shop"></i><span class="tab-text">Tienda</span></a></li>
            <li><a href="/Nosotros"><i class="fi fi-rr-briefcase"></i><span class="tab-text">Acerca de Nosotros</span></a></li>
            <li><a href="/Contactanos"><i class="fi fi-rr-envelope"></i><span class="tab-text">Contactanos</span></a></li>
            <li><a href="/Carrito"><i class="fi fi-rr-shopping-cart"></i><span class="tab-text">Carrito</span></a></li>
            <li><a href="/Login"><i class="fi fi-rr-user"></i><span class="tab-text">Login</span></a></li>
          </ul>
        </div>

        <div class="row justify-content-center">
          <Router>
            <div class="row justify-content-center">
              <Switch>
                <Route path="/productosForm" component={ProductosFormComponent} />
                <Route path="/Dedicatoria" component={DedicatoriaComponent} />
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


        <div class="row align-items-end" style={{ background: 'red' }}>
          <div class="col">
            One of three columns
          </div>

          <div class="col">
            One of three columns
          </div>
        </div>
      </div>
    )
  }
}


