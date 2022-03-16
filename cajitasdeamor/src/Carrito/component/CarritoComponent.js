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
                                <li>Cantidad</li>
                                <li>Precio Unidad</li>
                            </ul>
                        </div>
                        <div class="EjemploCarrito">
                            <div>

                            </div>
                        </div>
                    </div>
                    <div class= "InfoTotalCarrito">
                        <div class="TotalCarrito">
                                Total:
                        </div>
                        <div class="PrecioCarrito">
                            $.00
                        </div>
                        <div class="ComprarCarrito">
                            <button class="BtnComprarCarrito">Comprar</button>
                        </div>
                        <div class="DediatoriaCarrito">
                            <button class="BtnDedicatoriaCarrito">Dedicatoria</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CarritoComponent)