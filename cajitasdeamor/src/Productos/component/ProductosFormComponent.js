import React from "react";
import {withRouter} from "react-router-dom";

class ProductosFormComponent extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            productos:{
                id: " ",
                name:"",
            },
            categorias:{
                descripcion: "",
                idCategoria: " ",
            }
        }
    }

    componentDidMount() {
    }

    previewImage = _ =>{
        var reader = new FileReader();         
        reader.readAsDataURL(document.getElementById('qrImage').files[0]);   
        
        reader.onload = function (e) {             
            document.getElementById('uploadPreview2').src = e.target.result;         
        };  
    }

    back = _ =>{
        window.history.back();
    }

    menu = _ => {
        this.verify.MenuTypeUser(this.props.history);
    }

    handleChange=e=> {
        this.setState({
            bussinesVO : {
                ...this.state.bussinesVO,
                [e.target.name]: e.target.value
            }
        })
    }

    buttonS(){
        if(this.props.form){
            return( <input className="btn btn-success btn-block" type="submit" value="Editar producto"/>);
        }else{
            return( <input className="btn btn-success btn-block" type="submit" value="Registrar producto"/>);
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

    renderForm(){
        return<table className="table table-dark table-striped">
        <tbody>
            <tr>
                <div className="form-row">
                    <br/>
                    <div className="col-md-6 p-2">
                        <div className="text-center">
                            <div  className="p-4">
                                <img id="uploadPreview2"
                                src="https://drive.google.com/uc?export=view&id=1ZZpRLvGV02-M4Kstjy5JI2Z_EirFsj1z"
                                className="img-thumbnail"
                                width="75%"
                                alt="Vista previa"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="custom-file">
                                <input type="file"  className="form-control" id="qrImage" lang="es"
                                onChange={(event)=> { this.previewImage() }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <br/>
                        <div className="form-row">
                            <div className="p-2">
                                <label>Nombre:</label>
                            </div>
                            <div className="p-2">
                                <input className="form-control"
                                    type="text"
                                    name="name"
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
                                    type="text"
                                    name="precio"
                                    placeholder="$200.00"
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
                                    name="tamm"
                                    placeholder="20x20"
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
                                    name="catId"
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
                           name="description"/>
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
                                    <div className="table-responsive p-2">
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
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }


}
export default withRouter(ProductosFormComponent) 
