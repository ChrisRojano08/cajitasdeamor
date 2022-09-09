import React from "react";
import { withRouter } from "react-router";
import { ComprasController } from "../controller/ComprasController";
import DomicilioComponent from '../../Domicilio/component/DomicilioComponent';
import PagoComponent from '../../Pago/component/PagoComponent';
import DedicatoriaComponent from '../../Dedicatoria/component/DedicatoriaComponent';
import ImgsProds from '../../MenuUsuario/component/ProdImagesComponent';
import { Utils } from "../../resources/Utils";

class CompraComponent extends React.Component {
    constructor() {
        super();
        this.compraController = new ComprasController();

        //Almacena datos
        this.state = {
            progreso: JSON.parse( window.localStorage.getItem('progresoCompra')) ||0,
            domicilio: JSON.parse( window.localStorage.getItem('domCompra')) || {
                idDomicilio: 0,
                Numero:' ',
                Calle:' ',
                Colonia:' ',
                Municipio:' ',
                Estado:' ',
                CodigoPostal:' ',
                idUsuario:sessionStorage.getItem("idUsuario")
            },
            pago: JSON.parse( window.localStorage.getItem('pagoCompra')) || {
                idMetodoPago: 0,
                Nombre: ' ',
                Banco: ' ',
                Cuenta: ' ',
                idUsuario: sessionStorage.getItem("idUsuario"),
                CVV: ' ',
                FechaVencimiento: ' '
            },
            dedicatoria: JSON.parse( window.localStorage.getItem('dedCompra')) || {
                Dedicatoria: ' ',
                Nombre: ' ',
                idCompra: ' '
            },
            productos: JSON.parse( window.localStorage.getItem('productosCompra')) || [{
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
            Total: localStorage.getItem('totalCompra') || 0
        }

        this.handlerDom = this.handlerDom.bind(this);
        this.handlerPay = this.handlerPay.bind(this);
        this.handlerDed = this.handlerDed.bind(this);
    }

    //Inicializa funciones
    componentDidMount(){
        setTimeout(()=>{
            this.setState({productos: JSON.parse(window.localStorage.getItem('productosCompra')) });
            this.setState({Total: sessionStorage.getItem('totalCompra')});
        }, 100);
    }

    handlerDom(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            domicilio: state
        },()=>{
            window.localStorage.setItem("domCompra", JSON.stringify(this.state.domicilio));
            window.localStorage.setItem("progresoCompra", num);
        });
    }

