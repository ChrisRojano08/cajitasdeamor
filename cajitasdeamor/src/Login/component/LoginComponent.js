import React from "react";
import { withRouter } from "react-router";
import { LoginController } from "../controller/LoginController";


class LoginComponent extends React.Component {
    constructor() {
        super();
        this.LoginController = new LoginController();

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
                <h1 style={{ color: 'red' }} >Login</h1>

                <div class="row justify-content-center aling-item-center row-cols-1 row-cols-md-2 g-4 ">
                    <div class="col">
                        <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Inicio Secion
                            </div>
                            <div class="card-body">
                                <form class="row g-4 needs-validation justify-content-center " novalidate>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Email</h5></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" required />
                                    </div>
                                    <a href="/Recuperar"><label class="form-label">Recuperar Contraseña</label> </a>
                                    
                                    <div class="col-3">
                                        <button class="btn btn-primary" type="submit">Iniciar Sesion</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Registrarse
                            </div>
                            <div class="card-body">
                                <form class="row g-4 needs-validation justify-content-center " novalidate>

                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Nombre</h5>
                                        <input type="text" class="form-control" id="validationTooltip01" placeholder="Name" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Apellidos</h5>
                                        <input type="text" class="form-control" id="validationTooltip02" placeholder="lalito" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Email</h5></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
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
                                        <button class="btn btn-primary" type="submit">Registrarse</button>
                                    </div>
                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(LoginComponent)