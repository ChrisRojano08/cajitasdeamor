import React from "react";
import '../../resources/css/producto.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import {DedicatoriaController} from "../controller/DedicatoriaController";

class ProductoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.comprasController = new DedicatoriaController();

        //Almacena datos
        this.state = {
            idCompra: -1,
            compra: [{
                Dedicatoria: " ",
                Nombre: " "
            }]
        }
    }


    //Inicializa funciones
    componentDidMount() {
        //this.loadData();
    }

    async loadData() {
        let respuesta = await this.DedicatoriaController.findDedicatoria();
        this.setState({compra: respuesta});
    }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Desayuno</h1>
                <div class="ContenedorProducto">
                    <div class="imgProducto">
                        <img class="D1Product" src={D1} />
                    </div>
                    <div class="InformacionProducto">
                    <div class="DesProducto">
                            Nombre:<br />
                        </div>
                        <input type="text" class="form-control" id="validationCustom01"  required/>
                        <div class="DesProducto">
                            Dedicatoria:<br />
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="BotonesProducto">
                            <div class="btn-1Productos">
                                <button class="AgregarCarritoProducto">Guardar dedicatoria</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ProductoComponent)