    handlerPay(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            pago: state
        },()=>{
            window.localStorage.setItem("pagoCompra", JSON.stringify(this.state.pago));
            window.localStorage.setItem("progresoCompra", num);
        });
    }

    handlerDed(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            dedicatoria: state
        },()=>{
            window.localStorage.setItem("dedCompra", JSON.stringify(this.state.dedicatoria));
            window.localStorage.setItem("progresoCompra", num);
        });
    }

    async comprar(){
        let idsStr='';
        if(this.state.productos.length===1){
            idsStr = this.state.productos[0].idProducto;
        }else{
            this.state.productos.forEach( c=>{
                idsStr += c.Producto[0].idProducto+",";
            })
        }

        const comprasData = {
            idUsuario: parseInt(sessionStorage.getItem("idUsuario")),
            Dedicatoria: this.state.dedicatoria.Dedicatoria,
            Nombre: this.state.dedicatoria.Nombre,
            idsProductos: idsStr,
            idMetodoPago: this.state.pago.idMetodoPago,
            idDomicilio: this.state.domicilio.idDomicilio,
            Monto: parseInt(this.state.Total)
        }

        const resp = await this.compraController.insertar(comprasData);

        if(resp.status==="Ok"){
            Utils.swalSuccess("Compra realizada con exito!");
            window.localStorage.setItem("progresoCompra", 0);

            const data = {
                idUsuario: parseInt(sessionStorage.getItem("idUsuario"))
            }
            this.compraController.vaciarCarrito(data)

            setTimeout(this.props.history.push('/menuUsuario'), 1500);
        }else{
            Utils.swalError(resp.status);
        }
    }

    mostrarForm(){
        switch(this.state.progreso){
            case 0:
                return(<PagoComponent handler={this.handlerPay}/>)
            case 1:
                return(<DomicilioComponent handler={this.handlerDom}/>)
            case 2:
                return(<DedicatoriaComponent handler={this.handlerDed} productos={this.state.productos}/>)
            case 3:
                return(
                    <div className="my-4">
                        <div className="row justify-content-center p-4">
                            <div className="col-xl-10 col-lg-10 col-md-10">
                                <div className="card border-dark mb-3">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-2">
                                                <i className="fi fi-rr-home"></i>
                                            </div>
                                            <div className="col-8">
                                                <h6 className="card-title">Domicilio</h6>
                                            </div>
                                            <div className="col-2"> </div>
                                        </div>
                                    </div>
                                    <div className="card-body text-dark">
                                        <h5 className="card-title">{this.state.domicilio.Numero} {this.state.domicilio.Calle}</h5>
                                        <p className="card-text">Código postal {this.state.domicilio.CodigoPostal} - {this.state.domicilio.Colonia},
                                            {this.state.domicilio.Municipio}, {this.state.domicilio.Estado}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center p-4">
                            <div className="col-xl-10 col-lg-10 col-md-10">
                                <div className="card border-dark mb-3">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-2">
                                                <i className="fi fi-rr-credit-card"></i>
                                            </div>
                                            <div className="col-8">
                                                <h6 className="card-title">Método de pago</h6>
                                            </div>
                                            <div className="col-2"> </div>
                                        </div>
                                    </div>
                                    <div className="card-body text-dark">
                                        <h5 className="card-title">{this.state.pago.Nombre}</h5>
                                        <p className="card-text"> Cuenta: {this.state.pago.Cuenta.substring(0, this.state.pago.Cuenta.length -4)}XXXX
                                            &nbsp;&nbsp;CVV: *** &nbsp;&nbsp;Vencimiento: {this.state.pago.FechaVencimiento}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center p-4">
                            <div className="col-xl-10 col-lg-10 col-md-10">
                                <div className="card border-dark mb-3">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-2">
                                                <i className="fi fi-rr-envelope"></i>
                                            </div>
                                            <div className="col-8">
                                                <h6 className="card-title">Dedicatoria</h6>
                                            </div>
                                            <div className="col-2"> </div>
                                        </div>
                                    </div>
                                    <div className="card-body text-dark">
                                        <h5 className="card-title">{this.state.dedicatoria.Nombre}</h5>
                                        <p className="card-text">{this.state.dedicatoria.Dedicatoria}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                );
            default:
                return(<p>UnU</p>)
        }
    }

    confirmandoCompra(){
        return(
            <h1>AAAAA</h1>
        );
    }

    mostrarNombres=_=>{
        switch(this.state.productos.length){
            case 0:
                return(<h1>ERROR-ERROR-ERROR</h1>)
            case 1:
                return(<h5>&nbsp;{this.state.productos[0].Nombre}</h5>)
            case 2: case 3:
                let nombs='';
                this.state.productos.forEach( c=>{
                    nombs += c.Producto[0].Nombre+", ";
                })
                nombs = nombs.substring(0, nombs.length -2);
                return(
                    <h6>{nombs}</h6>
                )
            default:
                const nomb=this.state.productos[0].Producto[0].Nombre+','+this.state.productos[1].Producto[0].Nombre+','+
                    this.state.productos[2].Producto[0].Nombre+', ...';
                return(
                    <h6>{nomb}</h6>
                )
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

    render() {
        return (
            <div className="container-fluid my-4">
                <h1>Compra</h1>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-12">
                        {this.mostrarForm()}
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Resumen de compra
                            </div>
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 text-center">
                                        {this.mostrarImgs()}
                                    </div>
                                </div>
                                    
                                <hr className="my-4 mx-4"/>
                                    {this.mostrarNombres()}
                                <hr className="my-4 mx-4"/>
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-8">
                                        <h5>Total:</h5>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4">
                                        <h5>${this.state.Total}</h5>
                                    </div>
                                </div>
                                <hr className="my-4 mx-4"/>
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-10 col-md-10 p-2 my-4">
                                        {this.state.progreso===3 ? 
                                            <button className="btn btn-primary" onClick={()=>this.comprar()} style={{width:'60%'}}><h5>Comprar</h5></button>
                                        :
                                            <button className="btn btn-primary" disabled style={{width:'60%'}}><h5>Comprar</h5></button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        )
    }
}
export default withRouter(CompraComponent)