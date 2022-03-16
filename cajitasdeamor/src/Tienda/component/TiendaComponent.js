import React from "react";
import '../../resources/css/tienda.css';
import D1 from '../../resources/images/D1.jpeg';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";



class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.TiendaController = new TiendaController();

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
                <h1 style={{ color: 'red' }} >Productos</h1>
                <div class="container-fluid justify-content-center">

                    <div class="SelectorTien">
                        <ul class="CategoriaTien">
                            <li><a href="#">Todos</a></li>
                            <li><a href="#">Padre</a></li>
                            <li><a href="#">Madre</a></li>
                            <li><a href="#">Felicitaciones</a></li>
                            <li><a href="#">Graduacion</a></li>
                        </ul>
                    </div>

                    <br />

                    <div class="row justify-content-center aling-item-center row-cols-1 row-cols-md-4 g-4 ">
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card text-dark bg-light mb-3" style={{ width: '18rem' }}>
                                <img src={D1} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Desayuno 1 </h5>
                                    <p class="card-text">Desayuno complementario para cualquier dia,
                                        el cual contien, un cuernito, fruta con yogurt,
                                        jugo y un cuernito preparado</p>
                                    <a href="/Producto" class="btn btn-primary">Ver Producto</a>
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