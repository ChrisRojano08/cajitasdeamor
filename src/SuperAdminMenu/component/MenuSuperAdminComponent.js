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
        event.preventDefault();
        this.props.history.push('/productosGrid');
    }

    irClientes = event => {
        event.preventDefault();
        this.props.history.push('/usuariosGrid');
    }

    irCompras = event => {
        event.preventDefault();
        this.props.history.push('/Compras');
    }

    logout = event => {
        event.preventDefault();
        sessionStorage.clear();
        this.props.history.push('/login')
        setTimeout(() => window.location.reload(true), 600);
    }

    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="cotainer-lg">
                    <div className="container bg-dark text-white">
                    <br/>
                        <h1>Menu de administrador</h1>
                        <br/><br/>
                        <center>
                            <div className="row justify-content-center">
                                <div className="col-6 col-lg-4">
                                    <button type="button" className="btn btn-warning btn-lg menBt" 
                                    onClick={this.irProductos}
                                    style={{'width':'60%', 'height': '90%'}}>
                                        <i className="fi fi-rr-boxes"/>
                                        <br/>
                                        Administrar productos
                                    </button>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <button type="button" className="btn btn-info btn-lg menBt" 
                                    onClick={this.irClientes}
                                    style={{'width':'60%', 'height': '90%'}}>
                                        <i className="fi fi-rr-users-alt"/>
                                        <br/>
                                        Administrar usuarios
                                    </button>
                                </div>
                            </div>
                            <br/>
                            <div className="row justify-content-center">
                                <div className="col-6 col-lg-4">
                                    <button type="button" className="btn btn-primary btn-lg menBt" 
                                    onClick={this.irCompras}
                                    style={{'width':'60%', 'height': '90%'}}>
                                        <i className="fi fi-rr-bags-shopping"/>
                                        <br/>
                                        Administrar compras
                                    </button>
                                </div>
                                <div className="col-6 col-lg-4">
                                    <button type="button" className="btn btn-danger btn-lg menBt" 
                                    onClick={this.logout}
                                    style={{'width':'60%', 'height': '90%'}}>
                                        <i className="fi fi-rr-sign-out-alt"/>
                                        <br/>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div><br/><br/>
                        </center>
                    </div>
                </div>
                <br/>
            </div>
        )
    }

}
export default withRouter(MenuSuperAdminComponent)
