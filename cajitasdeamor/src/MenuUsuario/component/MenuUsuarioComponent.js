import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { MenuUsuarioController } from "../controller/MenuUsuarioController";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {Utils} from '../../resources/Utils';
import ImgsProds from './ProdImagesComponent';

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
                Productos: [[{
                    idProducto: 0,
                    Nombre: ' '
                }]],
                Estado: ' ',
                MetodoPago: {},
                Domicilio: {}
            }],
            domicilios: [{
                Calle: ' ',
                CodigoPostal: ' ',
                Colonia: ' ',
                Estado: ' ',
                Municipio: ' ',
                Numero: 0,
                idDomicilio: 0
            }],
            tarjetas:[{
                Banco: ' ',
                CVV: '123',
                Cuenta: '5555444433332222',
                FechaVencimiento: '12-12-2022',
                Nombre: 'uwu',
                idMetodoPago: ' '
            }],
            idCompra: -1
        }
    }

    //Inicializa funciones
    componentDidMount() {
        if (sessionStorage.getItem("nombre")) {
            this.loadData();
        }
    }

    async loadData() {
        const datos = { idUsuario: sessionStorage.getItem("idUsuario") }; 

        const respuesta = await this.MenuUsuarioController.findByUserId(datos);
        this.setState({ compra: respuesta });

        const respuestaH = await this.MenuUsuarioController.findHome(datos);
        this.setState({ domicilios: respuestaH });

        const respuestaP = await this.MenuUsuarioController.findPay(datos);
        this.setState({ tarjetas: respuestaP });
    }

    nombreProds= prods =>{ 
        return prods.map((c) =>
            <p>{c[0].Nombre}</p>
        );
    }

    setDatos = (id) =>{
        this.setState({idCompra:id});
    }

    cancelarCompra = async event =>{
        let datos={idCompra: this.state.idCompra}

        let resp = await this.MenuUsuarioController.cancelarCompra(datos);

        if(resp[0].status==='Ok'){
            window.location.reload(true);
            Utils.swalSuccess(resp[0].Mensaje);
        }else{
            Utils.swalError(resp[0].exception);
        }
    }

    mostrarEstado(estado){
        switch(estado){
            case 'En espera':
                return(<p className="text-info">{estado}</p>);
            case 'En devolución': case 'Cancelado':
                return(<p className="text-danger">{estado}</p>);
            case 'Entregado':
                return(<p className="text-success">{estado}</p>);
            default:
                return(<p className="text-primary">{estado}</p>);
        }
    }

    mostrarCompras() {
        return this.state.compra.map((c) =>
            <div class="card my-2">
                <h5 class="card-header">{c.Fecha}</h5>
                <div class="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-3 col-sm-2 ">
                            <ImgsProds data={c.Productos} />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 ">
                            {this.nombreProds(c.Productos)}
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 ">
                            {this.mostrarEstado(c.Estado)}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-2 ">
                            <div class="card">
                                <div class="card-header">
                                    <div className="row fullWidth">
                                        <div className="col-lg-10 col-md-10"> </div>
                                        <div className="col-lg-2 col-md-2 pe-auto" onClick={()=>this.editarDedicatoria(c)}>
                                            <button><i class="fi fi-rr-edit"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">{c.Dedicatoria}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 p-1">
                            <button className="btn btn-success mx-2">  Ver  </button>
                            {c.Estado!=='En espera' ?
                                <button type="button" class="btn btn-danger" disabled>
                                    Cancelar
                                </button>
                            : 
                                <button type="button" class="btn btn-danger" 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal01"
                                    onClick={() => this.setDatos(c.idCompra)}>
                                    Cancelar
                                </button>
                                } 
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mostrarDomicilios(){
        return this.state.domicilios.map((c)=>
            <div className="col-lg-4 col-md-4 col-sm-6">
                <div class="card mx-2 p-4">
                    <div class="card-body">
                        <div className="row">
                            <div className="col-2">
                                <i class="fi fi-rr-home"></i>
                            </div>
                            <div className="col-10">
                                <h5 class="card-title">{c.Calle} {c.Numero}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <p class="card-text">Codigo Postal {c.CodigoPostal}</p>
                            <p class="card-text">{c.Colonia}, {c.Municipio}, {c.Estado}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    mostrarTarjetas(){
        return this.state.tarjetas.map((c)=>
            <div className="col-lg-4 col-md-4 p-2 mx-2">
                <Cards
                    cvc={c.CVV}
                    expiry={c.FechaVencimiento}
                    name={c.Nombre}
                    number={c.Cuenta}
                />
            </div>
        )
    }

    cerrarSesion = event => {
        event.preventDefault();
        sessionStorage.clear();
        
        Utils.swalSuccess("Hasta pronto!");

        setTimeout(() => this.props.history.push('/'), 700);
        setTimeout(() => window.location.reload(true), 1000);
    }

    editarDedicatoria = e => {
        this.props.history.push({
            pathname: '/Dedicatoria',
            data: e,
            anterior: 'menuUsuario'
        })
    }

    render() {
        return (
            <div class="container col-lg-12 col-md-12 col-sm-12 p-4">
                
                <div class="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar cancelacion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea cancelar esta compra?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() =>this.cancelarCompra()}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-10 col-md-10">
                        <div className="row align-self-start">
                            <p className="fs-2">Bienvenido {sessionStorage.getItem('nombre')}.</p>
                        </div>
                        <div className="row">
                            <h6>{sessionStorage.getItem('correo')}</h6>
                        </div>
                        
                    </div>
                    <div className="col-lg-2 col-md-2">
                        <button className="btn btn-danger" onClick={this.cerrarSesion}> Cerrar sesión </button>
                    </div>
                </div>

                <br/>
                <div>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                            role="tab" aria-controls="home" aria-selected="false">Compras</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                            role="tab" aria-controls="profile" aria-selected="true">Domicilios</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                            role="tab" aria-controls="contact" aria-selected="false">Tarjetas</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="col-lg-12 col-md-12 p-4">
                                {this.mostrarCompras()}
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="card-group p-4 row">
                                {this.mostrarDomicilios()}
                            </div>
                            
                        </div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="row p-4">
                                {this.mostrarTarjetas()}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(MenuUsuarioComponent)