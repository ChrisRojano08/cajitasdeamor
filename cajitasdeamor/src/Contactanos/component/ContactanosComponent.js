import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { ContactanosController } from "../controller/ContactanosController";


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

    render() {
        return (
            <div class="container-fluid p-8">
                <h1>Contactanos</h1>
                <h3>Siempre estamos abiertos a nuevas propuestas</h3>
                <div class="ContenedorN">
                    <div class="ContenedorCon">
                        <div>
                            <input class="ConteContac" id="NombreCon" type="text" name="Nombre" placeholder="Nombre"></input>
                            <input class="ConteContac" id="ApellidoCon" type="text" name="Apellidos" placeholder="Apellidos"></input>
                        </div>
                        <div>
                            <input class="ConteContac" id="CorreoCon" type="email" name="Correo" placeholder="Correo"></input>
                            <input class="ConteContac" id="MotivoCon" type="text" name="Motivo" placeholder="Motivo"></input>
                        </div>
                        <div>
                            <input class="ConteContac_2" id="MensajeCon" type="text" name="Mensjae" placeholder="Escribe Tu mensaje"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ContactanosComponent)