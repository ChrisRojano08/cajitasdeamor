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

        emailjs.sendForm('service_q03spzk', 'template_wtrfkym', e.target, 'rRgb6F4Wl1gVg9TDY').then(res => {
            if (res.text === 'OK') {
                Utils.swalSuccess("Sus comentarios fueron enviados con exito!!");
                this.props.history.push('/');
                window.location.reload(true);
            } else {
                Utils.swalError("No se pudieron enviar sus comentarios, intente de nuevo más tarde.");
            }

        });
    }

    render() {
        return (
            <div class="container-fluid ">
                <div class="text-center">
                  <h1 style={{ color: 'red' }} >Contáctanos</h1>  
                </div>
                

                <div class="container text-center">
                    <form class="row g-2 needs-validation justify-content-center p-4 " novalidate onSubmit={this.enviarEmail}>
                        <div class="row">
                            <div class="col-8" >

                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating border-danger">
                                            <input type="text" class="form-control" id="floatingInputGrid" required />
                                            <label for="floatingInputGrid"><dt>Nombre</dt> </label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingInputGrid" required />
                                            <label for="floatingInputGrid"><dt>Apellido</dt> </label>
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" id="floatingInputGrid" required />
                                            <label for="floatingInputGrid"><dt>Correo Electronico</dt> </label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" required>
                                                <option selected></option>
                                                <option value="1">Queja</option>
                                                <option value="2">Pedido Especial</option>
                                                <option value="3">Paquete Dañado</option>
                                                <option value="4">Pedido Grande</option>
                                                <option value="5">Error en la pagina</option>
                                                <option value="6">Error al acceder algun dato</option>
                                                <option value="3">Pedido Extraviado</option>
                                            </select>
                                            <label for="floatingInputGrid"> <dt>Seleccione su motivo</dt></label>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ height: "200px" }} required></textarea>
                                    <label for="floatingTextarea"><dt>Comentario</dt> </label>
                                </div>

                            </div>
                            <div class="col"  >
                                <br />
                                <br />
                                <div>
                                    <img src={des1} class="img-fluid rounded-start" alt="..." />
                                </div>

                                <br />
                                <button type="submit" class="btn btn-success btn-lg">Enviar Comentarios</button>
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
