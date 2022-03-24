import { withRouter } from "react-router";
import { PagoController } from "../controller/PagoController";
import React from 'react'


class PagoComponent extends React.Component {
    constructor() {
        super();
        this.PagoController = new PagoController();

        //Almacena datos
        this.state = {
 
        }

    }


    //Inicializa funciones
    componentDidMount() {
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
                        <form class="row g-3 needs-validation" novalidate>
                            <div class="col-md-4">
                                <label for="validationCustom01" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="validationCustom01"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Banco</label>
                                <input type="text" class="form-control" id="validationCustom02"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Numero de cuenta</label>
                                <input type="text" class="form-control" id="validationCustom02"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom03" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="validationCustom03" required/>
                            </div>

                            <div class="col-md-4">
                                <label for="validationCustom05" class="form-label">Fecha de Vencimiento</label>
                                <input type="number" maxLength={5} class="form-control" id="validationCustom05" required/>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>

        )
    }
}
export default withRouter(PagoComponent)