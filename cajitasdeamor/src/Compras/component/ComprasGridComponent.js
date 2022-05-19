import React from "react";
import {Utils} from "../../resources/Utils";
import {withRouter} from "react-router-dom";
import {ComprasController } from "../controller/ComprasController";

class ComprasGridComponent extends React.Component {
    constructor(props) {
        super(props)
        this.comprasController = new ComprasController();

        this.utils = new Utils();
        this.state = {
            cardValue: 0,
            idCompra: -1,
            estado: " ",
            compras:[
                {
                    Dedicatoria: " ",
                    Estado: " ",
                    Fecha: " ",
                    Monto: "" ,
                    Nombre: " ",
                    idCompra: " ",
                    idDomicilio: " ",
                    idMetodoPago: " ",
                    idUsuario: [
                        {
                            Apellidos: " ",
                            Correo: " ",
                            Nombre: " ",
                            Tipo: " ",
                            idUsuario: " "
                        }
                    ],
                    idsProductos: [
                        [
                            {
                                Categoria: {
                                    Descripcion: " ",
                                    idCategoria: " "
                                },
                                Descripcion: " ",
                                Imagen: " ",
                                Nombre: " ",
                                Precio: " ",
                                Tamanio: " ",
                                idProducto: " "
                            }
                        ]
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData(){
        let respuesta = await this.comprasController.findAll();
        this.setState({ compras: respuesta });

        this.state.compras.map(d => this.selectedOpt(d.Estado, d.idCompra));
    }

    changeStateFinal = (data) => {
        this.setState({cardValue: data.idProducto});
    }

    back = _ =>{
        window.history.back();
    }

    selectedOpt(e, x){
        let sele = document.getElementById('select'+x);

        switch (e) {
            case 'En espera':
                sele.value="0";
                break;
            case 'En construccion':
                sele.value="1";
                break;
            case 'Llevando a paquetería':
                sele.value="2";
                break;
            case 'En reparto':
                sele.value="3";
                break;
            case 'En devolución':
                sele.value="4";
                break;
            case 'Entregado':
                sele.value="5";
            break;
            case 'Cancelado':
                sele.value="6";
                break;
            default: break;
        }
    }

    setDatos = (id) =>{
        this.setState({idCompra:id});
    }

    cambiarEstado = async event =>{
        let datos={
            idCompra: this.state.idCompra,
            Estado: document.getElementById('select'+this.state.idCompra).value
        }

        let resp = await this.comprasController.cambiarEstado(datos);
        if(resp[0].status==='Ok'){
            Utils.swalSuccess(resp[0].Mensaje);
            window.location.reload(true);
        }else{
            Utils.swalError(resp[0].exception);
        }
    }

    cancelarCompra = async event =>{
        let datos={idCompra: this.state.idCompra}

        let resp = await this.comprasController.cancelarCompra(datos);

        if(resp[0].status==='Ok'){
            window.location.reload(true);
            Utils.swalSuccess(resp[0].Mensaje);
        }else{
            Utils.swalError(resp[0].exception);
        }
    }

    renderBody() {
        return this.state.compras.map(d =>
            <tr key={d.idCompra}>
                 <td>{d.idCompra}</td>
                 <td>{d.idUsuario[0].Nombre}</td>
                 <td>{d.Fecha}</td>
                 <td>
                    <select className="form-control"
                        aria-label=".form-select-lg example"
                        name="catId" id={"select"+d.idCompra}
                        required>
                            <option value="0">En espera</option>
                            <option value="1">En construcción</option>
                            <option value="2">Llevando a paquetería</option>
                            <option value="3">En reparto</option>
                            <option value="4">En devolución</option>
                            <option value="5">Entregado</option>
                            <option value="6">Cancelado</option>
                    </select>
                 </td>
                 <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal02" onClick={() => this.setDatos(d.idCompra)}> Guardar </button> &nbsp;
                    <button type="button" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal01" onClick={() => this.setDatos(d.idCompra)}> Cancelar </button>
                 </td>
            </tr>
            
        )
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">
            
                <div class="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar cancelacion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea cancelar esta compra?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() =>this.cancelarCompra()}>Si</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal02" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar guardado</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea cambiar esta compra?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() =>this.cambiarEstado()}>Cambiar</button>
                            </div>
                        </div>
                    </div>
                </div>

                        <div className="col-lg-12 align-self-center">
                            <div className="card shadow bg-dark text-white" style={{ minHeight: "75%" }}>
                                <div className="card-header">
                                    <h1 className="text-center" onClick={()=>this.selectedOpt('Entregado')}>Compras</h1>
                                </div>
                                <div className="card-body">
                                    <div className="container-fluid contProd">
                                        <br/><br/>
                                        <div className="row justify-content-center mt-3">
                                            <div className="table-responsive">
                                                <table className="table table-dark table-striped ">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Id compra</th>
                                                            <th>Usuario</th>
                                                            <th>Fecha</th>
                                                            <th>Estado</th>
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
export default withRouter(ComprasGridComponent)