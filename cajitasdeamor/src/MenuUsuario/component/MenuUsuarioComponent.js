import React from "react";
import '../../resources/css/contactanos.css';
import { withRouter } from "react-router";
import { MenuUsuarioController } from "../controller/MenuUsuarioController";
import { Utils } from '../../resources/Utils';


class MenuUsuarioComponent extends React.Component {
    constructor() {
        super();
        this.MenuUsuarioController = new MenuUsuarioController();
    }


    //Inicializa funciones
    componentDidMount() {
    }

    render() {
        return (
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Menu Usuario</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        )
    }
}
export default withRouter(MenuUsuarioComponent)