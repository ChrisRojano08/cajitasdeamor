import React from "react";
import {Utils} from "../../resources/Utils";
import {withRouter} from "react-router-dom";
/*import {ProductosController } from "../controller/ProductosController";
import ProductosFormComponent from "./ProductosFormComponent";*/

class ComprasGridComponent extends React.Component {
    constructor(props) {
        super(props)
        /*this.productosController = new ProductosController();*/

        this.utils = new Utils();
        this.state = {
            tableData : {
                start : 0,
                limit : 8
            },
            page : 1,
            cardValue: 0,
            data: {
                data : [],
                total : 0
            },
            form: [{idProducto:"a", Nombre:"A"}],
            categories:[{idProducto:" ", Nombre:" ", Precio:" ", Tamanio:" ", Categoria:{Descripcion:" "}}]
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        /*const respuesta = await fetch(`http://localhost:5000/product/findAll`,{
                'method':'POST',
                 headers : {
                'Content-Type':'application/json'
          },
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        console.log(respuesta)

        this.setState({categories : respuesta});
        console.log(this.state.categories);*/
    }

    changeStateFinal = (data) => {
        this.setState({cardValue: data.idProducto});
    }

    back = _ =>{
        window.history.back();
    }

    renderBody() {
        return this.state.categories.map(d =>
            <tr /*key={d.idProducto}*/>
                 <td>01</td>
                 <td>Christopher</td>
                 <td>22/03/2022</td>
                 <td>
                    <select className="form-control"
                        aria-label=".form-select-lg example"
                        name="catId" required>
                        <option value="1">En construccion</option>
                        <option value="2">Llevando a paqueteria</option>
                        <option value="3">En viaje</option>
                        <option value="4">En devolución</option>
                        <option value="5">Entregado</option>
                    </select>
                 </td>
                 <td>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Guardar</button> &nbsp;
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                 </td>
            </tr>
            
        )
    }

    newBusinessBotton(){
        /*return (
            <div class="d-flex">
                <div class="ml-auto">
                    <div className="row justify-content-right" >
                        <a href="/productosForm" class="btn btn-success me-2">
                            Agregar
                        </a>
                    </div>
                </div>
            </div>
        )*/
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">
            
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar cancelacion</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea cancelar esta compra?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Si</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmar guardado</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">Desea cambiar esta compra?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cambiar</button>
                            </div>
                        </div>
                    </div>
                </div>

                        <div className="col-lg-12 align-self-center">
                            <div className="card shadow bg-dark text-white" style={{ minHeight: "75%" }}>
                                <div className="card-header">
                                    <h1 className="text-center">Compras</h1>
                                </div>
                                <div className="card-body">
                                    <div className="container-fluid contProd">
                                        {this.newBusinessBotton()} 
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
                                                    <tr /*key={d.idProducto}*/>
                                                        <td>02</td>
                                                        <td>Christopher</td>
                                                        <td>25/03/2022</td>
                                                        <td>
                                                            <select className="form-control"
                                                                aria-label=".form-select-lg example"
                                                                name="catId" required>
                                                                <option value="1">En construccion</option>
                                                                <option value="2">Llevando a paqueteria</option>
                                                                <option value="3">En viaje</option>
                                                                <option value="4">En devolución</option>
                                                                <option value="5">Entregado</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button /*onClick={() => this.changeStateFinal(d)}*/ class="btn btn-primary">Guardar</button> &nbsp;
                                                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                                                        </td>
                                                    </tr>
                                                    <tr /*key={d.idProducto}*/>
                                                        <td>03</td>
                                                        <td>Armando</td>
                                                        <td>20/03/2022</td>
                                                        <td>
                                                            <select className="form-control"
                                                                aria-label=".form-select-lg example"
                                                                name="catId" required>
                                                                <option value="1">En construccion</option>
                                                                <option value="2">Llevando a paqueteria</option>
                                                                <option value="3">En viaje</option>
                                                                <option value="4">En devolución</option>
                                                                <option value="5">Entregado</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button /*onClick={() => this.changeStateFinal(d)}*/ class="btn btn-primary">Guardar</button> &nbsp;
                                                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                                                        </td>
                                                    </tr>
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
            {this.state.cardValue < 1 ? <div>{this.renderCard()}</div> : <div>{/*<ProductosFormComponent form={this.state.form}/>*/}</div>}
        </>
    )
}

}
export default withRouter(ComprasGridComponent)