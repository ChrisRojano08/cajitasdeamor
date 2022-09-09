import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { ContactanosController } from "../controller/ContactanosController";
import emailjs from "emailjs-com";
import { Utils } from '../../resources/Utils';
import des1 from '../../resources/images/logo003.png';

class ContactanosComponent extends React.Component {
    constructor() {
        super();
        this.ContactanosController = new ContactanosController();

        //Almacena datos
        this.state = {
        }
    }


    //Inicializa funciones
    componentDidMount() {
    }

    enviarEmail = e => {
        e.preventDefault();
        const messa = '' + document.getElementById('mensaje floatingTextarea').value;

        if (this.validar('nombre floatingInputGrid', 'El nombre solo debe')) {
            if (this.validar('apellidos floatingInputGrid', 'Los apellidos solo deben')) {
                if (messa.length < 10) {
                    Utils.swl('Tus comentarios nos interesan. Envia un mensaje más largo.');
                } else {
                    emailjs.sendForm('service_q03spzk', 'template_wtrfkym', e.target, 'rRgb6F4Wl1gVg9TDY').then(res => {
                        if (res.text === 'OK') {
                            Utils.swalSuccess("Sus comentarios fueron enviados con exito!!");
                            setTimeout(window.location.reload(true), 2300);
                            setTimeout(this.props.history.push('/'), 2500);
                        } else {
                            Utils.swalError("No se pudieron enviar sus comentarios, intente de nuevo más tarde.");
                        }
                    });
                }
            }
        }
    }

    validar(idInput, msg) {
        const input = document.getElementById(idInput);
        const pattern = new RegExp('^[A-Z ]+$', 'i');

        if (!input.value) {
            Utils.swalError(msg + ' estar vacio!');
            return false;
        } else {
            if (!pattern.test(input.value)) {
                Utils.swalError(msg + ' contener letras o numeros!');
                return false;
            } else {
                return true;
            }
        }
    }

    render() {
        return (
            <div className="container-fluid ">
                <div className="text-center">
                    <h1 style={{ color: 'red' }} >Contáctanos</h1>
                </div>


                <div className="container text-center">
                    <form className="row g-2 needs-validation justify-content-center p-4 " noValidate onSubmit={this.enviarEmail}>
                        <div className="row">
                            <div className="col-8" >

                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating border-danger">
                                            <input type="text" className="form-control" id="nombre floatingInputGrid" name="nombre" required />
                                            <label htmlFor="floatingInputGrid"><dt>Nombre</dt> </label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="apellidos floatingInputGrid" name="apellidos" required />
                                            <label htmlFor="floatingInputGrid"><dt>Apellido</dt> </label>
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="correo floatingInputGrid" name="correo" required />
                                            <label htmlFor="floatingInputGrid"><dt>Correo Electronico</dt> </label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="motivo floatingSelectGrid" name="motivo"
                                                defaultValue={"Comentarios"} aria-label="Floating label select example" required>
                                                <option value="Queja">Queja</option>
                                                <option value="Pedido Especial">Pedido Especial</option>
                                                <option value="Paquete Dañado">Paquete Dañado</option>
                                                <option value="Comentarios">Comentarios</option>
                                                <option value="Error en la pagina">Error en la pagina</option>
                                                <option value="Error al acceder algun dato">Error al acceder algun dato</option>
                                                <option value="Pedido Extraviado">Pedido Extraviado</option>
                                            </select>
                                            <label htmlFor="floatingInputGrid"> <dt>Seleccione su motivo</dt></label>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="mensaje floatingTextarea" name="mensaje" style={{ height: "200px" }} required></textarea>
                                    <label htmlFor="floatingTextarea"><dt>Comentario</dt> </label>
                                </div>

                            </div>
                            <div className="col"  >
                                <br />
                                <br />
                                <div>
                                    <img src={des1} className="img-fluid rounded-start" alt="..." />
                                </div>

                                <br />
                                <button type="submit" className="btn btn-success btn-lg">Enviar Comentarios</button>
                            </div>

                        </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }
}
export default withRouter(ContactanosComponent)
