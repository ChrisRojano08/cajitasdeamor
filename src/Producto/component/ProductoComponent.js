import React from "react";
import '../../resources/css/producto.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { ProductoController } from "../controller/ProductoController";
import {Utils} from '../../resources/Utils';

class ProductoComponent extends React.Component {
    constructor() {
        super();
        this.productoController = new ProductoController();

        //Almacena datos
        this.state = {
            productos:{
                idProducto:0,
                Categoria:{
                    Descripcion:" "
                },
                Nombre:" ",
                Precio: " ",
                Descripcion:" ",
                Imagen:" ",
                Tamanio:' '
            },
            Cantidad:1
        }
    }


    //Inicializa funciones
    componentDidMount(){
        if(!this.props.location.data){
            this.props.history.push("/Tienda");
        }else{
            this.setState({productos : this.props.location.data});

            setTimeout(() => {
                console.log(this.state);
                document.getElementById('imgProd').src = this.state.productos.Imagen;
            }, 300);
        }
    }

    changeAmount=()=>{
        this.setState({Cantidad : document.getElementById('cantidadIn').value});
    }

    async agregarCarrito(){
        if(sessionStorage.getItem('idUsuario')){
            let datos={
                idProducto: this.state.productos.idProducto,
                idUsuario: sessionStorage.getItem('idUsuario'),
                Cantidad: this.state.Cantidad
            }

            let respuesta = await this.productoController.addCart(datos);

            if(respuesta[0].status === 'Ok'){
                Utils.swalSuccess(respuesta[0].Mensaje);
                setTimeout(() => {this.props.history.push("/Carrito")}, 1500);
            }else{
                Utils.swalError(respuesta[0].exception);
            }
        }else{
            document.getElementById('modalButton').click();
        }
    }

    irCompra(){
        if(sessionStorage.getItem('idUsuario')){
            const totalE = this.state.productos.Precio*this.state.Cantidad;

            window.localStorage.setItem("productosCompra", JSON.stringify([this.state.productos]));
            window.localStorage.setItem("progresoCompra", 0);
            sessionStorage.setItem("totalCompra", totalE);
            sessionStorage.setItem("cantidadCom", this.state.Cantidad);

            this.props.history.push({
                pathname: '/Compra',
                data: this.state,
                anterior: 'producto'
            })
        }else{
            document.getElementById('modalButton').click();
        }
    }

    render() {
        return (
            <div class="container-fluid ">
                <button type="button" class="btn btn-danger"
                    data-bs-toggle="modal" data-bs-target="#exampleModal" id="modalButton" style={{display:'none'}}>Eliminar</button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">No ha iniciado sesion!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Debe estar registrado e iniciar sesión para comprar productos o agregarlos al carrito.</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() =>this.props.history.push("/Login")}>Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-10 mt-4 ml-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <img src={D1} className="img-thumbnail" alt="Producto" id="imgProd"></img>
                        </div>
                        <div className="col-lg-6">
                            <h4>{this.state.productos.Nombre}</h4>
                            <br/>
                            <h5>Descripción:</h5>
                            <h6>{this.state.productos.Descripcion}</h6>
                            <br/>
                            <h5>Tamaño:</h5>
                            <h6>{this.state.productos.Tamanio}</h6>
                            <br/>
                            <h4>${this.state.productos.Precio}</h4>
                            <br/>
                            <form>
                                <div class="md-3 position-relative">
                                    <h5 class="card-title">Cantidad:</h5>
                                    <div className="col-lg-5">
                                        <input type="number"
                                        class="form-control"
                                        id="cantidadIn"
                                        placeholder=" "
                                        name='Cantidad'
                                        min="1"
                                        onChange={()=>this.changeAmount()}
                                        defaultValue={1}
                                    required />
                                    </div>
                                    
                                </div>
                            </form>

                            <br/>
                            <div className="row justify-content-center">
                                <div className="col-lg-10 m-4">
                                    <button type="button" className="btn btn-primary" style={{width:'40%', height:'60%'}}
                                     onClick={()=>this.irCompra()}><h5>Comprar</h5></button>
                                    <button type="button"
                                        className="btn btn-success m-4" style={{width:'40%', height:'60%'}}
                                        onClick={()=>this.agregarCarrito()}><h5>Agregar al carrito</h5></button>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        )
    }
}
export default withRouter(ProductoComponent)