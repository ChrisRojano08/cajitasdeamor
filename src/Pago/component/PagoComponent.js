import { withRouter } from "react-router";
import { PagoController } from "../controller/PagoController";
import React from 'react'
import { Utils } from '../../resources/Utils';
import Cards from 'react-credit-cards';

class PagoComponent extends React.Component {
    constructor() {
        super();
        this.pagoController = new PagoController();

        //Almacena datos
        this.state = {
            pago: {
                Nombre: ' ',
                Banco: ' ',
                Cuenta: ' ',
                idUsuario: sessionStorage.getItem("idUsuario"),
                CVV: ' ',
                FechaVencimiento: ' '
            },
            tarjetas:[{
                Banco: ' ',
                CVV: '123',
                Cuenta: '5555444433332222',
                FechaVencimiento: '12-12-2022',
                Nombre: 'uwu',
                idMetodoPago: ' '
            }]
        }
    }

    //Inicializa funciones
    componentDidMount() {
        this.loadData();
    }

    async loadData(){
        const datos = { idUsuario: sessionStorage.getItem("idUsuario") }; 
        const respuestaH = await this.pagoController.findPay(datos);

        this.setState({ tarjetas: respuestaH });
        console.log(this.state.tarjetas);
    }

    comprobacion = async event => {
        event.preventDefault()

        if (sessionStorage.getItem("idUsuario") === null) {
            Utils.swalError("necesita iniciar sesion para poder agregar un metodo de pago!");
        } else {
            this.setState({
                ...this.state.pago,
                idUsuario: sessionStorage.getItem("idUsuario")
            });
            const respuesta = await this.pagoController.insert(this.state.pago);
            if(respuesta.status === 'Ok'){
                Utils.swalSuccess("El método de pago fue agregado correctamente!");
            }else{
                Utils.swalError(respuesta.exception);
            }
            
            setTimeout(() => window.location.reload(true), 1000);
        }
    }
    handleChange = e => {
        this.setState({
            pago: {
                ...this.state.pago,
                [e.target.name]: e.target.value
            }
        })
    }

    seleccionarMetodo=(c)=>{
        this.props.handler(1, c);
    }

    formulario(){
        return(
            <div>
                <h3 style={{ color: 'red' }} >Agregar tarjeta</h3>
                <br/>
                    <div class="card">
                        <div class="card-header">
                            Pago
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 my-4 p-2">
                                <Cards
                                    cvc={this.state.pago.CVV}
                                    expiry={this.state.pago.FechaVencimiento}
                                    name={this.state.pago.Nombre}
                                    number={this.state.pago.Cuenta}
                                    preview='false'
                                />
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div class="card-body">
                                    <form class="row g-3 needs-validation"
                                        onSubmit={this.comprobacion} novalidate>

                                        <div class="col-md-4">
                                            <label for="validationCustom01" class="form-label">Nombre</label>
                                            <input type="text"
                                                class="form-control"
                                                id="validationCustom01"
                                                onChange={this.handleChange}
                                                name="Nombre" required />
                                        </div>
                                        <div class="col-md-4">
                                            <label for="validationCustom02" class="form-label">Banco</label>
                                            <input type="text"
                                                class="form-control"
                                                id="validationCustom02"
                                                onChange={this.handleChange}
                                                name="Banco" required />
                                        </div>
                                        <div class="col-md-4">
                                            <label for="validationCustom02" class="form-label">Número de cuenta</label>
                                            <input type="number"
                                                max="9999999999999999"
                                                class="form-control"
                                                id="validationCustom02"
                                                onChange={this.handleChange}
                                                name="Cuenta" required />
                                        </div>
                                        <div class="col-md-4">
                                            <label for="validationCustom03" class="form-label">CVV</label>
                                            <input type="number"
                                                max={"999"}
                                                class="form-control"
                                                id="validationCustom03"
                                                name="CVV"
                                                onChange={this.handleChange} required />
                                        </div>

                                        <div class="col-md-4">
                                            <label for="validationCustom05" class="form-label">Vencimiento</label>
                                            <input type="date"
                                                class="form-control"
                                                id="validationCustom05"
                                                onChange={this.handleChange}
                                                name="FechaVencimiento" required />
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-primary" type="submit">Agregar metodo de pago</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        );
    }

    tarjetas(){
        return this.state.tarjetas.map((c)=>
            <div className="col-lg-4 col-md-4 p-2 mx-2 tarjeta"
                key={c.idMetodoPago} onClick={()=>this.seleccionarMetodo(c)}>
                <Cards
                    cvc={c.CVV}
                    expiry={c.FechaVencimiento}
                    name={c.Nombre}
                    number={c.Cuenta}
                />
            </div>
        )
    }

    comprobarMetodos(){
        if(this.state.tarjetas.length > 0){
            return(
                <div className="row">
                    <div className="col-xl-5 col-lg-12 col-md-12 p-2 mb-4">
                        <h3 style={{ color: 'red' }} >Seleccionar tarjeta</h3>
                        <br/>
                        { this.state.tarjetas[0].status === "Vacio" ? <p></p> : this.tarjetas()}
                    </div>
                    <div className="col-xl-7 col-lg-12 col-md-12">
                        {this.formulario()}
                    </div>
                </div>
            );
        }else{
            return(
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        {this.formulario()}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div class="container-fluid my-2 p-4">
                {this.comprobarMetodos()}
            </div>
        )
    }

}
export default withRouter(PagoComponent)