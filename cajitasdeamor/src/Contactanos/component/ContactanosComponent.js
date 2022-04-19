import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { ContactanosController } from "../controller/ContactanosController";
import emailjs from "emailjs-com";
import {Utils} from '../../resources/Utils';

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

        emailjs.sendForm('service_q03spzk', 'template_wtrfkym', e.target, 'rRgb6F4Wl1gVg9TDY').then(res=>{
            if(res.text==='OK'){
                Utils.swalSuccess("Sus comentarios fueron enviados con exito!!");
                this.props.history.push('/');
                window.location.reload(true);
            }else{
                Utils.swalError("No se pudieron enviar sus comentarios, intente de nuevo más tarde.");
            }

        });
    }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Contactanos</h1>
                <br/>
                <h4 style={{ color: 'black', fontFamily: '10px' }}>Siempre estamos abiertos a nuevas propuestas</h4>
                <br/>

                <form class="row g-4 needs-validation justify-content-center " novalidate style={{ background: '#dddddd' }} onSubmit={this.enviarEmail}>
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip01" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="validationTooltip01" name="nombre" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip02" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" id="validationTooltip02" name="apellidos" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip03" class="form-label">Motivo</label>
                        <input type="text" class="form-control" id="validationTooltip03" name="motivo" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="exampleInputEmail1" class="form-label">Correo</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="correo"/>
                    </div>
                    <div class="col-md-10 position-relative">
                        <label for="exampleFormControlTextarea1" class="form-label">Mensaje</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="mensaje"></textarea>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-primary" type="submit">Enviar</button>
                    </div>
                    <br/>
                </form>
                <br/>
            </div>
        )
    }
}
export default withRouter(ContactanosComponent)