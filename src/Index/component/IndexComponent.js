import React from "react";
import '../../resources/css/index.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {IndexController} from '../controller/IndexController';

class HomePageComponent extends React.Component {
  constructor() {
    super();
    this.indexController = new IndexController();
    //Almacena datos
    this.state = {
      productos: [{ idProducto: " ", Nombre: " ", Precio: " ", Tamanio: " ", Categoria: { Descripcion: " " }, imagen: " " }],
      responsive: {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1900 },
          items: 7
        },
        desktop2: {
          breakpoint: { max: 1900, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      }
    }
  }


  //Inicializa funciones
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    let respuesta = await this.indexController.findAll();
    this.setState({ productos: respuesta });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 style={{ color: 'red' }} >Inicio</h1>
        <div className="row justify-content-center">
          <div className="card-header bg-light">
            <div className="container-fluid mt-4">
              <Carousel responsive={this.state.responsive} infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}>
                {this.state.productos.map((x) =>
                  <div className="content" key={x.idProducto}>
                      <div className="content-overlay"></div>
                      <img className="content-image card-img-top" src={x.Imagen} height="50" width="300" alt="..." />
                      <div className="content-details fadeIn-bottom">
                        <h4 className="content-title">{x.Nombre}</h4>
                      </div>
                  </div>
                )}
              </Carousel>
            </div>
          </div>

          <br />

          <div className="row justify-content-xxl-center row-cols-1 row-cols-4 g-4 ">
            <div className="col">
              <div className="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Desayuno 1 </h5>
                  <p className="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Tienda" className="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Desayuno 2 </h5>
                  <p className="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" className="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Desayuno 3 </h5>
                  <p className="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" className="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(HomePageComponent)