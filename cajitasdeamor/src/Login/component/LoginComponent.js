import React from "react";
import { withRouter } from "react-router";
import { LoginController } from "../controller/LoginController";
import {Utils} from '../../resources/Utils';

class LoginComponent extends React.Component {
    constructor() {
        super();
        this.loginController = new LoginController();

        //Almacena datos
        this.state = {
            user:{Correo:' ', Contrasenia:' '}
        }
    }

    //Inicializa funciones
    componentDidMount() {
    }

    findUs =async event => {
        event.preventDefault()
        console.log(this.state.user);
        
        let respuesta = await this.loginController.loguear(this.state.user);
        
        if(respuesta.length === 1){
            Utils.swalSuccess("Se encontró el usuario!!");

            console.log(respuesta);

            sessionStorage.setItem("tipo", respuesta[0].Tipo);
            sessionStorage.setItem("idUsuario", respuesta[0].idUsuario);
            sessionStorage.setItem("nombre", respuesta[0].Nombre);
            this.props.history.push('/');
            window.location.reload(true);
        }else{
            Utils.swalError("No se encontró el usuario con esos datos!!");
        }
        console.log(respuesta.length);
    }

    handleChange=e=> {
        this.setState({
            user : {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Login</h1>

                <div class="row justify-content-center aling-item-center row-cols-1 row-cols-md-2 g-4 ">
                    <div class="col">
                        <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Inicio de sesion
                            </div>
                            <div class="card-body">
                                <form class="row g-4 needs-validation justify-content-center "
                                    onSubmit={this.findUs} novalidate>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Email</h5></label>
                                        <input type="email"
                                            class="form-control"
                                            id="exampleInputEmail1"
                                            name='Correo'
                                            onChange={this.handleChange}
                                            aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <input type="password"
                                            class="form-control"
                                            id="inputPassword2"
                                            name='Contrasenia'
                                            onChange={this.handleChange}
                                            placeholder="Password" required />
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
                                        <input type="text" class="form-control" id="validationTooltip01" placeholder=" " required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Apellidos</h5>
                                        <input type="text" class="form-control" id="validationTooltip02" placeholder=" " required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Email</h5></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder=" " required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Confirmar contraseña</h5>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder=" " required />
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