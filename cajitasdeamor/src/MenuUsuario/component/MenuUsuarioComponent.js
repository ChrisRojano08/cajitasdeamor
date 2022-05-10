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
                Usuario: [{
                    Nombre: ' ',
                    Apellido: ' ',
                    idUsuario: ' '
                }],
                Fecha: ' ',
                Dedicatoria: ' ',
                Nombre: ' ',
                Productos: [{
                    idProducto: 0,
                    Nombre: ' '
                }],
                Estado: ' ',
                MetodoPago: {},
                Domicilio: {}
            }],

        }
    }

    //Inicializa funciones
    componentDidMount() {
        if (sessionStorage.getItem("nombre")) {
            this.loadData();
        }
    }

    async loadData() {
        let datos = { idUsuario: sessionStorage.getItem("idUsuario") };
        let respuesta = await this.MenuUsuarioController.findByUserId(datos);
        this.setState({ compra: respuesta });

        console.log(this.state.compra);

    }
    delete = () => {
        this.deleteCart();
    }

    mostrarCompras() {
        return this.state.compra.map((c) =>
            <ul class="list-group list-group-horizontal-xl">
                <li class="list-group-item" style={{ width: '20%' }}>{c.idCompra}</li>
                <li class="list-group-item" style={{ width: '25%' }}>{c.Estado}</li>
                <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary">Dedicatoria</button> </li>
                <li class="list-group-item" style={{ width: '25%' }}><button type="button" class="btn btn-primary">Cancelar</button> </li>
            </ul>
        );
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
            <div class="container col-lg-10 col-md-10 col-sm-10 py-4">
                <div class="card-header ">
                    <h5 class="card-title ">{this.infoNombre()}</h5>
                    <h6 class="card-subtitle mb-2 text-muted ">{this.infoCorreo()}</h6>
                </div>
                <div className="card-body">
                    <div class="row">
                        <div class="col-9">
                            <div class="d-flex align-items-start">
                                <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
                                    aria-selected="true">Compras</button>
                                    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
                                    aria-selected="false">Domicilios</button>
                                    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
                                    aria-selected="false">Tarjetas</button>
                                </div>
                                <div class="tab-content" id="v-pills-tabContent">
                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                                    aria-labelledby="v-pills-home-tab">
                                        {this.mostrarCompras()}
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel"
                                    aria-labelledby="v-pills-profile-tab">

                                    </div>
                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel"
                                    aria-labelledby="v-pills-messages-tab">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div >


        )
    }
}
export default withRouter(MenuUsuarioComponent)