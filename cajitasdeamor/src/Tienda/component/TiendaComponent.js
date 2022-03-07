import React from "react";
import '../../resources/css/tienda.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";



class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.TiendaController = new TiendaController();

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
                <h1>Tienda</h1>
                <div class="ContenedorTien">
                    <div class="SelectorTien">
                        <ul class="CategoriaTien">
                            <li><a href="#">Todos</a></li>
                            <li><a href="#">Padre</a></li>
                            <li><a href="#">Madre</a></li>
                            <li><a href="#">Felicitaciones</a></li>
                            <li><a href="#">Graduacion</a></li>
                        </ul>
                    </div>
                    <div class="ProductosTien">
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="ProductosTien">
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                        <a href="/Producto">
                            <div class="ProductoTien">
                                <div>
                                    <img class="D1Tien" src={D1} />
                                </div>
                                <div class="NombreTien">
                                    Desayuno 1
                                </div>
                                <div class="PrecioTien">
                                    $350.00
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(TiendaComponent)