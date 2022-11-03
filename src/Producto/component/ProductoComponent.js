import React from "react";
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { ProductoController } from "../controller/ProductoController";
import { Utils } from '../../resources/Utils';

class ProductoComponent extends React.Component {
    constructor() {
        super();
        this.productoController = new ProductoController();

        //Almacena datos
        this.state = {
            productos: {
                idProducto: 0,
                Categoria: {
                    Descripcion: " "
                },
                Nombre: " ",
                Precio: " ",
                Descripcion: " ",
                Imagen: " ",
                Tamanio: ' '
            },
            Cantidad: 1
        }
    }

    //Inicializa funciones
    componentDidMount() {
        if (!this.props.location.data) {
            this.props.history.push("/Tienda");
        } else {
            this.setState({ productos: this.props.location.data });

            setTimeout(() => {
                document.getElementById('imgProd').src = this.state.productos.Imagen;
            }, 300);
        }
    }

    changeAmount = () => {
        this.setState({ Cantidad: document.getElementById('cantidadIn').value });
    }

    async agregarCarrito() {
        if (sessionStorage.getItem('idUsuario')) {
            let datos = {
                idProducto: this.state.productos.idProducto,
                idUsuario: sessionStorage.getItem('idUsuario'),
                Cantidad: this.state.Cantidad
            }

            const respuesta = await this.productoController.addCart(datos);

            if (respuesta[0].status === 'Ok') {
                Utils.swalSuccess(respuesta[0].Mensaje);
                setTimeout(() => { this.props.history.push("/Carrito") }, 1500);
            } else {
                Utils.swalError(respuesta[0].exception);
            }
        } else {
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
        } else {
            document.getElementById('modalButton').click();
        }
    }

    render() {
        return (
            <div className="container-fluid ">
                <br />
                <button type="button" className="btn btn-danger"
                    data-bs-toggle="modal" data-bs-target="#exampleModal" id="modalButton" style={{ display: 'none' }}>Eliminar</button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">No ha iniciado sesion!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">Debe estar registrado e iniciar sesión para comprar productos o agregarlos al carrito.</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => this.props.history.push("/Login")}>Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{'padding':'2%'}}>
                    <div className="row justify-content-center">
                        <div className="my-4 mt-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-8"  >
                            <img src={D1} className="imgProdt" alt="Producto" id="imgProd" />
                        </div>
                        <div className="my-4 mt-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                            <div>
                                <button type="button" className="btn btn-primary position-relative">
                                   <h1>{this.state.productos.Nombre}
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">New
                                    </span>
                                </h1>
                                </button>
                                
                            </div>
                            <br /><br />
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <h5>Descripcion</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {this.state.productos.Descripcion}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <h5>Tamaño</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {this.state.productos.Tamanio}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <h5>Precio</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            ${this.state.productos.Precio}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 mt-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12"  >

                            <div className="d-grid gap-2 col-5 mx-auto">
                                <h5 >Cantidad:</h5>
                                <div className="col-lg-5">
                                    <input type="number"
                                        className="form-control"
                                        id="cantidadIn"
                                        placeholder=" "
                                        name='Cantidad'
                                        min="1"
                                        onChange={() => this.changeAmount()}
                                        defaultValue={1}
                                        required />
                                </div>
                            </div>
                            <br />
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-primary" type="button" onClick={() => this.irCompra()}><i className="fi fi-rr-shopping-bag"></i> Comprar</button>
                                <button className="btn btn-success" type="button" onClick={() => this.agregarCarrito()}><i className="fi fi-rr-shopping-cart"></i> Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ProductoComponent)