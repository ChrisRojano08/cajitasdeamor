import React from "react";
import '../../resources/css/index.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { IndexController } from "../controller/IndexController";
import 'bootstrap/dist/css/bootstrap.css';


class HomePageComponent extends React.Component {
  constructor() {
    super();
    this.IndexController = new IndexController();

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
        <h1>Inicio</h1>
        <div class="ContenedorIndex">
          <div class="CarruselIndex">
            aqui va el carrusel

          </div>
          <div class="ProductosIndex">
            <a>
              <div class="ProductoIndex">
                <div>
                  <img class="D1Index" src={D1} />
                </div>
                <div class="NombreIndex">
                  Desayuno 1
                </div>
                <div class="PrecioIndex">
                  $350.00
                </div>
              </div>
            </a>
            <a href="/Producto">
              <div class="ProductoIndex">
                <div>
                  <img class="D1Index" src={D1} />
                </div>
                <div class="NombreIndex">
                  Desayuno 1
                </div>
                <div class="PrecioIndex">
                  $350.00
                </div>
              </div>
            </a>
            <a href="/Producto">
              <div class="ProductoIndex">
                <div>
                  <img class="D1Index" src={D1} />
                </div>
                <div class="NombreIndex">
                  Desayuno 1
                </div>
                <div class="PrecioIndex">
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
export default withRouter(HomePageComponent)





