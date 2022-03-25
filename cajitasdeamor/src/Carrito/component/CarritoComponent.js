import React from "react";
import '../../resources/css/carrito.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { CarritoController } from "../controller/CarritoController";

class CarritoComponent extends React.Component {
    constructor() {
        super();
        this.CarritoController = new CarritoController();

        //Almacena datos
        this.state = {
        }
    }


    //Inicializa funciones
    componentDidMount() {
    }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Carrito</h1>
                <div class="ContenedorCarrito justify-content-center">
                    <div class="ProductoCarrito">
                        <div class="InfoCarrito">
                            <ul class="CarcateristicasCarrito">
                                <li>Producto</li>

                            </ul>
                        </div>
                        <div class="EjemploCarrito">
                            <div class="card mb-3" style={{maxwidth: '270px'}}>
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src={D1} class="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Desayuno 1</h5>
                                            <p class="card-text">$250.00.</p>
                                            <p class="card-text"><small class="text-muted">Cantidad: 2</small></p>
                                            <p class="card-text"><small class="text-muted">Subtotal: $500.00</small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="InfoTotalCarrito">
                        <div class="TotalCarrito">
                            Total:
                        </div>
                        <div class="PrecioCarrito">
                            $500.00
                        </div>
                        <div class="ComprarCarrito">
                            <a href="/Pago"><button class="BtnComprarCarrito">Comprar</button></a>

                        </div>
                        <div class="DediatoriaCarrito">
                            <a href="/Dedicatoria"><button class="BtnDedicatoriaCarrito" href="/Dediactoria">Dedicatoria</button></a>

                        </div>
                    </div>
                </div>

            </div>
           
        )
    }
}
export default withRouter(CarritoComponent)