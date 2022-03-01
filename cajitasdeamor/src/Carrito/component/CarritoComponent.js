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
            <div class="container-fluid p-8">
                <h1>Carrito De Compras</h1>
                <div class="ContenedorCarrito">
                    <div class="ProductoCarrito">
                        <div class="InfoCarrito">
                            <ul class="CarcateristicasCarrito">
                                <li>Producto</li>
                                <li>Precio</li>
                                <li>Cantidad</li>
                                <li>Preciio Unidad</li>
                            </ul>
                        </div>
                        <div class="EjemploCarrito">
                            <div>

                            </div>
                        </div>
                    </div>
                    <div class= "TotalCarrito">
                        <div class="TotalCarrito">
                                Total:
                        </div>
                        <div class="PrecioCarrito">
                            $350.00
                        </div>
                        <div class="ComprarCarrito">
                            <button>Comprar</button>
                        </div>
                        <div>
                            <button>Dedicatoria</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CarritoComponent)