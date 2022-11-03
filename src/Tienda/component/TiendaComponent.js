import React from "react";
import '../../resources/css/General.css';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";
import { Utils } from '../../resources/Utils';

class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.tiendaController = new TiendaController();

        //Almacena datos
        this.state = {
            productos: [{ idProducto: " ", Nombre: " ", Precio: " ", Tamanio: " ", Categoria: { Descripcion: " " }, imagen: " " }],
            prodsFilt: [],
            prodsFiltFull: [],
            categories: [{ Descripcion: " ", idCategoria: 0 }],
            actPage: 1,
            totalPage: 0,
            buttonSt: [1],
            actCat: -1,
            Cantidad: 1,
            nameAct: 'asc',
            priceAct: 'asc'
        }
    }

    //Inicializa funciones
    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        let respuesta = await this.tiendaController.findAll();
        this.setState({ productos: respuesta }, () => {
            this.state.productos.length % 8 === 0 ? this.setState({ totalPage: this.state.productos.length / 8 }) :
                this.setState({ totalPage: Math.trunc(this.state.productos.length / 8) + 1 })
        });
        this.setState({ prodsFilt: respuesta }, () => this.setState({ prodsFiltFull: this.state.prodsFilt }));

        let respCategories = await this.tiendaController.findCats();
        this.setState({ categories: respCategories });

        this.updateButtons(this.state.productos)
        this.paginateProds(1);

    }

    async agregarCarrito(e) {
        if (sessionStorage.getItem('idUsuario')) {
            let datos = {
                idProducto: e,
                idUsuario: sessionStorage.getItem('idUsuario'),
                Cantidad: this.state.Cantidad
            }

            let respuesta = await this.tiendaController.addCart(datos);

            if (respuesta[0].status === 'Ok') {
                Utils.swalSuccess(respuesta[0].Mensaje);
                setTimeout(() => { this.props.history.push("/Carrito") }, 1500);
            } else {
                Utils.swalError(respuesta[0].exception);
            }
        } else {
            document.getElementById('modalButton').click();
        }

    }

    mostrarProducto = e => {
        this.props.history.push({
            pathname: '/Producto',
            data: e
        })
    }

    filtrar = idCat => {
        if (idCat !== -1) {
            const aux = [];
            let a = 0;
            const aux2 = this.state.productos;

            for (let i = 0; i < aux2.length; i++) {
                if (aux2[i].Categoria.idCategoria === idCat) {
                    aux[a] = aux2[i];
                    a++;
                }
            }

            this.setState({ prodsFilt: aux }, () => {
                this.state.prodsFilt.length % 8 === 0 ? this.setState({ totalPage: this.state.prodsFilt.length / 8 }) :
                    this.setState({ totalPage: Math.trunc(this.state.prodsFilt.length / 8) + 1 })

                this.updateButtons(this.state.prodsFilt)
                this.setState({ prodsFiltFull: this.state.prodsFilt });
            });
        } else {
            this.setState({ prodsFilt: this.state.productos }, () => {
                this.state.productos.length % 8 === 0 ? this.setState({ totalPage: this.state.productos.length / 8 }) :
                    this.setState({ totalPage: Math.trunc(this.state.productos.length / 8) + 1 })
            });
            this.setState({ prodsFilt: this.state.productos });
            this.setState({ prodsFiltFull: this.state.productos });
            this.updateButtons(this.state.productos)
        }

        setTimeout(() => {
            this.setState({ actCat: idCat }, () => this.paginateProds(1));
        }, 100);

    };

    search = (e) => {
        const c = e.target.value.toLowerCase();
        const aux = [];
        const aux2 = this.state.productos;

        if (c === '') {
            this.setState({ actCat: -1 });
        } else {
            this.setState({ actCat: -2 });
        }

        for (let i = 0; i < aux2.length; i++) {
            if (aux2[i].Nombre.toLowerCase().indexOf(c) !== -1) {
                aux.push(aux2[i]);
            }
        }

        this.setState({ prodsFilt: aux }, () => {
            this.state.prodsFilt.length % 8 === 0 ? this.setState({ totalPage: this.state.prodsFilt.length / 8 }) :
                this.setState({ totalPage: Math.trunc(this.state.prodsFilt.length / 8) + 1 })

            this.updateButtons(this.state.prodsFilt);
            this.setState({ prodsFiltFull: this.state.prodsFilt }, () => {
                this.paginateProds(1);
            });
        });
    };

    orderName = (e) => {
        const list = this.state.prodsFiltFull;
        if (this.state.nameAct === 'asc') {
            list.sort((a, b) => (a.Nombre > b.Nombre ? 1 : -1));
            this.setState({ nameAct: 'des' });
        } else {
            list.sort((a, b) => (a.Nombre < b.Nombre ? 1 : -1));
            this.setState({ nameAct: 'asc' });
        }

        this.setState({ prodsFilt: list }, () => {
            this.paginateProds(1);
        });
    };

    orderPrice = (e) => {
        const list = this.state.prodsFiltFull;
        if (this.state.priceAct === 'asc') {
            list.sort((a, b) => (a.Precio > b.Precio ? 1 : -1));
            this.setState({ priceAct: 'des' });
        } else {
            list.sort((a, b) => (a.Precio < b.Precio ? 1 : -1));
            this.setState({ priceAct: 'asc' });
        }

        this.setState({ prodsFilt: list }, () => {
            this.paginateProds(1);
        });
    };

    updateButtons(state) {
        let stateE = []
        if (state) {
            stateE = state
        } else {
            stateE = this.state.productos
        }

        let button = [];
        if (stateE.length % 8 === 0) {
            for (let i = 1; i < (stateE.length / 8); i++) {
                button[i] = i;
            }
        } else {
            for (let i = 1; i < (stateE.length / 8) + 1; i++) {
                button[i] = i;
            }
        }

        this.setState({ buttonSt: button }, () => { });
    }

    renderPag() {
        if (this.state.buttonSt.length === 0) {
            return (<></>)
        } else {
            return (
                <>
                    <button className="btn btnPag" onClick={() => this.prevPage()}><h3>{"<"}</h3></button>
                    {
                        this.state.buttonSt.map((c) =>
                            <button key={c} className="btn btnPag" onClick={() => this.paginateProds(c)}><h3 key={c}>{c}</h3></button>
                        )
                    }
                    <button className="btn btnPag" onClick={() => this.nextPage()}><h3>{">"}</h3></button>
                </>
            )
        }
    }

    prevPage = () => {
        this.state.actPage === 1 ? <></> : this.paginateProds(this.state.actPage - 1)
    }

    nextPage = () => {
        this.state.actPage === this.state.totalPage ? <></> : this.paginateProds(this.state.actPage + 1)
    }

    paginateProds(numb) {
        let aux2 = [];
        if (this.state.actCat === -1) {
            aux2 = this.state.prodsFiltFull;
        } else {
            this.setState({ prodsFilt: this.state.prodsFiltFull }, () => {
                aux2 = this.state.prodsFilt;
            });
        }

        setTimeout(() => {
            this.setState({ actPage: numb }, () => {
                const aux = [];

                for (let i = ((this.state.actPage - 1) * 8); i < (this.state.actPage * 8); i++) {
                    if (i >= aux2.length) { break; }
                    aux[i] = aux2[i];
                }

                this.setState({ prodsFilt: aux });
            });
        }, 100);

    }

    mostrarProds() {
        return this.state.prodsFilt.map((c) =>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6"  key={c.id}>
                <div className="card text-dark bg-light mb-3">
                    <div className="col-12" style={{ 'overflow': 'hidden' }}>
                        <img src={c.Imagen} className="card-img-top" alt={c.Nombre} style={{ 'height': '30vh' }} />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{c.Nombre}</h5>
                        <p className="card-text">${c.Precio}</p>
                                <button className="btn btn-primary p-1" onClick={() => this.mostrarProducto(c)}>
                                    <i className="fi-rr-eye p-2"/>
                                </button>
                                <button className="btn btn-success p-1 mx-2" onClick={() => this.agregarCarrito(c.idProducto)}>
                                    <i className="fi-rr-shopping-cart-add p-2"/>
                                </button>
                    </div>
                </div>
            </div>
        )
    }

    renderCategories() {
        return (
            <>
                <h5>Filtrar por:</h5>
                <button className="btnCat" type="button"
                    style={{ 'width': '80%', 'marginBottom': '2%', 'marginTop': '20px' }} onClick={() => this.loadData()}>
                    Todas
                </button>
                {this.state.categories.map((c) =>
                    <div key={c.idCategoria}>
                        <button key={c.idCategoria} className="btnCat"
                            style={{ 'width': '80%', 'marginBottom': '3%' }} onClick={() => this.filtrar(c.idCategoria)}>
                            {c.Descripcion}
                        </button>
                    </div>
                )}
            </>
        )
    }

    render() {
        return (
            <div style={{ 'paddingLeft': '5%', 'paddingRight': '5%', 'marginBottom': '30px' }}>
                <h1 style={{ color: 'red', 'marginTop': '30px', 'marginBottom': '5%' }}  className="text-center">Productos</h1>

                <div className="row justify-content-center">
                    <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                {this.renderCategories()}

                                <div>
                                    <h5 style={{ 'marginTop': '50px', 'marginBottom': '2%' }}>Ordenar por:</h5>
                                    <button className="btnCat" type="button"
                                        style={{ 'width': '80%', 'marginBottom': '3%', 'marginTop': '20px' }} onClick={() => this.orderName()}>
                                        Nombre
                                    </button>
                                    <button className="btnCat" type="button"
                                        style={{ 'width': '80%', 'marginBottom': '3%' }} onClick={() => this.orderPrice()}>
                                        Precio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className='my-4 col-12'>
                                        <div className='input-group'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text' id='busqueda'>
                                                    &#128270;
                                                </span>
                                            </div>
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='busqueda'
                                                placeholder='Ingrese su criterio a buscar'
                                                aria-describedby='busqueda'
                                                onChange={this.search}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center aling-items-center">
                                    {this.mostrarProds()}

                                    <div className="d-flex justify-content-center">
                                        {this.renderPag()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(TiendaComponent)