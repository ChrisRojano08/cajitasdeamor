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
            products:[{idProducto:" ", Nombre:" ", Precio:" ", Tamanio:" ", Categoria:{Descripcion:" "}}],
            idProducto: -1
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

    setDatos = (id) =>{
        this.setState({idProducto:id});
    }

    delete = () => {
        this.deleteCart();
    }

    async deleteCart(){
        let datos = {idProducto: this.state.idProducto};
        let respuesta = await this.productosController.delete(datos);

        if(respuesta.status === 'Ok'){
            Utils.swalSuccess(respuesta.Mensaje);
            setTimeout(()=> window.location.reload(true), 800);
        }else{
            Utils.swalError(respuesta.exception);
        }
    }

    renderBody() {
        return this.state.products.map(d =>
            <tr key={d.idProducto}>
                 <td>{d.Nombre}</td>
                 <td>{d.Precio}</td>
                 <td>{d.Tamanio}</td>
                 <td>{d.Categoria.Descripcion}</td>
                 <td>
                    <button onClick={() => this.changeStateFinal(d)} className="btn btn-primary">Editar</button> &nbsp;
                    <button type="button" className="btn btn-danger"
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={() => this.setDatos(d.idProducto)}>Eliminar</button>
                 </td>
            </tr>
        )
    }

    newBusinessBotton(){
        return (
            <div className="d-flex">
                <div className="ml-auto">
                    <div className="row justify-content-right" >
                        <a href="/productosForm" className="btn btn-success me-2">
                            Agregar
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">
            
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Confirmar eliminacion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">Desea eliminar este producto?</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary my-2" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-danger mt-4" data-bs-dismiss="modal" onClick={() =>this.delete()}>Eliminar</button>
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
                                        <div className="row justify-content-start">
                                            <div className="col-2 mx-4"><button type="button" className="btn btn-info" onClick={() => this.back()}>Regresar</button></div>
                                            <div className="col-2 mx-4">{this.newBusinessBotton()}</div>
                                        </div>
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