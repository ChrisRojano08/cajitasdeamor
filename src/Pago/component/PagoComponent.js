import { withRouter } from "react-router";
import { PagoController } from "../controller/PagoController";
import React from 'react'
import { Utils } from '../../resources/Utils';
import Cards from 'react-credit-cards';

class PagoComponent extends React.Component {
    constructor() {
        super();
        this.pagoController = new PagoController();

        //Almacena datos
        this.state = {
            pago: {
                Nombre: '',
                Banco: '',
                Cuenta: '',
                idUsuario: sessionStorage.getItem("idUsuario"),
                CVV: '',
                FechaVencimiento: ''
            },
            tarjetas:[{
                Banco: ' ',
                CVV: '123',
                Cuenta: '5555444433332222',
                FechaVencimiento: '12-12-2022',
                Nombre: 'uwu',
                idMetodoPago: ' ',
                status: 'Vacio'
            }]
        }
    }

    //Inicializa funciones
    componentDidMount() {
        if(this.props.location.anterior === 'menuUsuario'){
            setTimeout(() => {
                this.setState({pago: this.props.location.data},() => (this.setDate()))
            }, 200);
        }else{
            this.loadData();
        }
    }

    setDate(){
        const dat = this.state.pago.FechaVencimiento;
        let curr = dat.split('-');
        let fV = curr[2]+"-"+curr[1]+"-"+curr[0];

        document.getElementsByClassName('form-control date')[0].value = fV;
        this.setState({
            pago: {
                ...this.state.pago,
                FechaVencimiento: fV
            }
        })
    }

    async loadData(){
        const datos = { idUsuario: sessionStorage.getItem("idUsuario") }; 
        const respuestaH = await this.pagoController.findPay(datos);

        this.setState({ tarjetas: respuestaH });
    }

    comprobacion = async event => {
        event.preventDefault()

        if (sessionStorage.getItem("idUsuario") === null) {
            Utils.swalError("Necesita iniciar sesion para poder agregar un metodo de pago!");
        } else {
            const date = new Date();
            let dia = date.getDate()
            let mes = date.getMonth()+1

            if(mes < 10){
                mes = '0'+mes
            }
            if(dia < 10){
                dia = '0'+dia;
            }

	        const current_date = date.getFullYear()+"-"+mes+"-"+dia;
            const fechaV = this.state.pago.FechaVencimiento;

            if(current_date === fechaV){
                Utils.swalError('Su tarjeta venció hoy!')
            }else if(current_date > fechaV){
                Utils.swalError('Su tarjeta esta vencida!')
            }else{
                if(this.state.pago.Cuenta < 1000000000000000 || this.state.pago.Cuenta > 9999999999999999){
                    Utils.swalError('Ingrese un numero de cuenta valido!')
                }else{
                    if(this.state.pago.CVV < 100 || this.state.pago.CVV > 999){
                        Utils.swalError('Ingrese un código valido!')
                    }else{
                        this.setState({
                            ...this.state.pago,
                            idUsuario: sessionStorage.getItem("idUsuario")
                        });

                        if(this.props.location.anterior === 'menuUsuario'){
                            const respuesta = await this.pagoController.update(this.state.pago);

                            if(respuesta.status === 'Ok'){
                                Utils.swalSuccess("El método de pago fue editado correctamente!");
                
                                setTimeout(() => {
                                    this.props.history.push('/menuUsuario')
                                    window.location.reload(true);
                                }, 1000);
                            }else if(respuesta.exception){
                                Utils.swalError(respuesta.exception);
                            }else{
                                Utils.swalError(respuesta.status);
                            }
                        }else{
                            const respuesta = await this.pagoController.insert(this.state.pago);

                            if(respuesta.status === 'Ok'){
                                Utils.swalSuccess("El método de pago fue agregado correctamente!");
                
                                setTimeout(() => window.location.reload(true), 1000);
                            }else if(respuesta.exception){
                                Utils.swalError(respuesta.exception);
                            }else{
                                Utils.swalError(respuesta.status);
                            }
                        }
                    }
                }
            }
        }
    }
    handleChange = e => {
        this.setState({
            pago: {
                ...this.state.pago,
                [e.target.name]: e.target.value
            }
        })
    }

