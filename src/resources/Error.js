import React from "react";
import { withRouter } from "react-router";

class ErrorComponent extends React.Component {
    constructor() {
    }

    //Inicializa funciones
    componentDidMount() {
    }

    render() {
        return (
            <div class="container-fluid ">
                <div className="row justify-content-center my-4 mx-4 p-2">
                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <br/><br/><br/>
                        <h2> Estamos muy apenados.... </h2>
                        <br/>
                        <h2> Ha ocurrido un error, inténtelo de nuevo más tarde. </h2>
                        <br/><br/><br/>
                    </div>
                </div>
                
            </div>

        )
    }
}
export default withRouter(ErrorComponent)