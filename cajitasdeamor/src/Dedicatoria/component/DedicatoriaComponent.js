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

        const respuesta = await this.dedicatoriaController.actualizarDedicatoria(this.state.Dedicatoria);

        if(respuesta.status === 'Ok'){
            Utils.swalSuccess(respuesta.Mensaje);
        }else{
            Utils.swalError(respuesta.exception);
        }

        setTimeout(() => {
            this.props.history.push('/menuUsuario');
        }, 500);
    }

    handleChange=e=> {
        this.setState({
            Dedicatoria : {
                ...this.state.Dedicatoria,
                [e.target.name]: e.target.value
            }
        })
    }

    seleccionarDedicatoria=()=>{
        this.props.handler(3, this.state.Dedicatoria);
    }

    mostrarFormUpd=_=>{
        return(
            <div className="row p-4">
                <h1 style={{ color: 'red' }} className="p-4">Modificar dedicatoria</h1>
                <br/>
                <div className="col-lg-4 col-md-4">
                    <ImgsProds data={this.state.compra.Productos} />
                </div>
                <div className="col-lg-6 col-md-6">
                    <form class="row g-4 needs-validation justify-content-center "
                        onSubmit={this.modificarDedicatoria} novalidate>
                        <div class="md-3 position-relative">
                            <label class="form-label"><h5>Nombre</h5></label>
                            <input type="text"
                                class="form-control"
                                name='Nombre'
                                value={this.state.Dedicatoria.Nombre}
                                onChange={this.handleChange} required />
                        </div>
                        <div class="md-3 position-relative">
                            <h5 class="card-title">Dedicatoria</h5>
                            <textarea class="form-control" name="Dedicatoria"
                            rows="3" value={this.state.Dedicatoria.Dedicatoria}
                            onChange={this.handleChange}  required/>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary" type="submit">Modificar</button>
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
                    <form class="row g-4 needs-validation justify-content-center "
                        onSubmit={this.seleccionarDedicatoria} novalidate>
                        <div class="md-3 position-relative">
                            <label class="form-label"><h5>Nombre</h5></label>
                            <input type="text"
                                class="form-control"
                                name='Nombre'
                                value={this.state.Dedicatoria.Nombre}
                                onChange={this.handleChange} required />
                        </div>
                        <div class="md-3 position-relative">
                            <h5 class="card-title">Dedicatoria</h5>
                            <textarea class="form-control" name="Dedicatoria"
                            rows="3" value={this.state.Dedicatoria.Dedicatoria}
                            onChange={this.handleChange}  required/>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-primary" type="submit">Agregar dedicatoria</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div class="container-fluid my-4">
                <div className="row">
                    {this.props.productos ? <>{this.mostrarFormInsert()}</> : <>{this.mostrarFormUpd()}</>} 
                </div>
                

            </div>
        )
    }
}
export default withRouter(ProductoComponent)