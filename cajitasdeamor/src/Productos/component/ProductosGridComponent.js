import React from "react";
import {Utils} from "../../resources/Utils";
import {withRouter} from "react-router-dom";
import {ProductosController } from "../controller/ProductosController";
import ProductosFormComponent from "./ProductosFormComponent";

class ProductosGridComponent extends React.Component {
    constructor(props) {
        super(props)
        this.productosController = new ProductosController();

        this.utils = new Utils();
        this.state = {
            tableData : {
                start : 0,
                limit : 8
            },
            page : 1,
            cardValue: 0,
            form: [],
            data: {
                data : [],
                total : 0
            },
            products:[{idProducto:" ", Nombre:" ", Precio:" ", Tamanio:" ", Categoria:{Descripcion:" "}}]
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        let respuesta = await this.productosController.findAll();
        this.setState({ products: respuesta });
    }

    changeStateFinal = (data) => {
        this.setState({cardValue: data.idProducto, form: data});
    }

    back = _ =>{
        window.history.back();
    }

    renderBody() {
        return this.state.products.map(d =>
            <tr key={d.idProducto}>
                 <td>{d.Nombre}</td>
                 <td>{d.Precio}</td>
                 <td>{d.Tamanio}</td>
                 <td>{d.Categoria.Descripcion}</td>
                 <td>
                    <button onClick={() => this.changeStateFinal(d)} class="btn btn-primary">Editar</button> &nbsp;
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>
                 </td>
            </tr>
        )
    }

    newBusinessBotton(){
        return (
            <div class="d-flex">
                <div class="ml-auto">
                    <div className="row justify-content-right" >
                        <a href="/productosForm" class="btn btn-success me-2">
                            Agregar
                        </a>
                    </div>
                </div>
            </div>
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
                            <div class="modal-body">Desea eliminar este producto?</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

                        <div className="col-lg-12 align-self-center">
                            <div className="card shadow bg-dark text-white" style={{ minHeight: "75%" }}>
                                <div className="card-header">
                                    <h1 className="text-center">Productos</h1>
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
                                                            <th>Nombre</th>
                                                            <th>Precio</th>
                                                            <th>Tamaño</th>
                                                            <th>Categoría</th>
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
            {this.state.cardValue < 1 ? <div>{this.renderCard()}</div> : <div>{<ProductosFormComponent form={this.state.form}/>}</div>}
        </>
    )
}

}
export default withRouter(ProductosGridComponent)