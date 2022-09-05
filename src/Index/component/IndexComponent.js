import React from "react";
import '../../resources/css/index.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IndexController } from '../controller/IndexController';
import ImgsProds from '../../MenuUsuario/component/ProdImagesComponent';

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
      },
      productosShop: [{
        idCarrito: 0,
        Cantidad: 0,
        Producto: [{
          Categoria: {
            Descripcio: ' '
          },
          Nombre: ' ',
          Imagen: ' ',
          Precio: ' '
        }],
        Subtotal: 0
      }],
      Total: -1
    }
  }


  //Inicializa funciones
  componentDidMount() {
    this.loadData();

    setTimeout(() => {
      if (window.localStorage.getItem('productosCompra')) {
        this.setState({ productosShop: JSON.parse(window.localStorage.getItem('productosCompra')) });
        this.setState({ Total: sessionStorage.getItem('totalCompra') });
      } else {
        this.setState({ Total: -1 });
      }
    }, 100);
  }

  async loadData() {
    const respuesta = await this.indexController.findAll();

    if (!respuesta) {
      this.props.history.push('/ErrorDelServidor');
    }

    this.setState({ productos: respuesta });
  }

  mostrarNombres = _ => {
    switch (this.state.productosShop.length) {
      case 0:
        return (<h1>ERROR-ERROR-ERROR</h1>)
      case 1:
        return (<p class="card-text">&nbsp;{this.state.productosShop[0].Nombre}</p>)
      case 2: case 3:
        let nombs = '';
        this.state.productosShop.forEach(c => {
          nombs += c.Producto[0].Nombre + ", ";
        })
        nombs = nombs.substring(0, nombs.length - 2);
        return (
          <p class="card-text">{nombs}</p>
        )
      default:
        const nomb = this.state.productosShop[0].Producto[0].Nombre + ',' + this.state.productosShop[1].Producto[0].Nombre + ',' +
          this.state.productosShop[2].Producto[0].Nombre + ', ...';
        return (
          <p class="card-text">{nomb}</p>
        )
    }
  }

  mostrarImgs = _ => {
    switch (this.state.productosShop.length) {
      case 0:
        return (<h1>ERROR-ERROR-ERROR</h1>)
      case 1:
        const prodsA = [[
          {
            Imagen: this.state.productosShop[0].Imagen
          }
        ]]

        return (<ImgsProds data={prodsA} />)
      default:
        let imgsAr = [];
        this.state.productosShop.forEach(c => {
          Array.prototype.push.apply(imgsAr, [c.Producto]);
        })

        return (
          <div className="col-xl-10 col-lg-10 col-md-4">
            {<ImgsProds data={imgsAr} />}
          </div>
        )
    }
  }

  continueShopp() {
    if (sessionStorage.getItem('idUsuario')) {
      if (this.state.Total !== -1) {
        return (
          <div className="row justify-content-center my-4">
            <div className="col-10">
              <div className="card mb-3 text-white bg-secondary p-4" style={{'border':'5px'}}>
                <div className="row g-0">
                  <div className="col-md-4">
                    {this.mostrarImgs()}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">Continua con tu compra</h4>
                      <p className="card-text mb-2">{this.mostrarNombres()}</p>
                      <p className="card-text mt-4"><a>Ir a compra...</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )
      } else {
        return (
          <></>
        );
      }
    } else {
      return (
        <></>
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <br />
        <h1 style={{ color: 'red' }} className="text-center">Inicio</h1>
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

          <br /><br />

          <div className="row justify-content-xxl-center row-cols-1 row-cols-4 g-4 ">
            <div className="col">
              <div className="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Desayuno 1 </h5>
                  <p className="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito, fruta con yogurt,
                    jugo y un cuernito preparado</p>
                  <a href="/Tienda" className="btn btn-primary">Ver más productos</a>
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
                  <a href="/Tienda" className="btn btn-primary">Ver más productos</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                <img src={D1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Desayuno 3 </h5>
                  <p className="card-text">Desayuno complementario para cualquier dia,
                    el cual contien, un cuernito</p>
                  <a href="/Producto" className="btn btn-primary">Ver más productos</a>
                </div>
              </div>
            </div>
          </div>

          <br /><br />

          {this.continueShopp()}

        </div>
      </div>
    )
  }
}
export default withRouter(HomePageComponent)