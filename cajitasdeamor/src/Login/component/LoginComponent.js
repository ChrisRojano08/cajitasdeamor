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
            <div class="container-fluid p-8">
                <h1>Login</h1>
            </div>
        )
    }
}
export default withRouter(LoginComponent)