import React from "react";
import '../../resources/css/nosotros.css';
import Fondo from '../../resources/images/place.png';
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

                <div class="card-group">
                    <div class="card">
                        <img src={Fondo} class="card-img-top" alt="..."  style={{ width:'auto',height:'60%' }}/>
                        <div class="card-body">
                            <h5 class="card-title">Jairo Cruz Diaz</h5>
                            <p class="card-text">Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion.</p>
                        </div>
                        <div class="card-footer d-flex justify-content-evenly">
                            <small class="text-muted">
                                <a href="https://www.facebook.com/jairo.cruz.1238"><i class="fi fi-brands-facebook" style={{ color: 'black' }}/></a> &nbsp;&nbsp;
                                <a href="https://www.instagram.com/jairo_cruz_diaz/"><i class="fi fi-brands-instagram" style={{ color: 'black' }}/></a>
                            </small>
                        </div>
                    </div>
                    <div class="card">
                        <img src={Fondo} class="card-img-top" alt="..."  style={{ width:'auto',height:'60%' }}/>
                        <div class="card-body">
                            <h5 class="card-title">Esaú Abraham Meneses Báez</h5>
                            <p class="card-text">Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion.</p>
                        </div>
                        <div class="card-footer d-flex justify-content-evenly">
                            <small class="text-muted">
                            <a href="https://www.facebook.com/BSQKirito"><i class="fi fi-brands-facebook" style={{ color: 'black' }}/></a> &nbsp;&nbsp;
                            <a href="https://www.instagram.com/_esaumeneses/"><i class="fi fi-brands-instagram" style={{ color: 'black' }}/></a>
                            </small>
                        </div>
                    </div>
                    <div class="card">
                        <img src={Fondo} class="card-img-top" alt="..."  style={{ width:'auto',height:'60%' }}/>
                        <div class="card-body">
                            <h5 class="card-title">Christopher Rojano Jimenez</h5>
                            <p class="card-text">Desarrollador de la pagina web.integrado el 10 de septiembre de 2021, estuidiante de la UATx en la Lic. en Ing. En computacion.</p>
                        </div>
                        <div class="card-footer d-flex justify-content-evenly">
                            <small class="text-muted">
                                <a href="https://www.facebook.com/christopher.rojano.9"><i class="fi fi-brands-facebook" style={{ color: 'black'}}/></a> &nbsp;&nbsp;
                                <a href="https://www.instagram.com/christopher.rojano/"><i class="fi fi-brands-instagram" style={{ color: 'black' }}/></a>
                            </small>
                        </div>
                    </div>
                    
                </div>
                <br/><br/>
            </div>
        )
    }
}
export default withRouter(NosotrosComponent)