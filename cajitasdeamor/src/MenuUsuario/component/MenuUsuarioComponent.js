import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { MenuUsuarioController } from "../controller/MenuUsuarioController";
import { Utils } from '../../resources/Utils';


class MenuUsuarioComponent extends React.Component {
    constructor() {
        super();
        this.MenuUsuarioController = new MenuUsuarioController();

        //Almacena datos
        this.state = {
            compra: [{
                idCompra: 0,
                estado: ' ',
            }],

        }
    }


    //Inicializa funciones
    componentDidMount() {
        if(sessionStorage.getItem("nombre")){
            this.loadData();
        }
    }

    async loadData() {

        let datos = { idUsuario: sessionStorage.getItem("idUsuario") }
        console.log('hola xd ');
        console.log(datos);
        let respuesta = await this.MenuUsuarioController.findByUserId(datos);
        console.log('hola 2');
        console.log(respuesta);
        this.setState({ compra: respuesta });
        console.log('hola3');
        console.log(this.state.productos);

    }
    delete = () => {
        this.deleteCart();
    }

    mostrarProds() {
        return this.state.prodsFilt.map((c) =>
            <ul class="list-group list-group-horizontal-xl">
                <li class="list-group-item" style={{ width: '20%' }}>{c.idCompra}</li>
                <li class="list-group-item" style={{ width: '25%' }}>{c.estado}</li>
                <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary">Dedicatoria</button> </li>
                <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary">Cancelar</button> </li>
            </ul>
        )
    }

    irPedidos = event => {
        event.preventDefault()
        this.props.history.push('/menuUsuario')
    }
    irDomicilio = event => {
        event.preventDefault()
        this.props.history.push('/Domicilio')
    }
    irPago = event => {
        event.preventDefault()
        this.props.history.push('/Pago')
    }

    /*logout = event => {
        event.preventDefault()
        sessionStorage.clear();
        this.props.history.push('/login')
        setTimeout(() => window.location.reload(true), 500);
    }*/

    infoNombre() {
        let uss = sessionStorage.getItem("nombre");
        if (uss != null) {
            return (<h5 class="card-title"><i class="fi fi-rr-user" style={{ margin: '0px 5px' }} />{uss}</h5>);
        } else {
            return (<h5 class="card-title"><i class="fi fi-rr-user" style={{ margin: '0px 5px' }} />ERRORNOMBRE</h5>);
        }
    }
    infoCorreo() {
        let us = sessionStorage.getItem("correo");

        if (us != null) {
            return (<h6 class="card-subtitle mb-2 text-muted">{us}</h6>);
        } else {
            return (<h6 class="card-subtitle mb-2 text-muted">ERRORCORREO</h6>);
        }
    }

    render() {
        return (
            <div class="container">
                <div class="card-header ">
                    <h5 class="card-title ">{this.infoNombre()}</h5>
                    <h6 class="card-subtitle mb-2 text-muted ">{this.infoCorreo()}</h6>
                </div>
                <div class="row">
                    <div class="col-2">
                        <div class="d-grid gap-2 col">
                            <button class="btn btn-secondary" type="button" onClick={this.irPedidos}>Pedidos</button>
                            <button class="btn btn-secondary" type="button" onClick={this.irDomicilio}>Domicilio</button>
                            <button class="btn btn-secondary" type="button" onClick={this.irPago}>Metodo Pago</button>
                            <button class="btn btn-danger" type="button" onClick={this.logout}>Cerrar Sesion</button>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="card">
                            <div class="card-body">
                                <ul class="list-group  list-group-horizontal-xl">
                                    <li class="list-group-item bg-secondary" aria-current="true" style={{ width: '20%' }}>IDCompra</li>
                                    <li class="list-group-item bg-secondary" aria-current="true" style={{ width: '25%' }}>Estado</li>
                                    <li class="list-group-item bg-secondary" aria-current="true" style={{ width: '25%' }}>Dedicatoria</li>
                                    <li class="list-group-item active" aria-current="true" style={{ width: '25%' }}></li>
                                </ul>
                                <ul class="list-group list-group-horizontal-xl">
                                    <li class="list-group-item" style={{ width: '20%' }}> 01</li>
                                    <li class="list-group-item" style={{ width: '25%' }}>En reparto</li>
                                    <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary">Dedicatoria</button> </li>
                                    <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary" >Cancelar</button> </li>
                                </ul>
                                {/*<div class="row justify-content-center aling-item-center row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4 ">
                                    {this.mostrarProds()}
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div >
            </div >


        )
    }
}
export default withRouter(MenuUsuarioComponent)