import React from "react";
import {withRouter} from "react-router";
import {IndexController} from "../controller/IndexController";
import banner from '../../resources/images/logo003.png';


class HomePageComponent extends React.Component{
    constructor() {
        super();
        this.indexController = new IndexController();

        //Almacena datos
        this.state = {
        }
    }

    //Inicializa funciones
    componentDidMount() {
    }


    render(){
        return(
            <div class="container-fluid p-8">
                <div class="row">
                    <div class="col my-6 col-sm-8 col-md-10 col-lg-10">
                        <center>
                            <img src={banner}/>
                        </center>
                    </div>
                    
                    <div class="col col-sm-12 col-md-12 col-lg-12">
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Inicio</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Tienda</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Acerca de nosotros</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Contactanos</button>
                            </div>
                            <div class="btn-group" role="group">

                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Right</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default lgBoton">Carrito</button>
                            </div>
                        </div>
                    </div>
                    <div class="col my-6 col-sm-8 col-md-10 col-lg-10">

                    </div>
                </div>
            </div>    
        );
    }
}
export default withRouter(HomePageComponent)