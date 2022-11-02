import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import bannerlogC from './resources/images/logo003.png';
import logC from './resources/images/logo001.png';
import './resources/css/General.css';
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
import CompraComponent from './Compras/component/CompraComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }

  validarSesion() {
    let nameUser = sessionStorage.getItem("nombre");

    if (nameUser != null) {
        return (<Nav.Link href="/menuUsuario" style={{ margin: '0px 15px' }}><i className="fi fi-rr-user" style={{ margin: '0px 5px' }} />{nameUser}</Nav.Link>);
    } else {
      return (<Nav.Link href="/Login" style={{ margin: '0px 15px' }}><i className="fi fi-rr-user" style={{ margin: '0px 5px' }} />Usuario</Nav.Link>);
    }
  }

  navRnd() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <img src={bannerlogC} className="rounded mx-auto d-block" alt='Banner'
            style={{ height: '125px', width: 'auto' }} />
        </div>

        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img className="logopieimg" alt='Logo'
                style={{ height: '60px' }} src={logC} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" style={{ margin: '0px 15px' }}><i className="fi fi-rr-home" style={{ margin: '0px 5px' }} />Inicio</Nav.Link>
                <Nav.Link href="/Tienda" style={{ margin: '0px 15px' }}><i className="fi fi-rr-shop" style={{ margin: '0px 5px' }} />Tienda</Nav.Link>
                <Nav.Link href="/Nosotros" style={{ margin: '0px 15px' }}><i className="fi fi-rr-briefcase" style={{ margin: '0px 5px' }} />Acerca de nosotros</Nav.Link>
                <Nav.Link href="/Contactanos" style={{ margin: '0px 15px' }}><i className="fi fi-rr-envelope" style={{ margin: '0px 5px' }} />Contactanos</Nav.Link>
                <Nav.Link href="/Carrito" style={{ margin: '0px 15px' }}><i className="fi fi-rr-shopping-cart" style={{ margin: '0px 5px' }} />Carrito</Nav.Link>
                {this.validarSesion()}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

  bodyRnd() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Router>
            <div className="row justify-content-center">
              <Switch>
                <Route path="/usuariosGrid" component={UsuariosGridComponent} />
                <Route path="/productosForm" component={ProductosFormComponent} />
                <Route path="/Dedicatoria" component={DedicatoriaComponent} />
                <Route path="/productosGrid" component={ProductosGridComponent} />
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
                <Route path="/Compra" component={CompraComponent} />
                <Route path="/menuSuper" component={MenuSuperAdminComponent} />
                <Route path="/" component={HomePageComponent} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }

  footerRnd() {
    return (
      <div>
        <footer className="container-fluid align-items-end footCA">
          <div className="row ">
            <div className="col-6">
              <img className="logopieimg" src={logC} alt='Logo'
                style={{ height: '60px', width: 'auto' }} />
              <h5 className="text-white">Cajitas de Amor</h5>
            </div>
            <div className="col-6">
              <h5 style={{ color: 'red' }}>Redes</h5>
              <ul className="list-unstyled text-small">
                <li><a className="link-secondary" href="https://www.facebook.com/Cajitas-de-amor-102964458600186"><i className="fi fi-brands-facebook">Facebook</i></a></li>
                <li><a className="link-secondary" href='https://www.instagram.com/cajitasdeamorj/'><i className="fi fi-brands-instagram">Instagram</i></a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  }


  render() {
    return (
      <div>
        <div className="navHole">
          {this.navRnd()}
        </div>
        <div className="bodyHole">
          {this.bodyRnd()}
        </div>
        <div className="footHole">
          {this.footerRnd()}
        </div>
      </div>
    )
  }
}


