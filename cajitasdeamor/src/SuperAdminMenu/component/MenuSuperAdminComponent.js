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
        this.props.history.push('/clientesGrid')
    }

    irCompras = event => {
        event.preventDefault()
    }

    logout = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div class="container-fluid p-8">
                <h1>Menu de administrador</h1>
                <br/><br/>
                <div class="ContenedorN">
                    <div>
                        <div className="cotainer-sm">
                            <div className="container bg-dark text-white">
                                <button type="button" className="btn btn-warning btn-md btn-block menBt" onClick={this.irProductos}>Administrar productos</button>
                                <button type="button" class="menBt" className="btn btn-info btn-md btn-block menBt" onClick={this.irClientes}>Administrar clientes</button>
                                <button type="button" class="menBt" className="btn btn-primary btn-md btn-block menBt" onClick={this.irCompras}>Administrar compras</button>
                                <br />
                                <button type="button" class="menBt" className="btn btn-danger btn-md btn-block menBt" onClick={this.logout}>Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(MenuSuperAdminComponent)
