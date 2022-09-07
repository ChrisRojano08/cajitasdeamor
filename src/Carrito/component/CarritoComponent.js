import React from "react";
import '../../resources/css/carrito.css';
import { withRouter } from "react-router";
import { CarritoController } from "../controller/CarritoController";
import {Utils} from '../../resources/Utils';
import ImgsProds from '../../MenuUsuario/component/ProdImagesComponent';

class CarritoComponent extends React.Component {
    constructor() {
        super();
        this.carritoController = new CarritoController();

        //Almacena datos
        this.state = {
            productos:[{
                idCarrito: 0,
                Cantidad: 0,
                Producto:[{
                    Categoria:{
                        Descripcio:' '
                    },
                    Nombre:' ',
                    Imagen:' ',
                    Precio:' '
                }],
                Subtotal: 0
            }],
            Total: 0,
            idCarrito:-1
        }
    }


    //Inicializa funciones
    componentDidMount() {
        if(sessionStorage.getItem("nombre")){
            this.loadData();
        }
    }
    
    async loadData(){
        let datos = {idUsuario: sessionStorage.getItem("idUsuario")}
        let respuesta = await this.carritoController.findByUserId(datos);
        this.setState({ Total: respuesta[1].Total });
        this.setState({ productos: respuesta[0] });
        
        if(respuesta.status !== 'Vacio'){
            this.setState({ Total: respuesta[1].Total });
            this.setState({ productos: respuesta[0] });
        }else{
            this.setState({ Total: -1 });
        }
    }

    delete = () => {
        this.deleteCart();
    }

    async deleteCart(){
        let datos = {idCarrito: this.state.idCarrito};
        let respuesta = await this.carritoController.delete(datos);

        if(respuesta.status === 'Ok'){
            Utils.swalSuccess(respuesta.Mensaje);
            setTimeout(()=> window.location.reload(true), 800);
        }else{
            Utils.swalError(respuesta.exception);
        }
    }

    async changeAmount(c){
        let data = {
            idCarrito: c.idCarrito, cantidad:document.getElementById(c.idCarrito).value
        };
        
        let respuesta =  await this.carritoController.updateCart(data);
    }

    renderNoLogeado(){
        return(
            <div class="row justify-content-center">
                <div className="col-lg-11 text-center">
                    <h3>No ha iniciado sesion!</h3>
                    <h4>Registrese o inicie sesión para poder ver y guardar productos en el carrito de compras.</h4>
                </div>
            </div>
        );
    }
    
    renderVacio(){
        return(
            <div class="row justify-content-center mt-4">
                <div className="col-lg-11">
                    <h3>El carrito está vacio!</h3>
                    <h4>Visite la tienda y revise nuestros productos.</h4>
                </div>
            </div>
        );
    }
    
    irCompra(){
        window.localStorage.setItem("productosCompra", JSON.stringify(this.state.productos));
        sessionStorage.setItem("totalCompra", this.state.Total);

        this.props.history.push({
            pathname: '/Compra',
            data: this.state.productos,
            total: this.state.Total,
            anterior: 'carrito'
        })
    }

    setDatos = (id) =>{
        this.setState({idCarrito:id});
    }
    
    validarProd(){
        if(sessionStorage.getItem("nombre")){
            if(this.state.Total === -1){
                return this.renderVacio()
            }else{
                return this.renderCarrito()
            }
        }else{
            return this.renderNoLogeado()
        }
    }

    mostrarImgs=_=>{
        switch(this.state.productos.length){
            case 0:
                return(<h1>ERROR-ERROR-ERROR</h1>)
            case 1:
                const prodsA =[[
                    {
                        Imagen: this.state.productos[0].Imagen
                    }
                ]]

                return(<ImgsProds data={prodsA}/>)
            default:
                let imgsAr=[];
                this.state.productos.forEach( c=>{
                    Array.prototype.push.apply(imgsAr, [c.Producto]);
                })
                
                return(
                    <div className="col-xl-10 col-lg-10 col-md-4">
                        {<ImgsProds data={imgsAr}/>}
                    </div>
                    
                )
        }
    }

    productosCarrito(){
        return this.state.productos.map((c)=>
            <div className="col-lg-4 p-2 "  key={c.idCarrito}>
                <div class="card text-center">
                    {this.mostrarImgs()}
                    <div class="card-body">
                        <h5 class="card-title">{c.Producto[0].Nombre}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Precio unitario: ${c.Producto[0].Precio}</li>
                        <li class="list-group-item">Cantidad:  <input type="number"
                                        class="col-2"
                                        id={c.idCarrito}
                                        placeholder=" "
                                        name='Cantidad'
                                        min="1"
                                        onChange={() => this.changeAmount(c)}
                                        defaultValue={c.Cantidad}
                                        required /></li>
                        <li class="list-group-item">Subtotal: ${c.Subtotal}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-danger"
                            data-bs-toggle="modal" data-bs-target="#exampleModal01"
                            onClick={() => this.setDatos(c.idCarrito)}>Eliminar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderCarrito(){
        return(
        <div class="row justify-content-center">
                    <div className="col-lg-11">
                        <div className="row">
                            <div className="col-lg-12 bg-light p-4 text-center">
                                <h4>Productos</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card-group col-lg-9 bg-light cardCarrito">

                                {this.productosCarrito()}

                            </div>
                                <div className="col-lg-3  bg-light p-3">
                                        <h3>Total</h3>
                                        <br/>
                                        <h3>${this.state.Total}</h3>
                                        <br/>
                                        <button className="btn btn-success" style={{width:'80%', marginLeft:'10%'}}
                                            onClick={()=>this.irCompra()}>
                                            <h5>Comprar</h5></button>
                                        <br/>
                                </div> 
                        </div>
                    </div>
                </div>
        );
    }

    render() {
        return (
            <div class="container-fluid ">
                <div class="text-center">
                  <h1 style={{ color: 'red' }} >Carrito</h1>
                </div>
                
                <br/>
                    {this.validarProd()}
                <br/><br/>
                <div class="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar eliminación</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea eliminar este producto?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() =>this.delete()}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default withRouter(CarritoComponent)
