import React from "react";
import '../../resources/css/nosotros.css';
import bannerlogC from '../../resources/images/logo003.png';
import fun from '../../resources/images/fundadora.jpeg';
import des1 from '../../resources/images/Desarrollador1.jpeg';
import des2 from '../../resources/images/Desarrollador2.jpeg';
import des3 from '../../resources/images/Desarrollador3.jpeg';

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
            <div className="container-fluid row justify-content-md-center">
                <h1 style={{ color: 'red' }} className="text-center">Acerca De Nosotros</h1>

                <div className="card mb-3" style={{width: '75%'}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img  src={bannerlogC}  className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Cajitas de amor</h5>
                                <p className="card-text">Cajitas de amor Es un proyecto, en el cual se intenta poder facilitar el poder dar un detalle a ese alguiene especial para ti, un regalo a tu padre, madre, hermano, pareja, o algun dia especial como lo puede ser un aniversario, una graduacion, no importa la fecha o el moment, nosotros te apoyaremos en encontrar ese detalle que le quieras dara tu persona especial, por que somos Cajitas de Amor</p>
                                <p className="card-text-center"><small className="text-muted">
                                    <a href="https://www.facebook.com/profile.php?id=100067014696471"><i className="fi fi-brands-facebook" style={{ color: 'black' }} /></a> &nbsp;&nbsp;
                                     <a href="https://www.instagram.com/cajitasdeamorj"><i className="fi fi-brands-instagram" style={{ color: 'black' }} /></a>
                                </small></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3" style={{width: '75%'}}>
                    <div className="row g-0">   
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">Jhovana Cordero Romano</h5>
                                <p className="card-text">Jhovana es la fundadora y directora de Cajitas de Amor, La cual se encarga de realizar y revisar lo pedidos encargados, asegurandose que lleven lo especificado en el producto o especificado por el cliente y agregando la dedicatoria, llegando hasta el proceso de envio, asegurandose que todo el envio este efectuado de forma correcta </p>
                                <p className="card-text-center"><small className="text-muted">
                                    <a href="https://www.facebook.com/jhovana.romano"><i className="fi fi-brands-facebook" style={{ color: 'black' }} /></a> &nbsp;&nbsp;
                                    <a href="https://www.instagram.com/jhovis_romano"><i className="fi fi-brands-instagram" style={{ color: 'black' }} /></a>
                                </small></p>
                            </div>
                        </div>
                        <div className="col-md-1" >
                            <img src={fun} className="img-fluid  rounded-start" alt="..."  />
                        </div>
                    </div>
                </div>

                <div className="card mb-2" style={{width: '75%'}}>
                    <div className="row g-0">
                        <div className="col-md-1">
                            <img  src={des1}  className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">Christopher Rojano Jimenez</h5>
                                <p className="card-text">Lider del desarrollo  de la pagina Cajitas de amor, encargado de la direccion y administracion del desarrollo, estudiante de Ingeniera en computacion en la Facultad de Ciencia Basicas Ingenieria y Tecnologia, siendo participe desde septiembre de del 2021</p>
                                <p className="card-text-center"><small className="text-muted">
                                    <a href="https://www.facebook.com/profile.php?id=100067014696471"><i className="fi fi-brands-facebook" style={{ color: 'black' }} /></a> &nbsp;&nbsp;
                                     <a href="https://www.instagram.com/cajitasdeamorj"><i className="fi fi-brands-instagram" style={{ color: 'black' }} /></a>
                                </small></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-2" style={{width: '75%'}}>
                    <div className="row g-0">   
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">Esau Abraham Menezes Baez</h5>
                                <p className="card-text">Co-Desarrollador  de la pagina Cajitas de amor, encargado de la direccion y administracion del desarrollo, estudiante de Ingeniera en computacion en la Facultad de Ciencia Basicas Ingenieria y Tecnologia, siendo participe desde septiembre de del 2021  </p>
                                <p className="card-text-center"><small className="text-muted">
                                    <a href="https://www.facebook.com/jhovana.romano"><i className="fi fi-brands-facebook" style={{ color: 'black' }} /></a> &nbsp;&nbsp;
                                    <a href="https://www.instagram.com/jhovis_romano"><i className="fi fi-brands-instagram" style={{ color: 'black' }} /></a>
                                </small></p>
                            </div>
                        </div>
                        <div className="col-md-1" >
                            <img src={des2} className="img-fluid  rounded-start" alt="..."  />
                        </div>
                    </div>
                </div>
               
                <div className="card mb-2" style={{width: '75%'}}>
                    <div className="row g-0">
                        <div className="col-md-1">
                            <img  src={des3}  className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">Jairo Cruz Diaz</h5>
                                <p className="card-text">Co-Desarrollador  de la pagina Cajitas de amor, encargado de la direccion y administracion del desarrollo, estudiante de Ingeniera en computacion en la Facultad de Biencia Casicas Ingenieria y Tecnologia, siendo participe desde septiembre de del 2021</p>
                                <p className="card-text-center"><small className="text-muted">
                                    <a href="https://www.facebook.com/profile.php?id=100067014696471"><i className="fi fi-brands-facebook" style={{ color: 'black' }} /></a> &nbsp;&nbsp;
                                     <a href="https://www.instagram.com/cajitasdeamorj"><i className="fi fi-brands-instagram" style={{ color: 'black' }} /></a>
                                </small></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(NosotrosComponent)