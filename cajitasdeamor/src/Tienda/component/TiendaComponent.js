import React from "react";
import '../../resources/css/tienda.css';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";



class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.tiendaController = new TiendaController();

        //Almacena datos
        this.state = {
            productos: [{ idProducto: " ", Nombre: " ", Precio: " ", Tamanio: " ", Categoria: { Descripcion: " " }, imagen: " " }],
            prodsFilt: []
        }
    }


    //Inicializa funciones
    componentDidMount() {
        this.loadData();
      }
    
    async loadData() {
       let respuesta = await this.tiendaController.findAll();
       this.setState({ productos: respuesta });
       this.setState({ prodsFilt: respuesta });
    }

    mostrarProds() {
        return this.state.prodsFilt.map((c) =>
                <div class="col-lg-3 col-md-4 col-sm-4" key={c.id}>
                    <div class="card text-dark bg-light mb-3">
                        <img src={c.Imagen} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{c.Nombre}</h5>
                            <p class="card-text">{c.Descripcion}</p>
                            <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                        </div>
                    </div>
                </div>
           )
       }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Productos</h1>
                <br/>
                <div class="container-fluid justify-content-center">
                    <div class="SelectorTien">
                        <ul class="CategoriaTien">
                            <li><a href="#">Todos</a></li>
                            <li><a href="#">Padre</a></li>
                            <li><a href="#">Madre</a></li>
                            <li><a href="#">Felicitaciones</a></li>
                            <li><a href="#">Graduacion</a></li>
                        </ul>
                    </div>

                    <br />

                    <div class="row justify-content-center aling-item-center row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4 ">
                        {this.mostrarProds()}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(TiendaComponent)