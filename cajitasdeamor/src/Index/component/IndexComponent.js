import React from "react";
import '../../resources/css/index.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class HomePageComponent extends React.Component {
  constructor() {
    super();

    //Almacena datos
    this.state = {
      productos: [{ idProducto: " ", Nombre: " ", Precio: " ", Tamanio: " ", Categoria: { Descripcion: " " }, imagen: "" }],
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
    this.loadData()
  }

  async loadData() {
    const respuesta = await fetch(`http://127.0.0.1:5000/product/findAll`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .catch(error => console.log(error))

    console.log(respuesta)

    this.setState({ productos: respuesta });
    console.log(this.state.productos);
  }

  render() {
    return (
      <div class="container-fluid">
        <h1 style={{ color: 'red' }} >Inicio</h1>
        <div class="row justify-content-center">

          <div className="card-header">
            <div className="container-fluid mt-4" >
              <Carousel responsive={this.state.responsive} infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}>
                {this.state.productos.map((x) =>
                  <div className="slide">
                    <div className="card shadow" >
                      <img className="card-img-top" src={x.Imagen} height="180" width="200" alt="" />
                    </div>
                  </div>
                )}
              </Carousel>
            </div>
          </div>

          <br />

          <div class="row  row-cols-1 row-cols-md-4 g-4 ">
            <div class="col">
              <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Desayuno 1 </h5>
                  <p class="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Desayuno 1 </h5>
                  <p class="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Desayuno 1 </h5>
                  <p class="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Desayuno 1 </h5>
                  <p class="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Producto" class="btn btn-primary">Ver Producto</a>
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