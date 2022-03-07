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
      productos:[{idProducto:" ", Nombre:" ", Precio:" ", Tamanio:" ", Categoria:{Descripcion:" "},imagen:""}],
      responsive : {
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

  async loadData(){
      const respuesta = await fetch(`http://localhost:5000/product/findAll`,{
              'method':'POST',
               headers : {
              'Content-Type':'application/json'
        },
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      console.log(respuesta)

      this.setState({productos : respuesta});
      console.log(this.state.productos);
  }

  render() {
    return (
      <div class="container-fluid p-8">
        <h1>Inicio</h1>
        <div class="ContenedorIndex">
          <br/><br/><br/>
                <div className="card-header">
                    <div className="container-fluid mt-4" style={{height:'310px', align : "center"}}>
                        <Carousel responsive={this.state.responsive} infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}>
                            {this.state.productos.map((x) => 
                              <div className="slide">
                                <div className="card shadow" style={{height : "250px", borderRadius : "20px"}} >
                                    <img className="card-img-top" src={x.Imagen} height="180" width="200" alt="" style={{borderRadius : "10px 10px 10px 10px"}}/>
                                </div>
                              </div>
                            )}
                        </Carousel>
                    </div>
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
        <br/><br/><br/><br/><br/><br/>
      </div>
    )
  }
}
export default withRouter(HomePageComponent)





