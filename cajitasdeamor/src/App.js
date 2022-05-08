import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
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
import UsuariosGridComponent from './Usuarios/component/UsuariosGridComponent';
import MenuSuperAdminComponent from "./SuperAdminMenu/component/MenuSuperAdminComponent";
import RecuperarComponent from "./Recuperar/component/RecuperarComponent";
import PagoComponent from "./Pago/component/PagoComponent";
import DomicilioComponent from "./Domicilio/component/DomicilioComponent";
import ComprasGridComponent from "./Compras/component/ComprasGridComponent";
import MenuUsuarioComponent from "./MenuUsuario/component/MenuUsuarioComponent";
import { event } from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }

  validarSesion() {
    let nom = sessionStorage.getItem("nombre");
    let tip = sessionStorage.getItem("tipo");

    if (nom != null) {
      if (tip === 'admin') {
        return (<Nav.Link href="/menuSuper" style={{ margin: '0px 15px' }}><i class="fi fi-rr-user" style={{ margin: '0px 5px' }} />{nom}</Nav.Link>);
      } else {
        return (<Nav.Link href="/menuUsuario" style={{ margin: '0px 15px' }}><i class="fi fi-rr-user" style={{ margin: '0px 5px' }} />{nom}</Nav.Link>);
      }
    } else {
      return (<Nav.Link href="/Login" style={{ margin: '0px 15px' }}><i class="fi fi-rr-user" style={{ margin: '0px 5px' }} />Usuario</Nav.Link>);
    }
  }

  render() {
    return (
      <div class="container-fluid">

        <div class="row justify-content-center">
          <img src={bannerlogC} class="rounded mx-auto d-block" style={{ height: '125px', width: 'auto' }} />
        </div>

        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/"><img class="logopieimg" style={{ height: '60px', width: 'auto' }} src={logC} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ margin: '0px 15px' }}><i class="fi fi-rr-home" style={{ margin: '0px 5px' }} />Inicio</Nav.Link>
                <Nav.Link href="/Tienda" style={{ margin: '0px 15px' }}><i class="fi fi-rr-shop" style={{ margin: '0px 5px' }} />Tienda</Nav.Link>
                <Nav.Link href="/Nosotros" style={{ margin: '0px 15px' }}><i class="fi fi-rr-briefcase" style={{ margin: '0px 5px' }} />Acerca de nosotros</Nav.Link>
                <Nav.Link href="/Contactanos" style={{ margin: '0px 15px' }}><i class="fi fi-rr-envelope" style={{ margin: '0px 5px' }} />Contactanos</Nav.Link>
                <Nav.Link href="/Carrito" style={{ margin: '0px 15px' }}><i class="fi fi-rr-shopping-cart" style={{ margin: '0px 5px' }} />Carrito</Nav.Link>
                {this.validarSesion()}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div class="row justify-content-center">
          <Router>
            <div class="row justify-content-center">
              <Switch>
                <Route path="/usuariosGrid" component={UsuariosGridComponent} />
                <Route path="/productosForm" component={ProductosFormComponent} />
                <Route path="/Dedicatoria" component={DedicatoriaComponent} />
                <Route path="/productosGrid" component={ProductosGridComponent} />
                <Route path="/menuSuper" component={MenuSuperAdminComponent} />
                <Route path="/menuUsuario" component={MenuUsuarioComponent} />
                <Route path="/Carrito" component={CarritoComponent} />
                <Route path="/Recuperar" component={RecuperarComponent} />
                <Route path="/Tienda" component={TiendaComponent} />
                <Route path="/Nosotros" component={NosotrosComponent} />
                <Route path="/Contactanos" component={ContactanosComponent} />
                <Route path="/Login" component={LoginComponent} />
                <Route path="/Producto" component={ProductoComponent} />
                <Route path="/Pago" component={PagoComponent} />
                <Route path="/Domicilio" component={DomicilioComponent} />
                <Route path="/Compras" component={ComprasGridComponent} />
                <Route path="/" component={HomePageComponent} />
              </Switch>
            </div>
          </Router>
        </div>



        <footer class="container align-items-end" style={{ background: '#212429', textAlign: 'center', minWidth: '100%' }}>
          <div class="row ">
            <div class="col-12 col-md">
              <img class="logopieimg" src={logC} style={{ height: '60px', width: 'auto' }} />
              <h5 class="text-white">Cajitas de Amor</h5>
            </div>
            <div class="col-6 col-md">
              <h5 style={{ color: 'red' }}>Redes</h5>
              <ul class="list-unstyled text-small">
                <li><a class="link-secondary" href="https://www.facebook.com/Cajitas-de-amor-102964458600186"><i class="fi fi-brands-facebook">Facebook</i></a></li>
                <li><a class="link-secondary" href='https://www.instagram.com/cajitasdeamorj/'><i class="fi fi-brands-instagram">Instagram</i></a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}


