import React from "react";
import { Utils } from "../../resources/Utils";
import { withRouter } from "react-router-dom";
import { UsuariosController } from "../controller/UsuariosController";

class UsuariosGridComponent extends React.Component {
    constructor(props) {
        super(props)

        this.utils = new Utils();
        this.usersController = new UsuariosController();
        this.state = {
            cardValue: 0,
            form: [{ idUsuario: "a", Nombre: "A" }],
            usuarios: [{ idUsuario: " ", Nombre: " ", Apellidos: " ", Correo: " ", Tipo: "admin" }],
            idUsuario: -1,
            idActUser: -2,
            newType: ' '
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        let resp = await this.usersController.findAll();

        this.setState({ usuarios: resp });

        this.state.usuarios.map(d => this.selectedOpt(d.Tipo, d.idUsuario));
    }

    changeStateFinal = (data) => {
        this.setState({ cardValue: data.idProducto });
    }

    back = _ => {
        window.history.back();
    }

    selectedOpt(e, x) {
        let sele = document.getElementById('select' + x);

        switch (e) {
            case 'sudosu':
                sele.value = "0";
                break;
            case 'admin':
                sele.value = "1";
                break;
            case 'usuario':
                sele.value = "2";
                break;
            default: break;
        }
    }

    eliminarUsuario = async event => {
        let datos = { idUsuario: this.state.idUsuario }
        let resp = await this.usersController.eliminarUsuario(datos);

        if (resp.status === 'Ok') {
            window.location.reload(true);
            Utils.swalSuccess(resp.Mensaje);
        } else {
            Utils.swalError(resp.exception);
        }
    }

    setDatos = (id) => {
        this.setState({ idActUser: id }, () => {
            if (document.getElementById('select' + id).value === '0') {
                this.setState({ newType: 'sudosu' }, () => { document.getElementById('modalAct').click(); });

            } else if (document.getElementById('select' + id).value === '1') {
                this.setState({ newType: 'admin' }, () => { document.getElementById('modalAct').click(); });

            } else {
                this.setState({ newType: 'usuario' }, () => { document.getElementById('modalAct').click(); });
            }
        });
    }

    actualizarUsuario = async() => {
        let data = this.state.usuarios.find(x => x.idUsuario === this.state.idActUser);

        if (document.getElementById('select' + this.state.idActUser).value === 0) {
            data.Tipo = this.state.newType;
        } else if (document.getElementById('select' + this.state.idActUser).value === 1) {
            data.Tipo = this.state.newType;
        } else {
            data.Tipo = this.state.newType;
        }

        console.log(data)
        const resp = await this.usersController.updateUser(data);
        console.log(resp)

        if(resp[0].status === 'Ok'){
            Utils.swalSuccess(resp[0].Mensaje);

            setTimeout(() => window.location.reload(true), 500);
        }else{
            Utils.swalError(resp.exception);
        }
    }

    theadV() {
        if (sessionStorage.getItem("tipo") === "sudosu") {
            return (
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Tamaño</th>
                        <th>Tipo</th>
                        <th>Editar</th>
                    </tr>
                </thead>
            );
        } else {
            return (
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Tamaño</th>
                        <th>Editar</th>
                    </tr>
                </thead>
            );
        }
    }

    renderBody() {
        return this.state.usuarios.map(d =>
            <tr key={d.idUsuario}>
                <td>{d.Nombre}</td>
                <td>{d.Apellidos}</td>
                <td>{d.Correo}</td>
                <td>
                    <select className="form-control"
                        aria-label=".form-select-lg example"
                        name="catId" id={"select" + d.idUsuario}
                        onChange={() => this.setDatos(d.idUsuario)}
                        required>
                        <option value="0">Super Administrador</option>
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                    </select>
                </td>
                <td>
                    <button type="button" className="btn btn-danger"
                        data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.setState({ idUsuario: d.idUsuario })}>Eliminar</button>
                    <button type="button" className="btn btn-danger"
                        data-bs-toggle="modal" data-bs-target="#exampleModal02" id='modalAct' style={{ 'display': 'none' }}>xd</button>
                </td>
            </tr>
        )
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">

            <div className="modal fade" id="exampleModal02" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Actualizar usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Desea cambiar el tipo de este usuario?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => this.actualizarUsuario()}>Cambiar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmar eliminacion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Desea eliminar este usuario?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => this.eliminarUsuario()}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-12 align-self-center">
                <div className="card shadow bg-dark text-white" style={{ minHeight: "75%" }}>
                    <div className="card-header">
                        <h1 className="text-center">Usuarios</h1>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid contProd">
                            <br /><br />
                            <div className="row justify-content-center mt-3">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped ">
                                        {this.theadV()}
                                        <tbody>
                                            {this.renderBody()}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <center><div className="col-6"><button type="button" className="btn btn-info" onClick={() => this.back()}>Regresar</button></div></center>
                        <br />
                    </div>
                    <br /><br />
                </div>
            </div>
        </div>

    }

    render() {
        return (
            <>
                {this.state.cardValue < 1 ? <div>{this.renderCard()}</div> : <div>{ }</div>}
            </>
        )
    }

}
export default withRouter(UsuariosGridComponent)