import React from "react";
import { withRouter } from "react-router-dom";

class MenuSuperAdminComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {

    }

    irProductos = event => {
        event.preventDefault()
        this.props.history.push('/productosGrid')
    }

    irClientes = event => {
        event.preventDefault()
        this.props.history.push('/usuariosGrid')
    }

    irCompras = event => {
        event.preventDefault()
    }

    logout = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div class="container-fluid my-6">
                <div className="cotainer-lg">
                    <div className="container bg-dark text-white">
                        <br/><br/>  
                        <h1>Menu de administrador</h1>
                        <br/><br/>
                        <center>
                            <div class="row">
                                <div class="colm-4">
                                    <button type="button" className="btn btn-warning btn-md btn-block menBt" onClick={this.irProductos}>Administrar productos</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="colm-4">
                                    <button type="button" className="btn btn-info btn-md btn-block menBt" onClick={this.irClientes}>Administrar clientes</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="colm-4">
                                    <button type="button" className="btn btn-primary btn-md btn-block menBt" onClick={this.irCompras}>Administrar compras</button>
                                </div>
                            </div>
                            <div class="row mt-4 mb-4">
                                <div class="colm-4">
                                    <button type="button" className="btn btn-danger btn-md btn-block menBt" onClick={this.logout}>Cerrar Sesión</button>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
                <br/><br/>
            </div>
        )
    }

}
export default withRouter(MenuSuperAdminComponent)
