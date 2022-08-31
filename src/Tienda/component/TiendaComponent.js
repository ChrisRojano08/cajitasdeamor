import React from "react";
import '../../resources/css/General.css';
import { withRouter } from "react-router";
import { TiendaController } from "../controller/TiendaController";
import {Utils} from '../../resources/Utils';

class TiendaComponent extends React.Component {
    constructor() {
        super();
        this.tiendaController = new TiendaController();

        //Almacena datos
        this.state = {
            productos: [{ idProducto: " ", Nombre: " ", Precio: " ", Tamanio: " ", Categoria: { Descripcion: " " }, imagen: " " }],
            prodsFilt: [],
            categories: [{Descripcion: " ", idCategoria: 0}],
            actPage: 1,
            totalPage: 0,
            buttonSt: [1],
            actCat: -1,
             Cantidad:1


        }
    }

    //Inicializa funciones
    componentDidMount() {
        this.loadData();
      }
    
    async loadData() {
       let respuesta = await this.tiendaController.findAll();
       this.setState({ productos: respuesta },()=>{
            this.state.productos.length%8 === 0 ? this.setState({ totalPage: this.state.productos.length/8 }) :
                this.setState({ totalPage: Math.trunc(this.state.productos.length/8)+1 })
       });
       this.setState({ prodsFilt: respuesta });

       let respCategories = await this.tiendaController.findCats();
       this.setState({ categories: respCategories });

       this.updateButtons(this.state.productos)
       this.paginateProds(1);

    }

    async agregarCarrito(e){
        console.log(e)
        
        if(sessionStorage.getItem('idUsuario')){
            let datos={
                idProducto: e,
                idUsuario: sessionStorage.getItem('idUsuario'),
                Cantidad: this.state.Cantidad
            }
            
            let respuesta = await this.tiendaController.addCart(datos);
            console.log(datos);
            
            if(respuesta[0].status === 'Ok'){
                Utils.swalSuccess(respuesta[0].Mensaje);
                setTimeout(() => {this.props.history.push("/Carrito")}, 1500);
            }else{
                Utils.swalError(respuesta[0].exception);
            }
        }else{
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
        if(idCat !== -1){
            const aux = [];
            let a=0;
		    const aux2 = this.state.productos;

            for (let i = 0; i < aux2.length; i++) {
                if(aux2[i].Categoria.idCategoria === idCat){
                    aux[a] = aux2[i];
                    a++;
                }
            }

            this.setState({ prodsFilt: aux },()=> {
                this.state.prodsFilt.length%8 === 0 ? this.setState({ totalPage: this.state.prodsFilt.length/8 }) :
                this.setState({ totalPage: Math.trunc(this.state.prodsFilt.length/8)+1 })

                this.updateButtons(this.state.prodsFilt)
            });
        }else{
            this.setState({ prodsFilt: this.state.productos },()=>{
                this.state.productos.length%8 === 0 ? this.setState({ totalPage: this.state.productos.length/8 }) :
                    this.setState({ totalPage: Math.trunc(this.state.productos.length/8)+1 })
           });
            this.updateButtons(this.state.productos)
        }

        this.setState({ actCat: idCat },()=>this.paginateProds(1));
	};

    updateButtons(state){
        let stateE = []
        if(state){
            stateE = state
        }else{
            stateE = this.state.productos
        }

        let button = [];

        if(stateE.length%8 === 0){
            for(let i=1;i<(stateE.length/8);i++){
                button[i] = i;
            }
        }else{
            for(let i=1;i<(stateE.length/8)+1;i++){
                button[i] = i;
            }
        }

        this.setState({ buttonSt: button },()=>{});
    }

    renderPag(){
        if(this.state.buttonSt.length===0){
            return(<></>)
        }else{
            return(
                <>
                    <button className="btn btnPag" onClick={()=>this.prevPage()}><h3>{"<"}</h3></button>
                    {
                        this.state.buttonSt.map((c)=>
                            <button className="btn btnPag" onClick={()=>this.paginateProds(c)}><h3>{c}</h3></button>
                        )
                    }
                    <button className="btn btnPag" onClick={()=>this.nextPage()}><h3>{">"}</h3></button>
                </>
            )
        }
    }

    prevPage=()=>{
        this.state.actPage === 1 ? <></> : this.paginateProds(this.state.actPage-1)
    }

    nextPage=()=>{
        this.state.actPage === this.state.totalPage ? <></> : this.paginateProds(this.state.actPage+1)
    }

    paginateProds(numb){
        let aux2 = [];
        if(this.state.actCat === -1){
            aux2 = this.state.productos;
        }else{
            aux2 = this.state.prodsFilt;
        }

        this.setState({ actPage: numb }, () => {
            const aux = [];

            for (let i = ((this.state.actPage-1)*8) ; i < (this.state.actPage*8) ; i++) {
                if(i>=aux2.length){break;}
                aux[i] = aux2[i];
            }

            this.setState({ prodsFilt: aux });
        });
    }

    mostrarProds() {
        return this.state.prodsFilt.map((c) =>
                <div class="col-lg-3 col-md-4 col-sm-6" key={c.id}>
                    <div class="card text-dark bg-light mb-3">
                        <div className="col-12" style={{'overflow':'hidden'}}>
                            <img src={c.Imagen} className="card-img-top" alt={c.Nombre} style={{'height':'30vh'}}/>
                        </div>
                        
                        <div class="card-body">
                            <h5 class="card-title">{c.Nombre}</h5>
                            <p class="card-text">${c.Precio}</p>
                            <button class="btn btn-primary" onClick={()=>this.mostrarProducto(c)}>Ver Producto</button>
                            <button class="btn btn-success"  onClick={()=>this.agregarCarrito(c.idProducto)}>Agregar al carrito</button>
                        </div>
                    </div>
                </div>
           )
    }

    renderCategories(){
        return(
            <>
            <h5>Filtrar por:</h5>
            <button className="btnCat" type="button"
                style={{'width':'80%', 'marginBottom':'3%', 'marginTop':'20px'}} onClick={()=>this.filtrar(-1)}>
                    Todas
            </button>
            {this.state.categories.map((c) =>
                <div>
                    <button key={c.idCategoria} className="btnCat" 
                        style={{'width':'80%', 'marginBottom':'3%'}} onClick={()=>this.filtrar(c.idCategoria)}>
                            {c.Descripcion}
                    </button>
                </div>
            )}
            </>
        )
    }

    render() {
        return (
            <div style={{'paddingLeft':'5%', 'paddingRight':'5%', 'marginBottom':'30px'}}>
                <h1 style={{ color: 'red', 'marginTop':'30px', 'marginBottom':'5%'}} >Productos</h1>

                <div class="row justify-content-center">
                    <div className="col-xl-2">
                        {this.renderCategories()}
                    </div>
                   
                    <div className="col-xl-10">
                        <div class="row justify-content-center aling-item-center">
                            {this.mostrarProds()}

                            <div className="d-flex justify-content-center">
                                {this.renderPag()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(TiendaComponent)