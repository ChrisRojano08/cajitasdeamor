import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { DomicilioController } from "../controller/DomicilioController";
import {Utils} from '../../resources/Utils'; 

class DomicilioComponent extends React.Component {
    constructor() {
        super();
        this.domicilioController = new DomicilioController();

        //Almacena datos
        this.state = {
            domicilio:{
                Numero:' ',
               Calle:' ',
                Colonia:' ',
                Municipio:' ',
                Estado:' ',
                CodigoPostal:' ',
                idUsuario:sessionStorage.getItem("idUsuario")
            },
            domicilios: [{
                Calle: ' ',
                CodigoPostal: ' ',
                Colonia: ' ',
                Estado: ' ',
                Municipio: ' ',
                Numero: 0,
                idDomicilio: 0
            }]
        }
    }

    //Inicializa funciones
    componentDidMount() {
        this.loadData();
    }

    async loadData(){
        const datos = { idUsuario: sessionStorage.getItem("idUsuario") }; 
        const respuestaH = await this.domicilioController.findHome(datos);

        this.setState({ domicilios: respuestaH });
    }

    comprobacion= async event=>{    
        event.preventDefault();

        if(sessionStorage.getItem("idUsuario") === null){
            Utils.swalError("Necesita iniciar sesion para poder agregar una direccion!");
        }else{
            const respuesta = await this.domicilioController.insert(this.state.domicilio);

            if(respuesta.status==='Ok'){
                Utils.swalSuccess("El domicilio fue agregado correctamente!");
                setTimeout(()=>window.location.reload(true), 1000);
            }else if (respuesta.status==='Error'){
                Utils.swalError("Ocurrió un error al insertar al usuario!");
            }else{
                Utils.swalError(respuesta.status);
            }

                
        }
    }

    handleChange=e=> {
        this.setState({
            domicilio : {
                ...this.state.domicilio,
                [e.target.name]: e.target.value
            }
        })
    }

    seleccionarDomicilio=(c)=>{
        this.props.handler(2, c);
    }

    formulario(){
        return(
            <div>
                <h3 style={{ color: 'red' }} >Agregar domicilio</h3>
                <br/>
                <div class="card">
                    <div class="card-header">
                        Ubicacion
                    </div>
                    <div class="card-body">
                        <form class="row g-3 needs-validation justify-content-center" 
                            onSubmit={this.comprobacion} novalidate>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom01" class="form-label">Número</label>
                                <input type="number" 
                                        class="form-control" 
                                        id="validationCustom01"
                                        onChange={this.handleChange}
                                        name="Numero"  required/>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom02" class="form-label">Calle </label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom02" 
                                        onChange={this.handleChange}
                                        name="Calle" required/>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom02" class="form-label">Colonia</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom02"
                                        onChange={this.handleChange} 
                                        name="Colonia"  required/>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom03" class="form-label">Municipio</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom03" 
                                        onChange={this.handleChange}
                                        name="Municipio" required/>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom04" class="form-label">Estado</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom03" 
                                        onChange={this.handleChange}
                                        name="Estado" required/>
                            </div> 
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <label for="validationCustom05" class="form-label">Código postal</label>
                                <input type="number" 
                                        max="99999" 
                                        class="form-control" 
                                        id="validationCustom05" 
                                        onChange={this.handleChange}
                                        name="CodigoPostal" required/>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" onClick={()=>this.comprobacion} type="submit"> Agregar domicilio</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    domicilios(){
        return this.state.domicilios.map((c)=>
            <div className="col-lg-12 col-md-6 col-sm-12 my-2" key={c.idDomicilio}>
                <div class="card mx-2 p-4 cardDom" onClick={()=>this.seleccionarDomicilio(c)}>
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

    comprobarDomicilios(){
        if(this.state.domicilios.length > 0){
            return(
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <h3 style={{ color: 'red' }} >Seleccionar domicilio</h3>
                        <br/>
                        {this.domicilios()}
                    </div>
                    <div className="col-lg-8 col-md-12">
                        {this.formulario()}
                    </div>
                </div>
            );
        }else{
            return(
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        {this.formulario()}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div class="container-fluid my-2 p-4">
                {this.comprobarDomicilios()}
            </div>
        )
    }
}
export default withRouter(DomicilioComponent)