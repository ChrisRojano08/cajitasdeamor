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
                                <h5 class="card-title">Correo</h5>
                                <div class="mb-3">
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                                <h5 class="card-title">Contraseña</h5>
                                <div class="mb-3">
                                    <input type="pasword" class="form-control" id="exampleFormControlInput1" placeholder="Contraseña" />
                                </div>
                                <a href="#" class="btn btn-primary">Iniciar Sesion</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Registrarse
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Nombre</h5>
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Juanito" />
                                </div>
                                <h5 class="card-title">Apellidos</h5>
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Bananas Perez" />
                                </div>
                                <h5 class="card-title">Correo</h5>
                                <div class="mb-3">
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                                <h5 class="card-title">Contraseña</h5>
                                <div class="mb-3">
                                    <input type="pasword" class="form-control" id="exampleFormControlInput1" placeholder="Contraseña" />
                                </div>
                                <h5 class="card-title">Confirmar Contraseña</h5>
                                <div class="mb-3">
                                    <input type="pasword" class="form-control" id="exampleFormControlInput1" placeholder="Confirmar Contraseña" />
                                </div>
                                <a href="#" class="btn btn-primary"> Registrarse</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default withRouter(LoginComponent)