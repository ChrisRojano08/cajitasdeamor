import React from "react";
import { withRouter } from "react-router";
import { ComprasController } from "../controller/ComprasController";
import {Utils} from '../../resources/Utils';
import DomicilioComponent from '../../Domicilio/component/DomicilioComponent';
import PagoComponent from '../../Pago/component/PagoComponent';
import DedicatoriaComponent from '../../Dedicatoria/component/DedicatoriaComponent';

class CompraComponent extends React.Component {
    constructor() {
        super();
        this.compraController = new ComprasController();

        //Almacena datos
        this.state = {
            progreso: 0,
            domicilio:{
                Numero:' ',
               Calle:' ',
                Colonia:' ',
                Municipio:' ',
                Estado:' ',
                CodigoPostal:' ',
                idUsuario:sessionStorage.getItem("idUsuario")
            },
            pago: {
                Nombre: ' ',
                Banco: ' ',
                Cuenta: ' ',
                idUsuario: sessionStorage.getItem("idUsuario"),
                CVV: ' ',
                FechaVencimiento: ' '
            },
            dedicatoria:{
                Dedicatoria: ' ',
                Nombre: ' ',
                idCompra: ' '
            },
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
            Total: 0
        }

        this.handlerDom = this.handlerDom.bind(this);
        this.handlerPay = this.handlerPay.bind(this);
        this.handlerDed = this.handlerDed.bind(this);
    }

    //Inicializa funciones
    componentDidMount(){
        if(this.props.location.anterior === 'producto'){
            setTimeout(()=>{
                const productoss = [{
                    Cantidad: this.props.location.data.Cantidad,
                    Producto:[{
                        Categoria:{
                            Descripcio:' '
                        },
                        Nombre:this.props.location.data.productos.Nombre,
                        Imagen:this.props.location.data.productos.Imagen,
                        Precio:this.props.location.data.productos.Precio
                    }],
                    Subtotal: this.props.location.data.Cantidad*this.props.location.data.productos.Precio
                }]

                this.setState({productos: productoss});
                this.setState({Total: productoss[0].Subtotal});
            }, 200);
        }else if(this.props.location.anterior === 'carrito'){
            setTimeout(()=>{
                this.setState({productos: this.props.location.data});
                this.setState({Total: this.props.location.total});
            }, 200);
        }
    }

    handlerDom(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            domicilio: state
        });

        setTimeout(()=>console.log(this.state.domicilio), 500);
    }

    handlerPay(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            pago: state
        });

        setTimeout(()=>console.log(this.state.pago), 500);
    }

    handlerDed(num, state) {
        this.setState({
          progreso: num
        });

        this.setState({
            dedicatoria: state
        });

        setTimeout(()=>console.log(this.state), 500);
    }

    mostrarForm(){
        switch(this.state.progreso){
            case 0:
                return(<DomicilioComponent handler={this.handlerDom}/>)
            case 1:
                return(<PagoComponent handler={this.handlerPay}/>)
            case 2:
                return(<DedicatoriaComponent handler={this.handlerDed} productos={this.state.productos}/>)
            case 3:
                this.confirmandoCompra();
            break;
            default:
                return(<p>UnU</p>)
        }
    }

    confirmandoCompra(){
        return(
            <p>UwU</p>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Compra</h1>
                <br/>
                <>{this.mostrarForm()}</>
            </div>
            
        )
    }
}
export default withRouter(CompraComponent)