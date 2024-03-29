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
                        Descripcion:' '
                    },
                    Nombre:' ',
                    Imagen:' ',
                    Precio:' '
                }],
                Subtotal: 0
            }],
            Total: -1,
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
        
        await this.carritoController.updateCart(data);

        this.loadData();
    }

    renderNoLogeado(){
        return(
            <div className="row justify-content-center">
                <div className="col-lg-11 text-center">
                    <h3 className="text-center">No ha iniciado sesion!</h3>
                    <h4 className="text-center">Registrese o inicie sesión para poder ver y guardar productos en el carrito de compras.</h4>
                </div>
            </div>
        );
    }
    
    renderVacio(){
        return(
            <div className="row justify-content-center mt-4">
                <div className="col-lg-11">
                    <h3 className="text-center">El carrito está vacio!</h3>
                    <h4 className="text-center">Visite la tienda y revise nuestros productos.</h4>
                </div>
            </div>
        );
    }
    
    irCompra(){
        window.localStorage.setItem('progresoCompra', 0)
        if(this.state.productos.length === 1){
            window.localStorage.setItem("productosCompra", JSON.stringify(this.state.productos[0].Producto));
        }else{
            window.localStorage.setItem("productosCompra", JSON.stringify(this.state.productos));
        }
        
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

    mostrarImgs=cI=>{
        switch(cI.Producto.length){
            case 0:
                return(<h1>ERROR-ERROR-ERROR</h1>)
            case 1:
                const prodsA =[[
                    {
                        Imagen: cI.Producto[0].Imagen
                    }
                ]]

                return(<ImgsProds data={prodsA}/>)
            default:
                let imgsAr=[];
                cI.Producto.forEach( c=>{
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
                <div className="card text-center">
                    {this.mostrarImgs(c)}
                    <div className="card-body">
                        <h5 className="card-title">{c.Producto[0].Nombre}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Precio unitario: ${c.Producto[0].Precio}</li>
                        <li className="list-group-item col-12">Cantidad:  
                            <input type="number"
                                    className="col-12 p-1 text-center"
                                    id={c.idCarrito}
                                    placeholder=" "
                                    name='Cantidad'
                                    min="1"
                                    max="30"
                                    onChange={() => this.changeAmount(c)}
                                    defaultValue={c.Cantidad}
                                    required />
                        </li>
                        <li className="list-group-item">Subtotal: ${c.Subtotal}</li>
                    </ul>
                    <div className="card-body">
                        <button type="button" className="btn btn-danger"
                            data-bs-toggle="modal" data-bs-target="#exampleModal01"
                            onClick={() => this.setDatos(c.idCarrito)}>Eliminar</button>
                    </div>
                </div>
            </div>
        )
    }

    renderCarrito(){
        return(
        <div className="row justify-content-center">
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
                                <div className="col-lg-3 bg-light p-3">
                                        <h3 className="text-center">Total</h3>
                                        <br/>
                                        <h3 className="text-center">${this.state.Total}</h3>
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
            <div className="container-fluid ">
                <div className="text-center mt-4 my-4">
                  <h1 style={{ color: 'red' }} >Carrito</h1>
                </div>
                
                <br/>
                    {this.validarProd()}
                <br/><br/>
                <div className="modal fade" id="exampleModal01" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirmar eliminación</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">Desea eliminar este producto?</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() =>this.delete()}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default withRouter(CarritoComponent)
