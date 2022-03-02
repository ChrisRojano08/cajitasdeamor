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
            data: {
                data : [],
                total : 0
            },
            form: [],
            categories:[{idProducto:" ", Nombre:" ", Precio:" ", Tamanio:" ", Categoria:{Descripcion:" "}}]
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData(){
        const respuesta = await fetch(`http://localhost:5000/product/findAll`,{
                'method':'POST',
                 headers : {
                'Content-Type':'application/json'
          },
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        console.log(respuesta)

        this.setState({categories : respuesta});
        console.log(this.state.categories);
    }

    renderBody() {
        return this.state.categories.map(d =>
            <tr key={d.idProducto}>
                 <td>{d.Nombre}</td>
                 <td>{d.Precio}</td>
                 <td>{d.Tamanio}</td>
                 <td>{d.Categoria.Descripcion}</td>
                 <td><a href="/productosForm" class="btn btn-primary">Editar</a></td>
            </tr>
        )
    }

    newBusinessBotton(){
        return (
            <div class="d-flex">
                <div class="ml-auto">
                    <div className="row justify-content-right" >
                        <a href="/productForm" class="btn btn-success me-2">
                            Agregar
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    renderCard() {
        return <div className="container-fluid py-3 my-6">
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