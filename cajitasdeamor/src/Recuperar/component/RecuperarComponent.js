import React from "react";
import { withRouter } from "react-router";
import { RecuperarController } from "../controller/RecuperarController";


class RecuperarComponent extends React.Component {
    constructor() {
        super();
        this.RecuperarController = new RecuperarController();

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
                <h1 style={{ color: 'red' }} >Recuperar</h1>
                <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Recuperar Contraseña
                            </div>
                            <div class="card-body">
                                <form class="row g-4 needs-validation justify-content-center " novalidate>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Email</h5></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Codigo</h5>
                                        <input type="number" class="form-control" id="inputPassword2" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">ConfirmarContraseña</h5>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" required />
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-primary" type="submit">Restablecer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>    
        )
    }
}
export default withRouter(RecuperarComponent)