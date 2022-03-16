import React from "react";
import '../../resources/css/nosotros.css';
import Fondo from '../../resources/images/usuario001.png';
import { withRouter } from "react-router";
import { NosotrosController } from "../controller/NosotrosController";

class NosotrosComponent extends React.Component {
    constructor() {
        super();
        this.NosotrosController = new NosotrosController();

        //Almacena datos
        this.state = {
        }
    }


    //Inicializa funciones
    componentDidMount() {
    }

    render() {
        return (
            <div class="container-fluid ">
                <h1 style={{ color: 'red' }} >Acerca De Nosotros</h1>

                <div class="ContenedorN">
                    <div class="cont">
                        <div>
                            <img class="imgp" src={Fondo} />
                        </div> 
                        <div class="Nombre">
                            Jairo Cruz Diaz
                        </div> 
                        <div class="Puesto">
                            Desarrollador
                        </div>
                        <div class="informacion">
                            Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion
                        </div>
                        <div>
                        </div>
                    </div>
                    <div class="cont">
                        <div>
                            <img class="imgp" src={Fondo} />
                        </div> 
                        <div class="Nombre">
                            Esaú Abraham Meneses Báez 
                        </div> 
                        <div class="Puesto">
                            Desarrollador
                        </div>
                        <div class="informacion">
                            Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion
                        </div>
                        <div>
                            <i class="fi fi-brands-facebook"></i>
                            <a href="https://www.facebook.com/jairo.cruz.1238"></a>
                        </div>
                    </div>
                    <div class="cont">
                        <div>
                            <img class="imgp" src={Fondo} />
                        </div> 
                        <div class="Nombre">
                            Christopher Rojano Jimenez
                        </div> 
                        <div class="Puesto">
                            Desarrollador
                        </div>
                        <div class="informacion">
                            Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion
                        </div>
                        <div>
                            <i class="fi fi-brands-facebook"></i>
                            <a href="https://www.facebook.com/jairo.cruz.1238"></a>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withRouter(NosotrosComponent)