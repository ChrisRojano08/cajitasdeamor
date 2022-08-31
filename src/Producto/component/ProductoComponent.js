import React from "react";
import '../../resources/css/producto.css';
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
                console.log(this.state);
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

            let respuesta = await this.productoController.addCart(datos);

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

    irCompra() {
        if (sessionStorage.getItem('idUsuario')) {
            const totalE = this.state.productos.Precio * this.state.Cantidad;
            console.log(totalE);

            window.localStorage.setItem("productosCompra", JSON.stringify([this.state.productos]));
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
            <div class="container-fluid ">
                <br />
                <button type="button" class="btn btn-danger"
                    data-bs-toggle="modal" data-bs-target="#exampleModal" id="modalButton" style={{ display: 'none' }}>Eliminar</button>

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
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => this.props.history.push("/Login")}>Iniciar sesion</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">

                        <div class="col-5"  >
                            <img src={D1} className="img-thumbnail" alt="Producto" id="imgProd"></img>
                        </div>
                        <div class="col">
                            <div>
                                <button type="button" class="btn btn-primary position-relative">
                                   <h1>{this.state.productos.Nombre}
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">New
                                    </span>
                                </h1>
                                </button>
                                
                            </div>
                            <br /><br />




                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <h5>Descripcion</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            {this.state.productos.Descripcion}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <h5>Tamaño</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            {this.state.productos.Tamanio}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <br /><br />
                            <h3>${this.state.productos.Precio}</h3>

                        </div>
                        <div class="col-3"  >

                            <div class="d-grid gap-2 col-5 mx-auto">
                                <h5 >Cantidad:</h5>
                                <div className="col-lg-5">
                                    <input type="number"
                                        class="form-control"
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
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button class="btn btn-primary" type="button" onClick={() => this.irCompra()}><i class="fi fi-rr-shopping-bag"></i> Comprar</button>
                                <button class="btn btn-success" type="button" onClick={() => this.agregarCarrito()}><i class="fi fi-rr-shopping-cart"></i> Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default withRouter(ProductoComponent)