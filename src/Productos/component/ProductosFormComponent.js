import React from "react";
import {withRouter} from "react-router-dom";
import { Utils } from "../../resources/Utils";
import {ProductosController} from "../controller/ProductosController";

class ProductosFormComponent extends React.Component{

    constructor(props) {
        super(props)
        this.productosController = new ProductosController();
        this.state = {
            productos:{
                idProducto: " ",
                Nombre:"",
                Descripcion:" ",
                Categoria:{
                    idCategoria:0,
                    Descripcion:" "
                },
                idCategoria:0,
                Precio:" ",
                Tamanio:" ",
                Imagen:" "
            },
            Categoria:{
                idCategoria:0,
                Descripcion:" "
            },
            categorias:{
                descripcion: "",
                idCategoria: " ",
            }
        }
    }

    componentDidMount() {
        if(this.props.form){
            this.setState({productos:this.props.form});
            setTimeout(() => {
                this.setState({productos:this.props.form});
                this.setState({Categoria:this.props.form.Categoria})
            }, 500);
            setTimeout(() => {
                document.getElementById('uploadPreview').src = this.state.productos.Imagen;
                document.getElementById('ImagenIn').value = this.state.productos.Imagen;
                document.getElementById('PrecioIn').value = this.state.productos.Precio;
                document.getElementById('TamanioIn').value = this.state.productos.Tamanio;
                document.getElementById('idCategoriaIn').value = this.state.Categoria.idCategoria;
                document.getElementById('DescripcionIn').value = this.state.productos.Descripcion;
            }, 800);  
        }
    }

    back = _ =>{
        if (this.props.form){
            window.history.go();
        }else{
            window.history.back();
        }
    }

    menu = _ => {
        this.verify.MenuTypeUser(this.props.history);
    }

    handleChange=e=> {
        this.setState({
            productos : {
                ...this.state.productos,
                [e.target.name]: e.target.value
            }
        })
    }

    handleChangeCat=e=> {
        this.setState({
            Categoria : {
                ...this.state.Categoria,
                [e.target.name]: e.target.value
            }
        })
    }

    buttonS(){
        if(this.props.form){
            return( <center><input className="btn btn-success btn-block btn-lg" type="submit" value="Editar producto"/></center>);
        }else{
            return( <center><input className="btn btn-success btn-block btn-lg" type="submit" value="Registrar producto"/></center>);
        }
    }

    edit=async e=>{
        e.preventDefault();

        this.state.productos.idCategoria = this.state.Categoria.idCategoria

        let resp = await this.productosController.update(this.state.productos);

        if(resp[0].status==='Ok'){
            Utils.swalSuccess(resp[0].Mensaje);
            setTimeout(() => { this.props.history.push('/productosGrid') }, 1500);
            setTimeout(() => { window.location.reload(true) }, 2000);
        }else{
            Utils.swalError(resp.exception);
        }
    }

    insert=async e=>{
        e.preventDefault();

        this.state.productos.idCategoria = this.state.Categoria.idCategoria

        let resp = await this.productosController.insert(this.state.productos);
        
        if(resp[0].status==='Ok'){
            Utils.swalSuccess(resp[0].Mensaje);
            setTimeout(() => { this.props.history.push('/productosGrid') }, 1500);
            setTimeout(() => { window.location.reload(true) }, 2000);
        }else{
            Utils.swalError(resp.exception);
        }
    }

    formS(){
        if(this.props.form){
            return(
                <form onSubmit={this.edit} enctype="multipart/form-data">
                    {this.renderForm()}
                </form>);
        }else{
            return(
                <form onSubmit={this.insert} enctype="multipart/form-data">
                    {this.renderForm()}
                </form>);
        }
    }

    tittleS(){
        if(this.props.form){
            return(
            <h1 className="text-center"> Edicion de producto </h1>);
        }else{
            return(
            <h1 className="text-center"> Alta de producto </h1>);
        }
    }

    cargarImagen = () =>{
        let url = document.getElementById('ImagenIn').value;
        document.getElementById('uploadPreview').src = url;
    }

    renderForm(){
        return<table className="table table-dark table-striped">
        <tbody>
            <tr>
                <div className="row">
                    <br/>
                    <div className="col-md-12 col-lg-4 col-sm-12 p-2">
                    <div className="text-center">
                            <div className="p-4">
                                <img id="uploadPreview"
                                    src="https://drive.google.com/uc?export=view&id=1ZZpRLvGV02-M4Kstjy5JI2Z_EirFsj1z"
                                    className="imgProdt"
                                    width="100%"
                                    alt="Vista previa"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    name="Imagen"
                                    id="ImagenIn"
                                    className="form-control"
                                    placeholder="Inserte la url..."
                                    aria-label="Inserte la url..."
                                    aria-describedby="basic-addon2"
                                    required
                                    onChange={this.handleChange}/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={()=> {this.cargarImagen()}}
                                    >
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 col-lg-2 col-sm-1">
                    </div>
                    <div className="col-md-12 col-lg-5 col-sm-12 p-2">
                        <br/>
                        <div className="form-row">
                            <div className="p-2">
                                <label>Nombre:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control"
                                    type="text"
                                    name="Nombre"
                                    placeholder="Nombre"
                                    defaultValue={this.state.productos.Nombre}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="form-row">
                            <div className="p-2">
                                <label>Precio:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control"
                                    type="number"
                                    name="Precio"
                                    id="PrecioIn"
                                    min={10}
                                    max={9999}
                                    placeholder="200.00"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="form-row">
                            <div className="p-2">
                                <label>Tamaño:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control"
                                    type="text"
                                    name="Tamanio"
                                    id="TamanioIn"
                                    placeholder="20x20"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="form-row">
                            <div className="p-2">
                                <label>Seleccione la categoria del producto:</label>
                            </div>
                            <div className="p-2">
                                <select className="form-control"
                                    aria-label=".form-select-lg example"
                                    name="idCategoria"
                                    id="idCategoriaIn"
                                    onChange={this.handleChangeCat}
                                    required>
                                    <option value="1">Graduacion</option>
                                    <option value="2">14 de febrero</option>
                                    <option value="3">Día de la mamá</option>
                                    <option value="4">Día del papá</option>
                                    <option value="5">Cumpleaños</option>
                                    <option value="6">Otros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </tr>
            <tr>
                <td>
                    <br/>
                    <label>Descripción:</label>
                    <textarea className="form-control"
                           type="text"
                           maxLength="200"
                           name="Descripcion"
                           id="DescripcionIn"
                           onChange={this.handleChange}
                           />
                </td>
            </tr>
            <br/>
            <tr>
                <td colSpan="2">
                    <div>
                        {this.buttonS()}
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    }

    
    render() {
        return (
            <div className="container py-md-4 py-lg-4 py-sm-2 py-xl-5" >
                <div className="row justify-content-center">
                    <div className="col-sd-12 col-md-10 col-lg-12 align-self-center">
                        <div className="card shadow bg-dark text-white">
                            <div className="card-header">
                                {this.tittleS()}
                            </div>
                            <br/><br/>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="table-responsive p-4">
                                        {this.formS()}
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="container-fluid">
                                    <div className="row">
                                    </div>
                                </div>
                            </div>
                                <div className="row">
                                    <center><div className="col-6"><button type="button" className="btn btn-info" onClick={() => this.back()}>Regresar</button></div></center>
                                    <br/>
                                </div>
                                <br/><br/>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }


}
export default withRouter(ProductosFormComponent) 
