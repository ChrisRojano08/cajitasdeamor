import React from "react";
import '../../resources/css/producto.css';
import { withRouter } from "react-router";
import {DedicatoriaController} from "../controller/DedicatoriaController";
import ImgsProds from '../../MenuUsuario/component/ProdImagesComponent';
import { Utils } from "../../resources/Utils";

class ProductoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dedicatoriaController = new DedicatoriaController();

        //Almacena datos
        this.state = {
            compra: [[{
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
                    Nombre: 'a',
                    Imagen: 's'
                }],[{
                        idProducto: 0,
                        Nombre: 'a',
                        Imagen: 's' 
                    }
                ]],
                Estado: ' ',
                MetodoPago: {},
                Domicilio: {},
                Imagen: ' '
            }]],
            Dedicatoria:{
                Dedicatoria: ' ',
                Nombre: ' ',
                idCompra: ' '
            }
        }
    }

    //Inicializa funciones
    componentDidMount() {
        if(this.props.location.anterior === 'menuUsuario'){
            this.setState({compra: this.props.location.data});
            
            setTimeout(() => {
                const datosDed={
                    Dedicatoria: this.state.compra.Dedicatoria,
                    Nombre: this.state.compra.Nombre,
                    idCompra: this.state.compra.idCompra
                }
                this.setState({Dedicatoria: datosDed});
            }, 300);
            
        }
    }

    modificarDedicatoria = async event =>{
        event.preventDefault();

        if(this.state.Dedicatoria.Dedicatoria !== '' || this.state.Dedicatoria.Dedicatoria !== ' '){
            if(this.state.Dedicatoria.Nombre !== '' || this.state.Dedicatoria.Nombre !== ' '){
                const respuesta = await this.dedicatoriaController.actualizarDedicatoria(this.state.Dedicatoria);

                if(respuesta.status === 'Ok'){
                    Utils.swalSuccess(respuesta.Mensaje);
                }else{
                    if(respuesta.exception){
                        Utils.swalError(respuesta.exception);
                    }else{
                        Utils.swalError(respuesta.status);
                    }
                    
                }

                setTimeout(() => {
                    this.props.history.push('/menuUsuario');
                }, 500);
            }
        }
    }

    handleChange=e=> {
        this.setState({
            Dedicatoria : {
                ...this.state.Dedicatoria,
                [e.target.name]: e.target.value
            }
        })
    }

    seleccionarDedicatoria=event=>{
        event.preventDefault();

        if(this.state.Dedicatoria.Dedicatoria !== "" && this.state.Dedicatoria.Dedicatoria !== " "){
            if(this.state.Dedicatoria.Nombre !== "" && this.state.Dedicatoria.Nombre !== " "){
                this.props.handler(3, this.state.Dedicatoria);
            }
        }
    }

    mostrarFormUpd=_=>{
        return(
            <div className="row p-4">
                <h1 style={{ color: 'red' }} className="p-4 text-center mb-4">Modificar dedicatoria</h1>
                <br/>
                <div className="col-lg-4 col-md-4">
                    <ImgsProds data={this.state.compra.Productos} />
                </div>
                <div className="col-lg-6 col-md-6">
                    <form className="row g-4 needs-validation justify-content-center "
                        onSubmit={this.modificarDedicatoria}>
                        <div className="md-3 position-relative">
                            <label className="form-label"><h5>Nombre</h5></label>
                            <input type="text"
                                className="form-control"
                                name='Nombre'
                                value={this.state.Dedicatoria.Nombre}
                                onChange={this.handleChange} required />
                        </div>
                        <div className="md-3 position-relative">
                            <h5 className="card-title">Dedicatoria</h5>
                            <textarea className="form-control" name="Dedicatoria"
                            rows="3" value={this.state.Dedicatoria.Dedicatoria}
                            onChange={this.handleChange}  required/>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" type="submit">Modificar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    mostrarFormInsert=_=>{
        return(
            <div className="row p-4 justify-content-center">
                <h3 style={{ color: 'red' }} className="p-4">Agregar dedicatoria</h3>
                <br/>
                <div className="col-lg-6 col-md-6">
                    <form className="row g-4 needs-validation justify-content-center "
                        onSubmit={this.seleccionarDedicatoria}>
                        <div className="md-3 position-relative">
                            <label className="form-label"><h5>Nombre</h5></label>
                            <input type="text"
                                className="form-control"
                                name='Nombre'
                                value={this.state.Dedicatoria.Nombre}
                                onChange={this.handleChange} required />
                        </div>
                        <div className="md-3 position-relative">
                            <h5 className="card-title">Dedicatoria</h5>
                            <textarea className="form-control" name="Dedicatoria"
                            rows="3" value={this.state.Dedicatoria.Dedicatoria}
                            onChange={this.handleChange}  required/>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary" type="submit">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid my-4">
                <div className="row">
                    {this.props.productos ? <>{this.mostrarFormInsert()}</> : <>{this.mostrarFormUpd()}</>} 
                </div>
            </div>
        )
    }
}
export default withRouter(ProductoComponent)