    seleccionarMetodo=(c)=>{
        this.props.handler(1, c);
    }

    formulario(){
        return(
            <div>
                {this.props.location.anterior === 'menuUsuario' ?
                    <h3 className="text-center" style={{ color: 'red' }} >Editar tarjeta</h3> :
                    <h3 className="text-center" style={{ color: 'red' }} >Agregar tarjeta</h3>
                }
                <br/>
                    <div className="card">
                        <div className="card-header">
                            Pago
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-12 my-4 p-2">
                                <Cards
                                    cvc={this.state.pago.CVV}
                                    expiry={this.state.pago.FechaVencimiento}
                                    name={this.state.pago.Nombre}
                                    number={this.state.pago.Cuenta}
                                    preview={false}
                                />
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="card-body">
                                    <form className="row g-3 needs-validation"
                                        onSubmit={this.comprobacion}>

                                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                                            <label htmlFor="validationCustom01" className="form-label">Nombre</label>
                                            <input type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={this.handleChange}
                                                value={this.state.pago.Nombre}
                                                name="Nombre" required />
                                        </div>
                                        <div className="col-xl-12 col-lg-6 col-md-4 col-sm-12">
                                            <label htmlFor="validationCustom02" className="form-label">Banco</label>
                                            <input type="text"
                                                className="form-control"
                                                id="validationCustom02"
                                                value={this.state.pago.Banco}
                                                onChange={this.handleChange}
                                                name="Banco" required />
                                        </div>
                                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                                            <label htmlFor="validationCustom02" className="form-label">Número de cuenta</label>
                                            <input type="number"
                                                className="form-control"
                                                id="validationCustom02"
                                                onChange={this.handleChange}
                                                value={this.state.pago.Cuenta}
                                                name="Cuenta" required />
                                        </div>
                                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                                            <label htmlFor="validationCustom03" className="form-label">CVV</label>
                                            <input type="number"
                                                className="form-control"
                                                id="validationCustom03"
                                                name="CVV"
                                                value={this.state.pago.CVV}
                                                onChange={this.handleChange} required />
                                        </div>

                                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                                            <label htmlFor="validationCustom05" className="form-label">Vencimiento</label>
                                            
                                            <input type="date"
                                                className="form-control date"
                                                id="validationCustom05"
                                                onChange={this.handleChange}
                                                name="FechaVencimiento" required />
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary" type="submit">
                                                {this.props.location.anterior === 'menuUsuario' ?
                                                    "Editar metodo de pago" :
                                                    "Agregar metodo de pago"
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        );
    }

    tarjetas(){
        return this.state.tarjetas.map((c)=>
            <div className="col-lg-12 col-xl-12 col-md-6 p-2 mt-4 tarjeta cardSh"
                key={c.idMetodoPago} onClick={()=>this.seleccionarMetodo(c)}>
                <Cards
                    cvc={c.CVV}
                    expiry={c.FechaVencimiento}
                    name={c.Nombre}
                    number={c.Cuenta}
                />
            </div>
        )
    }

    comprobarMetodos(){
        if(this.state.tarjetas.length > 0){
            if(this.state.tarjetas[0].status === 'Vacio'){
                return(
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            {this.formulario()}
                        </div>
                    </div>
                );
            }else{
                return(
                    <div className="row">
                        <div className="col-xl-5 col-lg-12 col-md-12 p-2 mb-4">
                            <h3 className="text-center" style={{ color: 'red' }} >Seleccionar tarjeta</h3>
                            <br/>
                            <div className="row">
                                {this.tarjetas()}
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 col-md-12">
                            {this.formulario()}
                        </div>
                    </div>
                );
            }
        }else{
            return(
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        {this.formulario()}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container-fluid my-2 p-4">
                {this.comprobarMetodos()}
            </div>
        )
    }

}
export default withRouter(PagoComponent)