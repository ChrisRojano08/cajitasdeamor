import React from "react";
import {Utils} from "../../resources/Utils";
import {withRouter} from "react-router-dom";
import {UsuariosController} from "../controller/UsuariosController";

class UsuariosGridComponent extends React.Component {
    constructor(props) {
        super(props)

        this.utils = new Utils();
        this.usersController = new UsuariosController();
        this.state = {
            cardValue: 0,
            form: [{idUsuario:"a", Nombre:"A"}],
            usuarios:[{idUsuario:" ", Nombre:" ", Apellidos:" ", Correo:" "}],
            idUsuario: -1
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        let resp = await this.usersController.findAll();

        this.setState({usuarios : resp});
        console.log(this.state.usuarios);
    }

    changeStateFinal = (data) => {
        this.setState({cardValue: data.idProducto});
    }

    back = _ =>{
        window.history.back();
    }

    eliminarUsuario = async event =>{
        let datos={idUsuario:this.state.idUsuario}
        let resp = await this.usersController.eliminarUsuario(datos);

        if(resp.status==='Ok'){
            //window.location.reload(true);
            Utils.swalSuccess(resp.Mensaje);
        }else{
            Utils.swalError(resp.exception);
        }
    }

    renderBody() {
        return this.state.usuarios.map(d =>
            <tr key={d.idUsuario}>
                 <td>{d.Nombre}</td>
                 <td>{d.Apellidos}</td>
                 <td>{d.Correo}</td>
                 <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.setState({idUsuario:d.idUsuario})}>Eliminar</button>
                 </td>
            </tr>
        )
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">
            
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar eliminacion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea eliminar este usuario?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=>this.eliminarUsuario()}>Eliminar</button>
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
                                        <br/><br/>
                                        <div className="row justify-content-center mt-3">
                                            <div className="table-responsive">
                                                <table className="table table-dark table-striped ">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Nombre</th>
                                                            <th>Precio</th>
                                                            <th>Tamaño</th>
                                                            <th>Editar</th>
                                                        </tr>
                                                    </thead>
                                                   <tbody>
                                                    { this.renderBody()} 
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <center><div class="col-6"><button type="button" class="btn btn-info" onClick={() => this.back()}>Regresar</button></div></center>
                                    <br/>
                                </div>
                                <br/><br/>
                            </div>
                        </div>
                </div>
                
    }

render() {
    return (
        <>
            {this.state.cardValue < 1 ? <div>{this.renderCard()}</div> : <div>{}</div>}
        </>
    )
}

}
export default withRouter(UsuariosGridComponent)