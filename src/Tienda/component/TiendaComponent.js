import React from "react";
import '../../resources/css/tienda.css';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";
import {Utils} from '../../resources/Utils';

class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.tiendaController = new TiendaController();

        //Almacena datos
        this.state = {
            productos: { idProducto: " ", 
                Nombre: " ", 
                Precio: " ", 
                Tamanio: " ", 
                Categoria: { Descripcion: " " }, imagen: " " },
            prodsFilt: [],
            Cantidad:1
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

    async agregarCarrito(e){
        console.log(e)
        
        if(sessionStorage.getItem('idUsuario')){
            let datos={
                idProducto: e,
                idUsuario: sessionStorage.getItem('idUsuario'),
                Cantidad: this.state.Cantidad
            }
            
            let respuesta = await this.tiendaController.addCart(datos);
            console.log(datos);
            
            if(respuesta[0].status === 'Ok'){
                Utils.swalSuccess(respuesta[0].Mensaje);
                setTimeout(() => {this.props.history.push("/Carrito")}, 1500);
            }else{
                Utils.swalError(respuesta[0].exception);
            }
        }else{
            document.getElementById('modalButton').click();
        }
    }

    mostrarProducto = e => {
        this.props.history.push({
            pathname: '/Producto',
            data: e
        })
    }

    mostrarProds() {
        return this.state.prodsFilt.map((c) =>
                <div class="col-lg-3 col-md-4 col-sm-4" key={c.id}>
                    <div class="card text-dark bg-light mb-3">
                        <img src={c.Imagen} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{c.Nombre}</h5>
                            <p class="card-text">${c.Precio}</p>
                            <button class="btn btn-primary" onClick={()=>this.mostrarProducto(c)}>Ver Producto</button>
                            <button class="btn btn-success"  onClick={()=>this.agregarCarrito(c.idProducto)}>Agregar al carrito</button>
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
                            <li>Todos</li>
                            <li>Padre</li>
                            <li>Madre</li>
                            <li>Felicitaciones</li>
                            <li>Graduacion</li>
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