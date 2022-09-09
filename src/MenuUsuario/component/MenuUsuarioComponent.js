import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { MenuUsuarioController } from "../controller/MenuUsuarioController";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {Utils} from '../../resources/Utils';
import ImgsProds from './ProdImagesComponent';
import vacio from '../../resources/images/vacio.png';

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
                Domicilio: {},
                status: 'oks'
            }],
            domicilios: [{
                Calle: ' ',
                CodigoPostal: ' ',
                Colonia: ' ',
                Estado: ' ',
                Municipio: ' ',
                Numero: 0,
                idDomicilio: 0,
                status: 'oks'
            }],
            tarjetas:[{
                Banco: ' ',
                CVV: '123',
                Cuenta: '5555444433332222',
                FechaVencimiento: '12-12-2022',
                Nombre: 'uwu',
                idMetodoPago: ' ',
                status: 'oks'
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
        const respuestaH = await this.MenuUsuarioController.findHome(datos);
        const respuestaP = await this.MenuUsuarioController.findPay(datos);

        this.setState({ tarjetas: respuestaP });
        this.setState({ domicilios: respuestaH });
        this.setState({ compra: respuesta });
    }

    datosVacios = msg =>{
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <img src={vacio} alt="Vacio" className="rounded mx-auto d-block p-1 my-4" style={{ width: '15%' }}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-10 my-4">
                        <h1 className="text-center">Parece que no hay nada por aqui</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10 col-sm-10 my-4">
                        <h1 className="text-center">Porque no {msg} y regresa despues</h1>
                    </div>
                </div>
            </div>
        );
    }

    nombreProds= prods =>{ 
        return prods.map((c) =>
            <p>{c.Nombre}</p>
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
                return(<h6 className="text-info text-center responText">{estado}</h6>);
            case 'En devolución': case 'Cancelado':
                return(<h6 className="text-danger text-center responText">{estado}</h6>);
            case 'Entregado':
                return(<h6 className="text-success text-center responText">{estado}</h6>);
            default:
                return(<h6 className="text-primary text-center responText">{estado}</h6>);
        }
    }

    mostrarCompras() {
        return this.state.compra.map((c) =>
            <div className="col-12 col-xl-6">
            <div className="card my-2">
                <h5 className="card-header">{c.Fecha}</h5>
                <div className="card-body">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-12 mt-4">
                            <ImgsProds data={c.Productos} />
                        </div>
                        <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12 mt-4">
                            {this.mostrarEstado(c.Estado)}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row fullWidth">
                                        <div className="col-lg-10 col-md-10"> </div>
                                        <div className="col-lg-2 col-md-2 pe-auto" >
                                            {c.Estado==='En espera' ? 
                                                <button onClick={()=>this.editarDedicatoria(c)}><i className="fi fi-rr-edit"></i></button>
                                            :
                                            <button disabled><i className="fi fi-rr-edit"></i></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-center">{c.Dedicatoria}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 p-2 mt-4" style={{'left':'5px'}}>
                            {c.Estado!=='En espera' ?
                                <button type="button" className="btn btn-danger" disabled>
                                    Cancelar
                                </button>
                            : 
                                <button type="button" className="btn btn-danger" 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal01"
                                    onClick={() => this.setDatos(c.idCompra)}>
                                    Cancelar
                                </button>
                                } 
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    mostrarDomicilios(){
        return this.state.domicilios.map((c)=>
            <div className="col-lg-4 col-md-4 col-sm-6 mt-4">
                <div className="card mx-2 p-4 domTarj">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">
                                <i className="fi fi-rr-home"></i>
                            </div>
                            <div className="col-10">
                                <h5 className="card-title">{c.Calle} {c.Numero}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <p className="card-text">Codigo Postal {c.CodigoPostal}</p>
                            <p className="card-text">{c.Colonia}, {c.Municipio}, {c.Estado}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    mostrarTarjetas(){
        return this.state.tarjetas.map((c)=>
            <div className="col-lg-4 col-md-6 p-2 mt-4 cardSh">
                <Cards
                    cvc={c.CVV}
                    expiry={c.FechaVencimiento}
                    name={c.Nombre}
                    number={c.Cuenta.substring(0,8)}
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

    irMenuSuper = e => {
        this.props.history.push('/menuSuper')
    }

    verificarUser(){
        if(sessionStorage.getItem("tipo")==='admin' || sessionStorage.getItem("tipo")==="sudosu"){
            return(
                <>
                    <div className="col-xl-8 col-lg-8 col-md-8">
                        <div className="row align-self-start">
                            <p className="fs-2">Bienvenido {sessionStorage.getItem('nombre')}.</p>
                        </div>
                        <div className="row">
                            <h6>{sessionStorage.getItem('correo')}</h6>
                        </div>
                        
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 my-4">
                            <button className="btn btn-primary" onClick={this.irMenuSuper}> Modo administrador </button>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 my-4">
                        <button className="btn btn-danger" onClick={this.cerrarSesion}> Cerrar sesión </button>
                    </div>
                </>
            );
        }else{
            return(
                <>
                    <div className="col-xl-10 col-lg-10 col-md-10">
                        <div className="row align-self-start">
                            <p className="fs-2">Bienvenido {sessionStorage.getItem('nombre')}.</p>
                        </div>
                        <div className="row">
                            <h6>{sessionStorage.getItem('correo')}</h6>
                        </div>
                        
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 my-4">
                        <button className="btn btn-danger" onClick={this.cerrarSesion}> Cerrar sesión </button>
                    </div>
                </>
            );
        }
    }

    render() {
        return (
            <div className="container col-lg-12 col-md-12 col-sm-12 p-4">
                
                <div className="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirmar cancelacion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">Desea cancelar esta compra?</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() =>this.cancelarCompra()}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.verificarUser()}
                </div>

                <br/>
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                            role="tab" aria-controls="home" aria-selected="false">Compras</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                            role="tab" aria-controls="profile" aria-selected="true">Domicilios</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                            role="tab" aria-controls="contact" aria-selected="false">Tarjetas</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="col-lg-12 col-md-12 p-4">
                                <div className="row">
                                    { this.state.compra[0].status === "Vacio" ? this.datosVacios("realiza una compra") : this.mostrarCompras()}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="card-group p-4 row">
                            { this.state.domicilios[0].status === "Vacio" ? this.datosVacios("agrega un nuevo domicilio") : this.mostrarDomicilios()}
                            </div>
                            
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="row p-4">
                                { this.state.tarjetas[0].status === "Vacio" ? this.datosVacios("agrega una nueva tarjeta") : this.mostrarTarjetas()}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(MenuUsuarioComponent)