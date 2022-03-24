import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { DomicilioController } from "../controller/DomicilioController";


class DomicilioComponent extends React.Component {
    constructor() {
        super();
        this.DomicilioController = new DomicilioController();

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
                <h1 style={{ color: 'red' }} >Domicilio</h1>
                <div class="card">
                    <div class="card-header">
                        Ubicacion
                    </div>
                    <div class="card-body">
                        <form class="row g-3 needs-validation" novalidate>
                            <div class="col-md-4">
                                <label for="validationCustom01" class="form-label">Numero</label>
                                <input type="text" class="form-control" id="validationCustom01"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Calle 2</label>
                                <input type="text" class="form-control" id="validationCustom02"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom02" class="form-label">Colonia</label>
                                <input type="text" class="form-control" id="validationCustom02"  required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom03" class="form-label">Ciudad</label>
                                <input type="text" class="form-control" id="validationCustom03" required/>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom04" class="form-label">Estado</label>
                                <select class="form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Selecciona tu estados</option>
                                    <option>Tlaxcala</option>
                                    <option>Puebla</option>
                                    <option>Mexico</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="validationCustom05" class="form-label">C.P.</label>
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
export default withRouter(DomicilioComponent)