import React from "react";
import '../../resources/css/producto.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { ProductoController } from "../controller/ProductoController";


class ProductoComponent extends React.Component {
    constructor() {
        super();
        this.ProductoController = new ProductoController();

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
                <h1>Desayuno 1</h1>
                <div class="ContenedorProducto">
                    <div class="imgProducto">
                        <img class="D1Product" src={D1} />
                    </div>
                    <div class="InformacionProducto">
                        <div class="DesProducto">
                            Descripcion:<br/>
                        </div>
                        <div class="DescripcionProducto">
                            Desayuno complementario para cualquier dia, <br/>el cual contien, un cuernito, fruta con yogurt, <br/>jugo y un cuernito preparado
                        </div>
                        <div class="PrecioProducto">
                            $350.00
                        </div>
                        <div class="BotonesProducto">
                            <div class="btn-1Productos">
                                <button class="ComprarProducto">COMPRAR</button>
                            </div>
                            <div class="btn-1Productos">
                                <button class="AgregarCarritoProducto">AGREGAR AL CARRITO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ProductoComponent)