import { withRouter } from "react-router";
import { PagoController } from "../controller/PagoController";
import React from 'react'
import { Utils } from '../../resources/Utils';


class PagoComponent extends React.Component {
    constructor() {
        super();
        this.PagoController = new PagoController();

        //Almacena datos
        this.state = {
            pago: {
                Nombre: ' ',
                Banco: ' ',
                Cuenta: ' ',
                idUsuario: sessionStorage.getItem("idUsuario"),
                CVV: ' ',
                FechaVencimiento: ' '
            }
        }

    }


    //Inicializa funciones
    componentDidMount() {
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
            let resp = await this.PagoController.insert(this.state.pago);
            Utils.swalSuccess("El Metodo de Pago fue agregado correctamente!");
            setTimeout(() => window.location.reload(true), 1500);
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

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }}>Metodo De pago</h1>

                <div class="card">
                    <div class="card-header">
                        Pago
                    </div>
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
                                <label for="validationCustom02" class="form-label">Numero de cuenta</label>
                                <input type="number"
                                    max={"9999999999999999"}
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
                                <label for="validationCustom05" class="form-label">Fecha de Vencimiento</label>
                                <input type="text"
                                    class="form-control"
                                    id="validationCustom05"
                                    onChange={this.handleChange}
                                    name="FechaVencimiento" required />
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Agregar Metodo de pago</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>



        )
    }
}
export default withRouter(PagoComponent)