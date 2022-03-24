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
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Contactanos</h1>
                <h4 style={{ color: 'black', fontFamily: '10px' }}>Siempre estamos abiertos a nuevas propuestas</h4>
                <br/>

                <form class="row g-4 needs-validation justify-content-center " novalidate style={{ background: '#dddddd' }}>

                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip01" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="validationTooltip01" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip02" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" id="validationTooltip02" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="validationTooltip03" class="form-label">Motivo</label>
                        <input type="text" class="form-control" id="validationTooltip03" required />
                    </div>
                    <div class="col-md-5 position-relative">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-md-10 position-relative">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                    <br/>
                </form>
                <br/>
            </div>
        )
    }
}
export default withRouter(ContactanosComponent)