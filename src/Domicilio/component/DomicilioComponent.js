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
                Numero: '',
                Calle: '',
                Colonia: '',
                Municipio: '',
                Estado: '',
                CodigoPostal: '',
                idUsuario:sessionStorage.getItem("idUsuario")
            },
            domicilios: [{
                Calle: '',
                CodigoPostal: '',
                Colonia: '',
                Estado: '',
                Municipio: '',
                Numero: '',
                idDomicilio: -1
            }]
        }
    }

    //Inicializa funciones
    componentDidMount() {
        if(this.props.location.anterior === 'menuUsuario'){
            setTimeout(() => {
                this.setState({domicilio: this.props.location.data});
            }, 200);
        }else{
            this.loadData();
        }
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
            if(this.state.domicilio.CodigoPostal < 10000 || this.state.domicilio.CodigoPostal > 99999){
                Utils.swalError('Ingrese un código postal valido');
            }else{
                if(this.props.location.anterior === 'menuUsuario'){
                    const respuesta = await this.domicilioController.update(this.state.domicilio);

                    if(respuesta.status==='Ok'){
                        Utils.swalSuccess("El domicilio fue editado correctamente!");
        
                        setTimeout(() => {
                            this.props.history.push('/menuUsuario')
                            window.location.reload(true);
                        }, 1000);
                    }else if (respuesta.status==='Error'){
                        Utils.swalError("Ocurrió un error al editar al usuario!");
                    }else{
                        Utils.swalError(respuesta.status);
                    }
                }else{
                    const respuesta = await this.domicilioController.insert(this.state.domicilio);

                    if(respuesta.status==='Ok'){
                        Utils.swalSuccess("El domicilio fue agregado correctamente!");
        
                        setTimeout(() => window.location.reload(true), 1000);
                    }else if (respuesta.status==='Error'){
                        Utils.swalError("Ocurrió un error al insertar al usuario!");
                    }else{
                        Utils.swalError(respuesta.status);
                    }
                }
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
                {this.props.location.anterior === 'menuUsuario' ?
                    <h3 className="text-center" style={{ color: 'red' }} >Editar domicilio</h3> :
                    <h3 className="text-center" style={{ color: 'red' }} >Agregar domicilio</h3>
                }
                <br/>
                <div className="card">
                    <div className="card-header">
                        Ubicacion
                    </div>
                    <div className="card-body">
                        <form className="row g-3 needs-validation justify-content-center" 
                            onSubmit={this.comprobacion} >
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="numeroDom" className="form-label">Número</label>
                                <input type="number" 
                                        className="form-control" 
                                        id="domTextIn"
                                        value={this.state.domicilio.Numero}
                                        onChange={this.handleChange}
                                        name="Numero"  required/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="calleDom" className="form-label">Calle </label>
                                <input type="text" 
                                        className="form-control" 
                                        id="calleDom"
                                        value={this.state.domicilio.Calle}
                                        onChange={this.handleChange}
                                        name="Calle" required/>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12">
                                <label htmlFor="coloniaDom" className="form-label">Colonia</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="coloniaDom"
                                        value={this.state.domicilio.Colonia}
                                        onChange={this.handleChange} 
                                        name="Colonia"  required/>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12">
                                <label htmlFor="validationCustom03" className="form-label">Municipio</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="municipoDom" 
                                        value={this.state.domicilio.Municipio}
                                        onChange={this.handleChange}
                                        name="Municipio" required/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="validationCustom04" className="form-label">Estado</label>
                                <input type="text" 
                                        className="form-control" 
                                        id="validationCustom03" 
                                        onChange={this.handleChange}
                                        value={this.state.domicilio.Estado}
                                        name="Estado" required/>
                            </div> 
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="validationCustom05" className="form-label">Código postal</label>
                                <input type="number" 
                                        className="form-control" 
                                        id="validationCustom05" 
                                        onChange={this.handleChange}
                                        value={this.state.domicilio.CodigoPostal}
                                        name="CodigoPostal" required/>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary" onClick={()=>this.comprobacion} type="submit">
                                {this.props.location.anterior === 'menuUsuario' ?
                                    "Editar domicilio":
                                    "Agregar domicilio"
                                }
                                </button>
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
                <div className="card mx-2 p-4 cardDom" onClick={()=>this.seleccionarDomicilio(c)}>
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

    comprobarDomicilios(){
        if(this.state.domicilios[0].idDomicilio !== -1){
            return(
                <div className="row">
                    <div className="col-lg-4 col-md-12 mb-4">
                        <h3 className="text-center" style={{ color: 'red' }} >Seleccionar domicilio</h3>
                        <br/>
                        <div className="row justify-conten-center">
                            {this.domicilios()}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 mt-4">
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
            <div className="container-fluid my-2 p-4">
                {this.comprobarDomicilios()}
            </div>
        )
    }
}
export default withRouter(DomicilioComponent)