import React from "react";
import { withRouter } from "react-router";
import { Utils } from "../../resources/Utils";
import { RecuperarController } from "../controller/RecuperarController";
import emailjs from 'emailjs-com';

class RecuperarComponent extends React.Component {
    constructor() {
        super();
        this.RecuperarController = new RecuperarController();

        //Almacena datos
        this.state = {
            email: ' ',
            user: {Correo: ' ', Password: ' '},
            code: -1
        }
    }


    //Inicializa funciones
    componentDidMount() {
    }

    sendEmail = e => {
        e.preventDefault();

        emailjs.sendForm('service_q03spzk', 'template_s65doos', e.target, 'rRgb6F4Wl1gVg9TDY').then(res=>{
            if(res.text==='OK'){
                Utils.swalSuccess("Codigo de verifiación enviado correctamente");
            }else{
                Utils.swalError("No se pudo enviar el codigo");
            }
        })
    }

    findEmail = async event => {
        event.preventDefault();
        let respuesta = await this.RecuperarController.findEmail(this.state.email);
        if (respuesta.status === "Ok") {
            Utils.swalSuccess("Se encontro el correo");
            this.beforeASubmit();
            this.sendEmail(event);
        }else{
            Utils.swalError("No se encontro el correo");
        }
    }

    comprobarPass=e=>{
        let pass1 = document.getElementById('pass').value;
        let pass2 = document.getElementById('passConfirm').value;

        var el = document.getElementById("msgConf");
        if(pass1!==pass2){
            el.setAttribute("style", "display:'block';");
        }else{
            el.setAttribute("style", "display:none;");
        }
    }

    changePass = async event => {
        event.preventDefault();

        

        const formEmail = this.state.email;
        const formPass = document.getElementById('pass').value;
        const formPassConfirm = document.getElementById('passConfirm').value;
        const codeCheck = document.getElementById('codeEmail').value;
        if(formPass === formPassConfirm && codeCheck === this.state.code){
            let data = {
                Correo: formEmail,
                Contrasenia: formPass
            }
            let respuesta = await this.RecuperarController.changePass(data);
            if (respuesta.status === "Ok") {
                Utils.swalSuccess("Se cambio la contraseña correctamente!");
                console.log(respuesta);
                
            setTimeout(this.props.history.push('/Login'), 500);
            }else if(respuesta.status === 'no numero'){
                Utils.swalError("La contraseña debe contener algun numero!");
            }else if(respuesta.status === 'no caracter'){
                Utils.swalError("La contraseña debe contener algun caracter especial (# $ % _ -)!");
            }else if(respuesta.status === 'no letra'){
                Utils.swalError("La contraseña debe contener letras en minuscula y mayuscula!");
            }else if(respuesta.status === 'Error'){
                Utils.swalError("Ocurrió un error al cambiar contraseña!");
            }
            
        }else{
            Utils.swalError("Código incorrecto!");
        }
    }

    handleChange=e=> {
        this.setState({
            email : e.target.value
        })
    }

    beforeASubmit=e=>{
        var formEmail = document.getElementById('formEmail');
        var formPass = document.getElementById('formPass');
        var formCode = document.getElementById('codeGen');
        formCode.value = Math.round(Math.random()*(99999-10000)+parseInt(10000));
        this.setState({code: formCode.value});
        formEmail.setAttribute("style", "display: none");
        formPass.setAttribute("style", "display: block");
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
                <h1 style={{ color: 'red' }} className="text-center my-4">Recuperar</h1>
                <div class="card text-dark bg-light mb-3 col-md-6 mx-auto">
                            <div class="card-header">
                                Cambiar contraseña
                            </div>
                            <div class="card-body">
                                <form id="formEmail" style={{display: 'block'}} class="row g-4 needs-validation justify-content-center " onSubmit={this.findEmail} novalidate>
                                    <div class="md-3 position-relative" >
                                        <label for="exampleInputEmail1" class="form-label"><h5>Correo</h5></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" name='Correo' onChange={this.handleChange} aria-describedby="emailHelp" required />
                                        <input type="number" id="codeGen" name='codigo'  style={{display: 'none'}}/> 
                                    </div>
                                    <div class="col-12 mx-auto text-center" >
                                        <button class="btn btn-primary" type="submit">Enviar código</button>
                                    </div>
                                </form>
                                <form id="formPass" style={{display: 'none'}} class="row g-4 needs-validation justify-content-center " onSubmit={this.changePass} novalidate>
                                    <div class="md-3 position-relative">
                                        <h6>Se ha enviado un código al correo para cambiar la contraseña</h6>
                                        <br/>
                                        <h5 class="card-title">Código</h5>
                                        <input type="number" minLength="10000" maxLength="99999" class="form-control"
                                            id="codeEmail" placeholder="Código de recuperación" required />
                                    </div>

                                    <div class="md-3 position-relative">
                                        <h5 class="card-title">Contraseña</h5>
                                        <div className='input-group'>
                                            <input type="password"
                                                class="form-control"
                                                id="pass"
                                                placeholder="Contraseña"
                                                name='Contrasenia'
                                                minLength={8}
                                                maxLength={21}
                                                onChange={()=>this.comprobarPass()}
                                                required />

                                            <div className='input-group-prepend' onClick={() => this.showPass('pass')}>
                                                <span className='input-group-text recL' id='busqueda'>
                                                    <i id="passPass" className="fi-rr-eye" />
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
                                                <h6 id="msgConf" class="text-danger" style={{display:'none'}}>Ambas contraseñas deben ser iguales!</h6>
                                            </div>
                                        </div>
                                        <div className='input-group'>
                                            <input type="password"
                                                class="form-control"
                                                id="passConfirm"
                                                name='Contrasenia'
                                                minLength={8}
                                                maxLength={21}
                                                onChange={()=>this.comprobarPass()}
                                                placeholder="Confirmar contraseña"
                                                required />

                                            <div className='input-group-prepend' onClick={() => this.showPass('passConfirm')}>
                                                <span className='input-group-text recL' id='busqueda'>
                                                    <i id="passConfirmPass" className="fi-rr-eye" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 text-center">
                                        <button class="btn btn-primary" type="submit">Cambiar contraseña</button>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>    
        )
    }
}
export default withRouter(RecuperarComponent)