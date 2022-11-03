import React from "react";
import '../../resources/css/carrito.css';

const ProdsImgs = props =>{
    const prods = props.data;
    if(props.data === undefined){
        return( <p>UnU</p>);
    }

    switch(prods.length){
            case 0:
                return(
                    <h3>xd</h3>
                );
            case 1:
                return(
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <img src={prods[0][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                        </div>
                    </div>
                );
            case 2:
                return(
                    <div className="row">
                        <div className="col-6">
                            <img src={prods[0][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                        </div>
                        <div className="col-6">
                            <img src={prods[1][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                        </div>
                    </div>
                );
            case 3:
                return(
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <img src={prods[0][0].Imagen} alt="prod1" className="img-thumbnail" ></img>
                            </div>
                            <div className="col-6">
                                <img src={prods[1][0].Imagen} alt="prod1" className="img-thumbnail" ></img>
                            </div>
                        </div>
                            <div className="row">
                            <div className="col-6">
                                <img src={prods[2][0].Imagen} alt="prod1" className="img-thumbnail" ></img>
                            </div>
                            <div className="col-6"> </div>
                        </div>
                    </div>
                );
            default:
                return(
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <img src={prods[0][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                            </div>
                            <div className="col-6">
                                <img src={prods[1][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                            </div>
                        </div>
                            <div className="row">
                            <div className="col-6">
                                <img src={prods[2][0].Imagen} alt="prod1" className="img-thumbnail"></img>
                            </div>
                            <div className="col-6">
                                <img src="https://t1.uc.ltmcdn.com/es/posts/2/2/2/cuales_son_los_usos_de_los_puntos_suspensivos_20222_orig.jpg"
                                    alt="prod1" className="img-thumbnail"></img>
                            </div>
                        </div>
                    </div>
                );
        }
}
export default ProdsImgs;