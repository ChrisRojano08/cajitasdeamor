import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { DomicilioController } from "../controller/DomicilioController";
import {Utils} from '../../resources/Utils'; 


class DomicilioComponent extends React.Component {
    constructor() {
        super();
        this.DomicilioController = new DomicilioController();

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
                    
            }
        }
    }


    //Inicializa funciones
    componentDidMount() {
    }

    comprobacion= async event=>{    
        event.preventDefault()

        if(sessionStorage.getItem("idUsuario") === null){
            Utils.swalError("necesita iniciar sesion para poder agregar una direccion!");
        }else{
            let resp = await this.DomicilioController.insert(this.state.domicilio);
            Utils.swalSuccess("El domicilio fue agregado correctamente!");
            setTimeout(()=>window.location.reload(true), 1500);
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

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Domicilio</h1>
                <div class="card">
                    <div class="card-header">
                        Ubicacion
                    </div>
                    <div class="card-body">
                        <form class="row g-3 needs-validation" 
                            onSubmit={this.comprobacion} novalidate>
                            <div class="col-md-4">
                                <label for="validationCustom01" class="form-label">Numero</label>
                                <input type="number" 
                                        class="form-control" 
                                        id="validationCustom01"
                                        onChange={this.handleChange}
                                        name="Numero"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Calle </label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom02" 
                                        onChange={this.handleChange}
                                        name="Calle" required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Colonia</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom02"
                                        onChange={this.handleChange} 
                                        name="Colonia"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom03" class="form-label">Municipio</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom03" 
                                        onChange={this.handleChange}
                                        name="Municipio" required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom04" class="form-label">Estado</label>
                                <input type="text" 
                                        class="form-control" 
                                        id="validationCustom03" 
                                        onChange={this.handleChange}
                                        name="Estado" required/>
                            </div> 
                            <div class="col-md-4">
                                <label for="validationCustom05" class="form-label">C.P.</label>
                                <input type="number" 
                                        max="99999" 
                                        class="form-control" 
                                        id="validationCustom05" 
                                        onChange={this.handleChange}
                                        name="CodigoPostal" required/>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" onClick={()=>this.comprobacion} type="submit"> Enviar Formulario</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(DomicilioComponent)