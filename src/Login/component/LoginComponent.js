import React from "react";
import { withRouter } from "react-router";
import { LoginController } from "../controller/LoginController";
import { Utils } from '../../resources/Utils';

class LoginComponent extends React.Component {
    constructor() {
        super();
        this.loginController = new LoginController();

        //Almacena datos
        this.state = {
            user: { Correo: ' ', Contrasenia: ' ' },
            usuario: {
                Nombre: ' ',
                Apellidos: ' ',
                Correo: ' ',
                Contrasenia: ' '
            }
        }
    }

    //Inicializa funciones
    componentDidMount() {
    }

    findUs = async event => {
        event.preventDefault()

        let respuesta = await this.loginController.loguear(this.state.user);

        if (respuesta.length === 1) {
            Utils.swalSuccess("Se encontró el usuario!!");

            sessionStorage.setItem("tipo", respuesta[0].Tipo);
            sessionStorage.setItem("idUsuario", respuesta[0].idUsuario);
            sessionStorage.setItem("nombre", respuesta[0].Nombre);
            sessionStorage.setItem("correo", respuesta[0].Correo);
            setTimeout(this.props.history.push('/'), 1500);
            setTimeout(window.location.reload(true), 1700);
        } else {
            Utils.swalError("No se encontró el usuario, asegurese de estar registrado!!");
        }
    }

    regUs = async event => {
        event.preventDefault();

        if ((document.getElementById('inputPassword1').value === document.getElementById('inputPassword2').value) && (document.getElementById('inputPassword1').value !== '')) {

            let respuesta = await this.loginController.registrar(this.state.usuario);

            if (respuesta.status === 'no numero') {
                Utils.swalError("La contraseña debe contener algun numero!");
            } else if (respuesta.status === 'no caracter') {
                Utils.swalError("La contraseña debe contener algun caracter especial (# $ % _ -)!");
            } else if (respuesta.status === 'no letra') {
                Utils.swalError("La contraseña debe contener letras en minúscula y mayuscula!");
            } else if (respuesta.status === 'Error') {
                Utils.swalError("Ocurrió un error al insertar al usuario!");
            } else if (respuesta.status === 'duplicado') {
                Utils.swalError("Ya existe un usuario registrado con ese correo!");
            } else if (respuesta.status === 'Ok') {
                Utils.swalSuccess("Se inserto al usuario correctamente!");
                setTimeout(() => { window.location.reload(true) }, 1500);
            } else {
                Utils.swalError(respuesta.status);
            }
        }
    }

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    handleChangeU = e => {
        this.setState({
            usuario: {
                ...this.state.usuario,
                [e.target.name]: e.target.value
            }
        })
        if (e.target.name === 'Contrasenia') {
            this.comprobarPass();
        }
    }

    comprobarPass = e => {
        let pass1 = document.getElementById('inputPassword1').value;
        let pass2 = document.getElementById('inputPassword2').value;

        var el = document.getElementById("msgConf");
        if (pass1 !== pass2) {
            el.setAttribute("style", "display:'block';");
        } else {
            el.setAttribute("style", "display:none;");
        }
    }

    showPass(idIn) {
        if (document.getElementById(idIn).type === "password") {
            document.getElementById(idIn).type = "text";
            document.getElementById(idIn + "Pass").className = "fi-rr-eye-crossed";
        } else {
            document.getElementById(idIn).type = "password";
            document.getElementById(idIn + "Pass").className = "fi-rr-eye";
        }

    }

    render() {
        return (
            <div class="container-fluid ">
                <br />

                <div class="row justify-content-center aling-item-center row-cols-1 row-cols-md-2 g-4 mt-2">
                    <div class="col">
                        <div class="card text-dark bg-light mb-3">
                            <div class="card-header">
                                Inicio de sesión
                            </div>
                            <div class="card-body">
                                <form class="row g-4 needs-validation justify-content-center "
                                    onSubmit={this.findUs} novalidate>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Correo</h5></label>
                                        <input type="email"
                                            class="form-control"
                                            id="exampleInputEmail0"
                                            name='Correo'
                                            onChange={this.handleChange}
                                            aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <div className='input-group'>
                                            <input type="password"
                                                class="form-control"
                                                id="inputPassword0"
                                                name='Contrasenia'
                                                onChange={this.handleChange}
                                                placeholder=" " required />

                                            <div className='input-group-prepend' onClick={() => this.showPass('inputPassword0')}>
                                                <span className='input-group-text recL' id='busqueda'>
                                                    <i id="inputPassword0Pass" className="fi-rr-eye" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/Recuperar" className="pe-auto"><label class="form-label recL">Recuperar Contraseña</label> </a>

                                    <div class="col-4">
                                        <button class="btn btn-primary" type="submit">Iniciar sesión</button>
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
                                <form class="row g-4 needs-validation justify-content-center " onSubmit={this.regUs} novalidate>

                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Nombre</h5>
                                        <input type="text"
                                            class="form-control"
                                            id="validationTooltip01"
                                            placeholder=" "
                                            name='Nombre'
                                            onChange={this.handleChangeU}
                                            required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Apellidos</h5>
                                        <input type="text"
                                            class="form-control"
                                            id="validationTooltip02"
                                            placeholder=" "
                                            name='Apellidos'
                                            onChange={this.handleChangeU}
                                            required />
                                    </div>
                                    <div class="md-3 position-relative">
                                        <label for="exampleInputEmail1" class="form-label"><h5>Correo</h5></label>
                                        <input type="email"
                                            class="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            name='Correo'
                                            onChange={this.handleChangeU}
                                            required />
                                    </div>

                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <div className='input-group'>
                                            <input type="password"
                                                class="form-control"
                                                id="inputPassword1"
                                                placeholder=" "
                                                name='Contrasenia'
                                                minLength={8}
                                                maxLength={21}
                                                onChange={this.handleChangeU}
                                                required />

                                            <div className='input-group-prepend' onClick={() => this.showPass('inputPassword1')}>
                                                <span className='input-group-text recL' id='busqueda'>
                                                    <i id="inputPassword1Pass" className="fi-rr-eye" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="md-3 position-relative">
                                        <div className="row">
                                            <div className="col">
                                                <h5 class="card-title">Confirmar contraseña</h5> &nbsp;
                                            </div>
                                            <div className="col">
                                                <h6 id="msgConf" class="text-danger" style={{ display: 'none' }}>Ambas contraseñas deben ser iguales!</h6>
                                            </div>
                                        </div>
                                        <div className='input-group'>
                                            <input type="password"
                                                class="form-control"
                                                id="inputPassword2"
                                                placeholder=" "
                                                name='ConfContr'
                                                minLength={8}
                                                maxLength={21}
                                                onChange={() => this.comprobarPass()}
                                                required />

                                            <div className='input-group-prepend' onClick={() => this.showPass('inputPassword2')}>
                                                <span className='input-group-text recL' id='busqueda'>
                                                    <i id="inputPassword2Pass" className="fi-rr-eye" />
                                                </span>
                                            </div>
                                        </div>
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